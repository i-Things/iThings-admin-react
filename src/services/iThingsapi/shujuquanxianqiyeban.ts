// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 删除用户数据权限（预留运维用） POST /api/v1/system/dataAuth/delete */
export async function postApiV1SystemDataAuth__openAPI__delete(
  body: {
    userID: string;
    dataType?: 1 | 2;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/dataAuth/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户数据权限列表（某个用户） POST /api/v1/system/dataAuth/index */
export async function postApiV1SystemDataAuthIndex(
  body: {
    page?: { page?: number; size?: number };
    userID: string;
    dataType?: number;
    dataID?: string;
    dataIDs?: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { total?: number; list?: API.UserDataAuth[] };
  }>('/api/v1/system/dataAuth/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 授权用户数据权限（内部会先全删后重加） POST /api/v1/system/dataAuth/multi-update */
export async function postApiV1SystemDataAuthMultiUpdate(
  body: {
    userID: string;
    dataType: 1 | 2;
    dataIDs: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/dataAuth/multi-update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
