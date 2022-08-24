// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取云端诊断日志 POST /api/v1/things/device/msg/hub-log/index */
export async function postThingsDeviceMsgHubLogIndex(
  body: {
    deviceName: string;
    productID: string;
    timeStart?: string;
    timeEnd?: string;
    page: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      list?: API.E4BA91E7ABAFE8B083E8AF95E697A5E5BF97E695B0E68DAEE7BB93E69E84E4BD93[];
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

/** 获取最新物模型属性 POST /api/v1/things/device/msg/schema-latest/index */
export async function postThingsDeviceMsgSchemaLatestIndex(
  body: {
    /** property 属性 event事件 action 请求 */
    method: string;
    deviceName: string;
    productID: string;
    /** 如果不指定则获取所有属性数据 */
    dataID: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { list?: API.E789A9E6A8A1E59E8BE8AEB0E5BD95[]; total?: number };
  }>('/api/v1/things/device/msg/schema-latest/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单个id物模型历史记录 POST /api/v1/things/device/msg/schema-log/index */
export async function postThingsDeviceMsgSchemaLogIndex(
  body: {
    /** property 属性 event事件 action 请求 */
    method: string;
    /** 不填获取产品下所有设备 */
    deviceName: string[];
    productID: string;
    dataID: string;
    timeStart: string;
    timeEnd: string;
    page: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { list?: API.E789A9E6A8A1E59E8BE8AEB0E5BD95[]; total?: number };
  }>('/api/v1/things/device/msg/schema-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备sdk日志 获取设备主动上传的sdk日志 POST /api/v1/things/device/msg/sdk-log/index */
export async function postThingsDeviceMsgSdkLogIndex(
  body: {
    deviceName: string;
    productID: string;
    timeStart?: string;
    timeEnd?: string;
    page: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { list: { timestamp?: string; loglevel?: number; content?: string }; total?: number };
  }>('/api/v1/things/device/msg/sdk-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
