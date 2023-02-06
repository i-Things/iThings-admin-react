// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取系统配置 POST /api/v1/system/common/config */
export async function postSystemCommonConfig(body: {}, options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { map: { mode?: string; accessKey?: string } };
  }>('/api/v1/system/common/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
