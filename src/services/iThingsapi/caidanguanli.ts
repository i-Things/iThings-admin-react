// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 添加菜单 POST /api/v1/system/menu/create */
export async function postSystemMenuCreate(
  body: {
    /** 菜单名称 */
    name: string;
    /** 父菜单ID，一级菜单为1 */
    parentID: number;
    /** 类型 1：目录 2：菜单 3：按钮 */
    type: number;
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
  return request<{ code: number; msg: string }>('/api/v1/system/menu/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 POST /api/v1/system/menu/delete */
export async function postSystemMenu__openAPI__delete(
  body: {
    /** 菜单编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/menu/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取菜单列表 POST /api/v1/system/menu/index */
export async function postSystemMenuIndex(
  body: {
    /** 按照菜单名筛选 （只有获取完整菜单时有效） */
    name?: string;
    /** 按菜单路径筛选（只有获取完整菜单时有效） */
    path?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    total: number;
    data: {
      id?: number;
      name?: string;
      parentID?: number;
      type?: number;
      path?: string;
      component?: string;
      icon?: string;
      redirect?: string;
      order?: number;
    }[];
  }>('/api/v1/system/menu/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新菜单 POST /api/v1/system/menu/update */
export async function postSystemMenuUpdate(
  body: {
    /** 编号 */
    id: number;
    /** 菜单名称 */
    name?: string;
    /** 父菜单ID，一级菜单为1 */
    parentID?: number;
    /** 类型 1：目录 2：菜单 3：按钮 */
    type?: number;
    /** 系统的path */
    path?: string;
    /** 页面 */
    component?: string;
    /** 菜单图标 */
    icon?: string;
    /** 路由重定向 */
    redirect?: string;
    /** 排序 */
    order?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/menu/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
