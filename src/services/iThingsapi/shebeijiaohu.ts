// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 同步调用设备行为 POST /api/v1/things/device/interact/send-action */
export async function postThingsDeviceInteractSendAction(
  body: {
    productID: string;
    deviceName: string;
    /** 由开发者自行根据设备的应用场景定义 */
    actionID: string;
    inputParams: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ clientToken: string; outputParams: string; status: string; code: string }>(
    '/api/v1/things/device/interact/send-action',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 发送消息给设备 POST /api/v1/things/device/interact/send-msg */
export async function postThingsDeviceInteractSendMsg(
  body: {
    topic: string;
    payload: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/device/interact/send-msg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 同步调用设备属性 POST /api/v1/things/device/interact/send-property */
export async function postThingsDeviceInteractSendProperty(
  body: {
    productID: string;
    deviceName: string;
    /** JSON格式字符串, 注意字段需要在物模型属性里定义 */
    data: string;
    /** 仅对Method:reported有效 */
    dataTimestamp: string;
    /** 不填该参数或者 desired 表示下发属性给设备, reported 表示模拟设备上报属性 */
    method: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; status: string; clientToken: string; data: string }>(
    '/api/v1/things/device/interact/send-property',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
