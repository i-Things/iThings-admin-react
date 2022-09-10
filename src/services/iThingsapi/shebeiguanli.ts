// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增设备 POST /api/v1/things/device/info/create */
export async function postThingsDeviceInfoCreate(
  body: {
    productID: string;
    deviceName?: string;
    /** 1)关闭 2)错误 3)告警 4)信息 5)调试  */
    logLevel?: number;
    tags?: { key?: string; value?: string }[];
    /** 1离线 2在线 只读 */
    isOnline: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/device/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除设备 POST /api/v1/things/device/info/delete */
export async function postThingsDeviceInfo__openAPI__delete(
  body: {
    productID: string;
    deviceName?: string;
    tags?: { key?: string; value?: string }[];
    /** 1离线 2在线 只读 */
    isOnline: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/device/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备列表 POST /api/v1/things/device/info/index */
export async function postThingsDeviceInfoIndex(
  body: {
    page: { page?: number; size?: number };
    /** 为空时获取所有产品 */
    productID?: string;
    // deviceName?: string;
    /** 非模糊查询 为tag的名,value为tag对应的值 */
    // tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      list?: {
        productID?: string;
        deviceName?: string;
        createdTime?: string;
        secret?: string;
        firstLogin?: string;
        lastLogin?: string;
        version?: string;
        logLevel?: number;
        tags?: { key?: string; value?: string }[];
        isOnline?: number;
      }[];
      total?: number;
      num?: number;
    };
  }>('/api/v1/things/device/info/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备详情 POST /api/v1/things/device/info/read */
export async function postThingsDeviceInfoRead(
  body: {
    /** 为空时获取所有产品 */
    productID: string;
    deviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      productID?: string;
      deviceName?: string;
      createdTime?: string;
      secret?: string;
      firstLogin?: string;
      lastLogin?: string;
      version?: string;
      logLevel?: number;
      tags?: { key?: string; value?: string }[];
      isOnline?: number;
    };
  }>('/api/v1/things/device/info/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新设备 POST /api/v1/things/device/info/update */
export async function postThingsDeviceInfoUpdate(
  body: {
    productID: string;
    version?: string;
    /** 1)关闭 2)错误 3)告警 4)信息 5)调试  */
    logLevel?: number;
    tags?: { key?: string; value?: string }[];
    /** 1离线 2在线 只读 */
    isOnline: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/device/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
