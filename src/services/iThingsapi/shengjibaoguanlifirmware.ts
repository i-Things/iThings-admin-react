// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建升级包版本 POST /api/v1/things/ota/firmware/create */
export async function create(body: API.OtaFirmwareCreateReq, options?: { [key: string]: any }) {
  return request<string>('/api/v1/things/ota/firmware/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除升级包 POST /api/v1/things/ota/firmware/delete */
export async function deleteUsingPOST(
  body: API.OtaFirmwareDelReq,
  options?: { [key: string]: any },
) {
  return request<string>('/api/v1/things/ota/firmware/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取升级包列表 POST /api/v1/things/ota/firmware/index */
export async function index(
  body: {
    /** 产品id 获取产品id下的所有升级包 */
    productID: string;
    page?: API.PageInfo;
  },
  options?: { [key: string]: any },
) {
  return request<API.OtaFirmwareIndexResp>('/api/v1/things/ota/firmware/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取升级包详情 POST /api/v1/things/ota/firmware/read */
export async function read(body: API.OtaFirmwareReadReq, options?: { [key: string]: any }) {
  return request<API.OtaFirmwareReadResp>('/api/v1/things/ota/firmware/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新升级包 POST /api/v1/things/ota/firmware/update */
export async function update(body: API.OtaFirmwareInfoUpdateReq, options?: { [key: string]: any }) {
  return request<string>('/api/v1/things/ota/firmware/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
