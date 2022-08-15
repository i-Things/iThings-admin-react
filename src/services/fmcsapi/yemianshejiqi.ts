// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 创建页面 POST /api/v2/designer/page/create */
export async function postV2DesignerPageCreate(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/page/create", {
    method: "POST",
    ...(options || {}),
  });
}

/** 删除页面数据 POST /api/v2/designer/page/delete */
export async function postV2DesignerPage__openAPI__delete(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/page/delete", {
    method: "POST",
    ...(options || {}),
  });
}

/** 获取页面数据列表 POST /api/v2/designer/page/index */
export async function postV2DesignerPageIndex(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/page/index", {
    method: "POST",
    ...(options || {}),
  });
}

/** 获取页面数据 POST /api/v2/designer/page/read */
export async function postV2DesignerPageRead(options?: { [key: string]: any }) {
  return request<Record<string, any>>("/api/v2/designer/page/read", {
    method: "POST",
    ...(options || {}),
  });
}

/** 更新页面数据 POST /api/v2/designer/page/update */
export async function postV2DesignerPageUpdate(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/page/update", {
    method: "POST",
    ...(options || {}),
  });
}
