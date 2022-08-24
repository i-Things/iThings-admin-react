// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 添加角色 POST /api/v1/system/role/create */
export async function postSystemRoleCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemRoleCreateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid': string;
  },
  body: {
    /** 角色名称 */
    name: string;
    /** 备注 */
    remark?: string;
    /** 状态 1:启用,2:禁用 */
    status: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/role/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 POST /api/v1/system/role/delete */
export async function postSystemRole__openAPI__delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemRole__openAPI__deleteParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid': string;
  },
  body: {
    /** 角色编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/role/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色列表 POST /api/v1/system/role/index */
export async function postSystemRoleIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemRoleIndexParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid': string;
  },
  body: {
    page: { page?: number; size?: number };
    /** 按编号查找角色 */
    id?: number;
    /** 按名称查找角色 */
    name?: string;
    /** 按状态查找角色 */
    status?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    total: number;
    data: {
      id?: number;
      name?: string;
      remark?: string;
      createdTime?: string;
      status?: number;
      roleMenuID?: number[];
    }[];
  }>('/api/v1/system/role/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 更新角色对应菜单列表 POST /api/v1/system/role/role-menu/update */
export async function postSystemRoleRoleMenuUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemRoleRoleMenuUpdateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid': string;
  },
  body: {
    /** 角色编号 */
    id: number;
    /** 菜单编号列表 */
    menuID: number[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/role/role-menu/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 更新角色 POST /api/v1/system/role/update */
export async function postSystemRoleUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemRoleUpdateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid': string;
  },
  body: {
    /** 编号 */
    id: number;
    /** 角色名称 */
    name?: string;
    /** 备注信息 */
    remark?: string;
    /** 角色状态 1-启用 2-禁用 */
    status?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
