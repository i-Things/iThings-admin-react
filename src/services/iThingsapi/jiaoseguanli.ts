// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 添加角色 POST /api/v1/system/role/create */
export async function postApiV1SystemRoleCreate(
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
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 POST /api/v1/system/role/delete */
export async function postApiV1SystemRole__openAPI__delete(
  body: {
    /** 角色编号 */
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/role/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色列表 POST /api/v1/system/role/index */
export async function postApiV1SystemRoleIndex(
  body: {
    page?: { page?: number; size?: number };
    /** 按名称查找角色 */
    name?: string;
    /** 按状态查找角色 */
    status?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    total: number;
    list: {
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
    data: body,
    ...(options || {}),
  });
}

/** 更新角色对应菜单列表 POST /api/v1/system/role/role-menu/update */
export async function postApiV1SystemRoleRoleMenuUpdate(
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
    data: body,
    ...(options || {}),
  });
}

/** 更新角色 POST /api/v1/system/role/update */
export async function postApiV1SystemRoleUpdate(
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
    data: body,
    ...(options || {}),
  });
}
