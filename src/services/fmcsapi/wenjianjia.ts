// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取文件夹数据列表 POST /api/v2/designer/forlder/ */
export async function postV2DesignerForlder(options?: { [key: string]: any }) {
  return request<Record<string, any>>("/api/v2/designer/forlder/", {
    method: "POST",
    ...(options || {}),
  });
}

/** 创建文件夹 POST /api/v2/designer/forlder/create */
export async function postV2DesignerForlderCreate(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/forlder/create", {
    method: "POST",
    ...(options || {}),
  });
}

/** 删除文件夹数据 POST /api/v2/designer/forlder/delete */
export async function postV2DesignerForlder__openAPI__delete(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/forlder/delete", {
    method: "POST",
    ...(options || {}),
  });
}

/** 获取文件夹数据 POST /api/v2/designer/forlder/read */
export async function postV2DesignerForlderRead(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/forlder/read", {
    method: "POST",
    ...(options || {}),
  });
}

/** 更新文件夹数据 POST /api/v2/designer/forlder/update */
export async function postV2DesignerForlderUpdate(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/api/v2/designer/forlder/update", {
    method: "POST",
    ...(options || {}),
  });
}
