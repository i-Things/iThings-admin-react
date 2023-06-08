// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取系统配置 POST /api/v1/system/common/config */
export async function postApiV1SystemCommonConfig(body: {}, options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: { map: { mode?: string; accessKey?: string } };
  }>('/api/v1/system/common/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 文件直传接口 POST /api/v1/system/common/upload-file */
export async function postApiV1SystemCommonUploadFile(
  body: {
    /** 场景(业务定义 如产品图片 productImg) */
    scene?: string;
    /** 文件名 */
    filePath?: string;
    /** true 文件重命名，false 不重命名(默认) */
    rename?: string;
    /** 业务(如产品管理 productManage) */
    business?: string;
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<{ code: number; msg: string; data: { filePath?: string; fileUri?: string } }>(
    '/api/v1/system/common/upload-file',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 获取文件上传地址 接口返回signed-url ,前端获取到该url后，往该url put上传文件 POST /api/v1/system/common/upload-url/create */
export async function postApiV1SystemCommonUploadUrlCreate(
  body: {
    business: string;
    scene: string;
    filePath: string;
    rename: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<{ filePath: string; uploadUri: string }>(
    '/api/v1/system/common/upload-url/create',
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
