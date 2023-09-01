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

/** 设备动态注册 POST /api/v1/things/device/auth/register */
export async function postApiV1ThingsDeviceAuthRegister(
  body: {
    productID: string;
    deviceName: string;
    nonce: number;
    timestamp: number;
    /** 对参数（deviceName、nonce、productId、timestamp）按字典序升序排序。
2. 将以上参数，按参数名称 = 参数值 & 参数名称 = 参数值拼接成字符串。
3. 使用 HMAC-sha1 算法对上一步中获得的字符串进行计算，密钥为 ProductSecret。
4. 将生成的结果使用 Base64 进行编码，即可获得最终的签名串放入 signature。
 */
    signature: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { len?: number; payload?: string } }>(
    '/api/v1/things/device/auth/register',
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

/** 未命名接口 POST /register/dev */
export async function postRegisterDev(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/register/dev', {
    method: 'POST',
    ...(options || {}),
  });
}
