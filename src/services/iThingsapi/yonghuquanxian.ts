// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取用户区域权限列表 POST /api/v1/system/user/auth/area/index */
export async function postApiV1SystemUserAuthAreaIndex(
  body: {
    page?: { page?: number; size?: number };
    userID: string;
    projectID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { total?: number; list?: API.userAuthArea[] };
  }>('/api/v1/system/user/auth/area/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 授权用户区域权限（内部会先全删后重加) POST /api/v1/system/user/auth/area/multi-update */
export async function postApiV1SystemUserAuthAreaMultiUpdate(
  body: {
    userID: string;
    projectID: string;
    areas: API.userAuthArea[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/user/auth/area/multi-update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户项目权限列表 POST /api/v1/system/user/auth/project/index */
export async function postApiV1SystemUserAuthProjectIndex(
  body: {
    page?: { page?: number; size?: number };
    userID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { total?: number; list?: API.userAuthProject[] };
  }>('/api/v1/system/user/auth/project/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 授权用户项目权限（内部会先全删后重加） POST /api/v1/system/user/auth/project/multi-update */
export async function postApiV1SystemUserAuthProjectMultiUpdate(
  body: {
    userID: string;
    projects: API.userAuthProject[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/user/auth/project/multi-update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
