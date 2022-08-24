// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 添加菜单 POST /api/v1/system/menu/create */
export async function postSystemMenuCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemMenuCreateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    /** 菜单名称 */
    name: string;
    /** 父菜单ID，一级菜单为1 */
    parentID: string;
    /** 类型   1：目录   2：菜单   3：按钮 */
    type: string;
    /** 系统的path */
    path: string;
    /** 页面 */
    component: string;
    /** 菜单图标 */
    icon: string;
    /** 路由重定向 */
    redirect: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    '/api/v1/system/menu/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除菜单 POST /api/v1/system/menu/delete */
export async function postSystemMenu__openAPI__delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemMenu__openAPI__deleteParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    /** 菜单编号 */
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    '/api/v1/system/menu/delete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取菜单列表 POST /api/v1/system/menu/index */
export async function postSystemMenuIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemMenuIndexParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    page: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    total: string;
    data: {
      id?: string;
      name?: string;
      parentID?: string;
      type?: string;
      path?: string;
      component?: string;
      icon?: string;
      redirect?: string;
    }[];
  }>('/api/v1/system/menu/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 更新菜单 POST /api/v1/system/menu/update */
export async function postSystemMenuUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemMenuUpdateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    /** 编号 */
    id: string;
    /** 菜单名称 */
    name: string;
    /** 父菜单ID，一级菜单为1 */
    parentID: string;
    /** 类型   1：目录   2：菜单   3：按钮 */
    type: string;
    /** 系统的path */
    path: string;
    /** 页面 */
    component: string;
    /** 菜单图标 */
    icon: string;
    /** 路由重定向 */
    redirect: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    '/api/v1/system/menu/update',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    },
  );
}
