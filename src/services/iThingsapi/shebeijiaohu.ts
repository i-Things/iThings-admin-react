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
  return request<{
    data: { clientToken?: string; outputParams?: string; status?: string; code?: string };
    code: number;
    msg: string;
  }>('/api/v1/things/device/interact/action-read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 请求设备获取设备最新属性 POST /api/v1/things/device/interact/get-property-reply */
export async function postApiV1ThingsDeviceInteractGetPropertyReply(
  body: {
    productID: string;
    deviceName: string;
    /** 如果不指定则获取所有属性数据,一个属性一条 */
    dataIDs?: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      clientToken?: string;
      code?: number;
      status?: string;
      timestamp?: string;
      params?: string;
    };
  }>('/api/v1/things/device/interact/get-property-reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量调用设备属性 POST /api/v1/things/device/interact/multi-send-property */
export async function postApiV1ThingsDeviceInteractMultiSendProperty(
  body: {
    /** 传了优先从项目区域中获取设备列表 */
    areaID?: string;
    /** 传了会从分组下获取设备 */
    groupID?: string;
    productID?: string;
    deviceNames?: string[];
    /** JSON格式字符串, 注意字段需要在物模型属性里定义 */
    data: string;
    /** 0:自动,当设备不在线的时候设置设备影子,设备在线时直接下发给设备 1:只实时下发,不在线报错 2:如果有设备影子只修改影子,没有的也不下发 */
    shadowControl: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      list?: {
        sysCode?: number;
        sysMsg?: string;
        clientToken?: string;
        code?: number;
        status?: string;
      }[];
    };
  }>('/api/v1/things/device/interact/multi-send-property', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
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
  return request<{
    code: number;
    msg: string;
    data: { clientToken?: string; code?: number; status?: string };
  }>('/api/v1/things/device/interact/property-read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
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
  return request<{
    code: number;
    msg: string;
    data: { clientToken?: string; outputParams?: string; status?: string; code?: string };
  }>('/api/v1/things/device/interact/send-action', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
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
    /** 0:自动,当设备不在线的时候设置设备影子,设备在线时直接下发给设备 1:只实时下发,不在线报错 2:如果有设备影子只修改影子,没有的也不下发 */
    shadowControl?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { clientToken?: string; code?: number; status?: string };
  }>('/api/v1/things/device/interact/send-property', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
