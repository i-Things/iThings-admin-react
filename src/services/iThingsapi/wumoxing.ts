// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取产品物模型 POST /api/v1/things/product/schema/read */
export async function postThingsProductSchemaRead(
  body: {
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { createdTime?: string; productID?: string; schema?: string };
  }>('/api/v1/things/product/schema/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑物模型 POST /api/v1/things/product/schema/update */
export async function postThingsProductSchemaUpdate(
  body: {
    productID: string;
    schema: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    '/api/v1/things/product/schema/update',
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
