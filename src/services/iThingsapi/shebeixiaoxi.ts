// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取物模型事件历史记录 POST /api/v1/things/device/msg/event-log/index */
export async function postApiV1ThingsDeviceMsgEventLogIndex(
  body: {
    /** 不填获取产品下所有设备 */
    deviceNames: string[];
    /** 信息:info  告警alert  故障:fault */
    types?: string[];
    productID: string;
    dataID: string;
    timeStart: string;
    timeEnd: string;
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      list?: { timestamp?: string; type?: string; dataID?: string; params?: string }[];
      total?: number;
    };
  }>('/api/v1/things/device/msg/event-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取云端诊断日志 POST /api/v1/things/device/msg/hub-log/index */
export async function postApiV1ThingsDeviceMsgHubLogIndex(
  body: {
    deviceName: string;
    productID: string;
    timeStart?: string;
    timeEnd?: string;
    page?: { page?: number; size?: number };
    /** connected:上线 disconnected:下线  property:属性 event:事件 action:操作 thing:物模型提交的操作为匹配的日志 */
    actions?: string[];
    topics?: string[];
    content?: string;
    requestID?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      list?: {
        timestamp?: string;
        action?: string;
        requestID?: string;
        tranceID?: string;
        topic?: string;
        content?: string;
        resultType?: string;
      }[];
      total?: number;
    };
  }>('/api/v1/things/device/msg/hub-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取最新属性 POST /api/v1/things/device/msg/property-latest/index */
export async function postApiV1ThingsDeviceMsgPropertyLatestIndex(
  body: {
    deviceName: string;
    productID: string;
    /** 如果不指定则获取所有属性数据 */
    dataIDs: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: { list?: { timestamp?: string; dataID?: string; value?: string }[]; total?: number };
  }>('/api/v1/things/device/msg/property-latest/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单个id属性历史记录 POST /api/v1/things/device/msg/property-log/index */
export async function postApiV1ThingsDeviceMsgPropertyLogIndex(
  body: {
    /** 不填获取产品下所有设备 */
    deviceNames: string[];
    productID: string;
    dataID: string;
    timeStart: string;
    timeEnd: string;
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: { list?: { timestamp?: string; dataID?: string; value?: string }[]; total?: number };
  }>('/api/v1/things/device/msg/property-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备本地日志 获取设备主动上传的sdk日志 POST /api/v1/things/device/msg/sdk-log/index */
export async function postApiV1ThingsDeviceMsgSdkLogIndex(
  body: {
    deviceName: string;
    productID: string;
    logLevel?: number;
    timeStart?: string;
    timeEnd?: string;
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{ data: { list?: API.deviceMsgSdkIndex[]; total?: number } }>(
    '/api/v1/things/device/msg/sdk-log/index',
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
