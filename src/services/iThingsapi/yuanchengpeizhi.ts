// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建配置 POST /api/v1/things/product/remote-config/create */
export async function postApiV1ThingsProductRemoteConfigCreate(
  body: {
    /** 产品id */
    productID: string;
    /** 配置内容 */
    content: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/product/remote-config/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取配置列表 POST /api/v1/things/product/remote-config/index */
export async function postApiV1ThingsProductRemoteConfigIndex(
  body: {
    page?: { page?: number; size?: number };
    /** 产品id */
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { list?: { content?: string; id?: number; createTime?: string }[]; total?: number };
  }>('/api/v1/things/product/remote-config/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取最新配置 POST /api/v1/things/product/remote-config/lastest-read */
export async function postApiV1ThingsProductRemoteConfigLastestRead(
  body: {
    /** 产品id */
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { productID?: string; content?: string; createdTime?: string };
  }>('/api/v1/things/product/remote-config/lastest-read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 推送配置 POST /api/v1/things/product/remote-config/push-all */
export async function postApiV1ThingsProductRemoteConfigPushAll(
  body: {
    /** 产品id */
    productID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/product/remote-config/push-all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
