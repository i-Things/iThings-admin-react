// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取产品自定义信息 物联网平台通过定义一种物的描述语言来描述物模型模块和功能，称为TSL（Thing Specification Language） POST /api/v1/things/product/custom/read */
export async function postApiV1ThingsProductCustomRead(
  body: {
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      productID?: string;
      transformScript?: string;
      scriptLang?: number;
      customTopic?: string;
    };
  }>('/api/v1/things/product/custom/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新自定义信息 POST /api/v1/things/product/custom/update */
export async function postApiV1ThingsProductCustomUpdate(
  body: {
    productID: string;
    transformScript?: string;
    /** 1:JavaScript 2:lua 3:python */
    scriptLang?: number;
    customTopic?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/product/custom/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
