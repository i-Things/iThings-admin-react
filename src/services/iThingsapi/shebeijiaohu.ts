// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取调用设备行为的结果 POST /api/v1/things/device/interact/action-read */
export async function postApiV1ThingsDeviceInteractActionRead(
  body: {
    productID: string;
    deviceName: string;
    clientToken: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ clientToken: string; outputParams: string; status: string; code: string }>(
    '/api/v1/things/device/interact/action-read',
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

/** 获取调用设备属性的结果 POST /api/v1/things/device/interact/property-read */
export async function postApiV1ThingsDeviceInteractPropertyRead(
  body: {
    productID: string;
    deviceName: string;
    clientToken: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; status: string; clientToken: string; data: string }>(
    '/api/v1/things/device/interact/property-read',
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

/** 调用设备行为 POST /api/v1/things/device/interact/send-action */
export async function postApiV1ThingsDeviceInteractSendAction(
  body: {
    productID: string;
    deviceName: string;
    /** 由开发者自行根据设备的应用场景定义 */
    actionID: string;
    inputParams: string;
    /** 异步情况通过获取接口来获取 */
    isAsync?: boolean;
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
export async function postApiV1ThingsDeviceInteractSendMsg(
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

/** 调用设备属性 POST /api/v1/things/device/interact/send-property */
export async function postApiV1ThingsDeviceInteractSendProperty(
  body: {
    productID: string;
    deviceName: string;
    /** JSON格式字符串, 注意字段需要在物模型属性里定义 */
    data: string;
    /** 异步情况通过获取接口来获取 */
    isAsync?: boolean;
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
