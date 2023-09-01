// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增物模型功能 POST /api/v1/things/product/schema/create */
export async function postApiV1ThingsProductSchemaCreate(
  body: API.ProductSchemaInfo,
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/product/schema/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除物模型功能 POST /api/v1/things/product/schema/delete */
export async function postApiV1ThingsProductSchema__openAPI__delete(
  body: {
    productID: string;
    /** 1:property属性 2:event事件 3:action行为 */
    type: number;
    /** 1:自定义 2:可选 3:必选  必选不可删除 */
    tag?: number;
    identifier: string;
    name?: string;
    desc?: string;
    /** 1:是 2:否 */
    required: number;
    affordance: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/product/schema/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品物模型列表 POST /api/v1/things/product/schema/index */
export async function postApiV1ThingsProductSchemaIndex(
  body: {
    productID: string;
    /** 1:property属性 2:event事件 3:action行为 */
    type?: number;
    page?: { page?: number; size?: number };
    /** 1:自定义 2:可选 3:必选 */
    tag?: number;
    identifiers?: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { list?: API.ProductSchemaInfo[]; total?: number };
  }>('/api/v1/things/product/schema/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导入物模型tsl 物联网平台通过定义一种物的描述语言来描述物模型模块和功能，称为TSL（Thing Specification Language） POST /api/v1/things/product/schema/tsl-import */
export async function postApiV1ThingsProductSchemaTslImport(
  body: {
    productID: string;
    tsl: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/product/schema/tsl-import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品物模型tsl 物联网平台通过定义一种物的描述语言来描述物模型模块和功能，称为TSL（Thing Specification Language） POST /api/v1/things/product/schema/tsl-read */
export async function postApiV1ThingsProductSchemaTslRead(
  body: {
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: any; tsl: string 
}>('/api/v1/things/product/schema/tsl-read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新物模型功能 POST /api/v1/things/product/schema/update */
export async function postApiV1ThingsProductSchemaUpdate(
  body: {
    productID: string;
    /** 1:property属性 2:event事件 3:action行为 */
    type: number;
    /** 1:自定义 2:可选 3:必选  必选不可删除 */
    tag?: number;
    identifier: string;
    name?: string;
    desc?: string;
    /** 1:是 2:否 */
    required: number;
    affordance: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/product/schema/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
