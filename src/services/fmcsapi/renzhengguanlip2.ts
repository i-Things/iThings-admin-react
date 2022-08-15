// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 设备操作认证 POST /api/v1/things/auth/access */
export async function postV1ThingsAuthAccess(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsAuthAccessParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    username: string;
    /** SUB:订阅,PUB:发布 */
    topic: string;
    clientID: string;
    access: string;
    ip: string;
  },
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/v1/things/auth/access", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 设备登录认证 POST /api/v1/things/auth/login */
export async function postV1ThingsAuthLogin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsAuthLoginParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    username: string;
    password: string;
    clientID: string;
    ip: string;
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string }>("/api/v1/things/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 鉴定mqtt账号root权限 POST /api/v1/things/auth/root-check */
export async function postV1ThingsAuthRootCheck(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsAuthRootCheckParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    username: string;
    password: string;
    clientID: string;
    ip: string;
    /** base64 */
    certificate: string;
  },
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/v1/things/auth/root-check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
