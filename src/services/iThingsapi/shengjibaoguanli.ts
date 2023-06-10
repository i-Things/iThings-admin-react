// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建升级包版本 POST /api/v1/things/ota/firmware/create */
export async function create(body: API.FirmwareCreateReq, options?: { [key: string]: any }) {
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
export async function deleteUsingPOST(body: API.FirmwareDelReq, options?: { [key: string]: any }) {
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
export async function firmwareIndex(body: API.FirmwareIndexReq, options?: { [key: string]: any }) {
  return request<API.FirmwareIndexResp>('/api/v1/things/ota/firmware/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取升级包详情 POST /api/v1/things/ota/firmware/read */
export async function read(body: API.FirmwareReadReq, options?: { [key: string]: any }) {
  return request<API.FirmwareInfo>('/api/v1/things/ota/firmware/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取升级包直传的signed url POST /api/v1/things/ota/firmware/signedurl */
export async function signedurl(body: API.FirmwareSignedUrlReq, options?: { [key: string]: any }) {
  return request<API.FirmwareSignedUrlResp>('/api/v1/things/ota/firmware/signedurl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新升级包 POST /api/v1/things/ota/firmware/update */
export async function update(body: API.FirmwareInfoUpdateReq, options?: { [key: string]: any }) {
  return request<string>('/api/v1/things/ota/firmware/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 文件直传 地址由《获取升级包直传的signed url》接口返回 PUT /ithings/265ngeRHyrS/test58.jpg */
export async function putIthings265ngeRHyrSJpg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putIthings265ngeRHyrSJpgParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/ithings/265ngeRHyrS/test58.jpg', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
