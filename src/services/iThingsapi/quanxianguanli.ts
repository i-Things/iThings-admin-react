// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取API权限列表 POST /api/v1/system/auth/api/index */
export async function postApiV1SystemAuthApiIndex(
  body: {
    /** 角色ID */
    roleID: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data?: { total?: number; list?: { route?: string; method?: number }[] };
  }>('/api/v1/system/auth/api/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新API权限 POST /api/v1/system/auth/api/multiUpdate */
export async function postApiV1SystemAuthApiMultiUpdate(
  body: {
    /** 角色ID */
    roleID: number;
    list: { route?: string; method?: number }[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/system/auth/api/multiUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
