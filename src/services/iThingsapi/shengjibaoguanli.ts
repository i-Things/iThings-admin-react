// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

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
