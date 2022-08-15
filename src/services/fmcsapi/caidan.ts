// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取菜单数据列表 POST /api/v1/system/app/menu/index */
export async function postV1SystemAppMenuIndex(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v1/system/app/menu/index", {
    method: "POST",
    ...(options || {}),
  });
}

/** 获取用户菜单数据列表 根据用户id和权限，获取菜单列表 POST /api/v1/system/app/menu/userIndex */
export async function postV1SystemAppMenuUserIndex(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v1/system/app/menu/userIndex", {
    method: "POST",
    ...(options || {}),
  });
}
