// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 添加接口 POST /api/v1/system/api/create */
export async function postApiV1SystemApiCreate(
  body: {
    /** 接口路由 */
    route: string;
    /** 接口请求方式: （1 GET 2 POST 3 HEAD 4 OPTIONS 5 PUT 6 DELETE 7 TRACE 8 CONNECT 9 其它） */
    method: number;
    /** 接口分组 */
    group: string;
    /** 接口名称 */
    name: string;
    /** 业务类型（1新增 2修改 3删除 4查询 5其它） */
    businessType: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除接口 POST /api/v1/system/api/delete */
export async function postApiV1SystemApi__openAPI__delete(
  body: {
    /** 接口编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取接口列表 POST /api/v1/system/api/index */
export async function postApiV1SystemApiIndex(
  body: {
    page?: { page?: number; size?: number };
    /** 接口路由 */
    route?: string;
    /** 接口请求方式: （1 GET 2 POST 3 HEAD 4 OPTIONS 5 PUT 6 DELETE 7 TRACE 8 CONNECT 9 其它） */
    method?: number;
    /** 接口分组 */
    group?: string;
    /** 接口名称 */
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total?: number;
      list?: {
        id?: number;
        route?: string;
        method?: number;
        group?: string;
        name?: string;
        businessType?: number;
      }[];
    };
  }>('/api/v1/system/api/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新接口 POST /api/v1/system/api/update */
export async function postApiV1SystemApiUpdate(
  body: {
    /** 接口编号 */
    id: number;
    /** 接口路由 */
    route?: string;
    /** 接口请求方式: （1 GET 2 POST 3 HEAD 4 OPTIONS 5 PUT 6 DELETE 7 TRACE 8 CONNECT 9 其它） */
    method?: number;
    /** 接口分组 */
    group?: string;
    /** 接口名称 */
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/api/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
