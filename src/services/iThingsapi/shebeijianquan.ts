// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 设备操作认证 POST /api/v1/things/device/auth/access */
export async function postApiV1ThingsDeviceAuthAccess(
  body: {
    username: string;
    /** SUB:订阅,PUB:发布 */
    topic: string;
    clientID: string;
    access: string;
    ip: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/device/auth/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备登录认证 POST /api/v1/things/device/auth/login */
export async function postApiV1ThingsDeviceAuthLogin(
  body: {
    username: string;
    password: string;
    clientID: string;
    ip: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/device/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 鉴定mqtt账号root权限 POST /api/v1/things/device/auth/root-check */
export async function postApiV1ThingsDeviceAuthRootCheck(
  body: {
    username: string;
    password: string;
    clientID: string;
    ip: string;
    /** base64 */
    certificate: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/device/auth/root-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
