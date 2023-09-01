// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增项目区域 POST /api/v1/system/area/info/create */
export async function postApiV1SystemAreaInfoCreate(body: {}, options?: { [key: string]: any }) {
  return request<{ code: number; msg: string }>('/api/v1/system/area/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除项目区域 POST /api/v1/system/area/info/delete */
export async function postApiV1SystemAreaInfo__openAPI__delete(
  body: {},
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/area/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取项目区域列表 POST /api/v1/system/area/info/index */
export async function postApiV1SystemAreaInfoIndex(
  body: {
    page?: API.PageInfo;
    projectID?: string;
    projectIDs?: string[];
    areaID?: string;
    areaIDs?: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { total?: number; list?: Record<string, any>[] };
  }>('/api/v1/system/area/info/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取项目区域详情（不含子节点） POST /api/v1/system/area/info/read */
export async function postApiV1SystemAreaInfoRead(
  body: {
    areaID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: API.ProjectArea }>(
    '/api/v1/system/area/info/read',
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

/** 获取项目区域树 POST /api/v1/system/area/info/tree */
export async function postApiV1SystemAreaInfoTree(body: {}, options?: { [key: string]: any }) {
  return request<{ code: number; msg: string; data: { tree?: API.ProjectAreaTree } }>(
    '/api/v1/system/area/info/tree',
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

/** 更新项目区域 POST /api/v1/system/area/info/update */
export async function postApiV1SystemAreaInfoUpdate(body: {}, options?: { [key: string]: any }) {
  return request<{ code: number; msg: string }>('/api/v1/system/area/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
