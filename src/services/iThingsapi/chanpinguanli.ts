// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增产品 POST /api/v1/things/product/info/create */
export async function postApiV1ThingsProductInfoCreate(
  body: {
    productID: string;
    productName?: string;
    /** 只有这个参数为true的时候才会更新产品图片,传参为产品图片的file path */
    isUpdateProductImg?: boolean;
    /** 1:其他,2:wi-fi,3:2G/3G/4G,4:5G,5:BLE,6:LoRaWAN */
    netType?: number;
    /** 1:自定义,2:数据模板 */
    dataProto?: number;
    /** 1:设备,2:网关,3:子设备 */
    deviceType?: number;
    /** 1:账密认证,2:秘钥认证 */
    authMode?: number;
    /** 1:关闭,2:打开,3:打开并自动创建设备 */
    autoRegister?: number;
    categoryID?: number;
    desc?: string;
    createdTime?: string;
    devStatus?: number;
    /** 动态注册产品秘钥 */
    secret: string;
    tags?: { key?: string; value?: string }[];
    /** 文件上传接口返回的dir */
    productImg?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/product/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除产品 POST /api/v1/things/product/info/delete */
export async function postApiV1ThingsProductInfo__openAPI__delete(
  body: {
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/product/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品列表 POST /api/v1/things/product/info/index */
export async function postApiV1ThingsProductInfoIndex(
  body: {
    page?: { page?: number; size?: number };
    deviceType?: number;
    productName?: string;
    productIDs?: string[];
    /** 非模糊查询 为tag的名,value为tag对应的值 */
    tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      list?: {
        productID?: string;
        productName?: string;
        productImg?: string;
        isUpdateProductImg?: boolean;
        netType?: number;
        dataProto?: number;
        deviceType?: number;
        authMode?: number;
        autoRegister?: number;
        categoryID?: number;
        desc?: string;
        createdTime?: string;
        devStatus?: number;
        tags?: API.tagList;
        secret?: string;
      }[];
      total?: number;
      num?: number;
    };
    code: number;
    msg: string;
  }>('/api/v1/things/product/info/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品详情 POST /api/v1/things/product/info/read */
export async function postApiV1ThingsProductInfoRead(
  body: {
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      productID?: string;
      productName?: string;
      productImg?: string;
      isUpdateProductImg?: boolean;
      netType?: number;
      dataProto?: number;
      deviceType?: number;
      authMode?: number;
      autoRegister?: number;
      categoryID?: number;
      desc?: string;
      createdTime?: string;
      devStatus?: number;
      secret?: string;
      tags?: { key?: string; value?: string }[];
    };
    code: number;
    msg: string;
  }>('/api/v1/things/product/info/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新产品 POST /api/v1/things/product/info/update */
export async function postApiV1ThingsProductInfoUpdate(
  body: {
    productID: string;
    productName?: string;
    productImg?: string;
    /** 只有这个参数为true的时候才会更新产品图片,传参为产品图片的file path */
    isUpdateProductImg?: boolean;
    /** 1:其他,2:wi-fi,3:2G/3G/4G,4:5G,5:BLE,6:LoRaWAN */
    netType?: number;
    /** 1:自定义,2:数据模板 */
    dataProto?: number;
    /** 1:设备,2:网关,3:子设备 */
    deviceType?: number;
    /** 1:账密认证,2:秘钥认证 */
    authMode?: number;
    /** 1:关闭,2:打开,3:打开并自动创建设备 */
    autoRegister?: number;
    categoryID?: number;
    desc?: string;
    createdTime?: string;
    devStatus?: number;
    /** 动态注册产品秘钥 */
    secret: string;
    tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/product/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
