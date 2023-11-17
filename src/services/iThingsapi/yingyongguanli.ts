// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 添加应用 POST /api/v1/system/app/create */
export async function postApiV1SystemAppCreate(
  body: {
    /** 菜单名称 */
    name: string;
    /** 父菜单ID，一级菜单为1 */
    parentID?: number;
    /** 类型   1：目录   2：菜单   3：按钮 */
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
    /** 是否隐藏 1-是 2-否 */
    hideInMenu?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/app/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
