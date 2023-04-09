// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取产品脚本 物联网平台通过定义一种物的描述语言来描述物模型模块和功能，称为TSL（Thing Specification Language） POST /api/v1/things/product/script/read */
export async function postApiV1ThingsProductScriptRead(
  body: {
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { productID?: string; script?: string; lang?: number };
  }>('/api/v1/things/product/script/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新脚本 POST /api/v1/things/product/script/update */
export async function postApiV1ThingsProductScriptUpdate(
  body: {
    productID: string;
    script: string;
    /** 1:JavaScript 2:lua 3:python */
    lang: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/product/script/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
