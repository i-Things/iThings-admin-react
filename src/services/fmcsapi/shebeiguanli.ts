// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 新增设备 POST /api/v1/things/device/create */
export async function postV1ThingsDeviceCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsDeviceCreateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    productID: string;
    deviceName?: string;
    /** 1)关闭 2)错误 3)告警 4)信息 5)调试  */
    logLevel?: number;
    tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    "/api/v1/things/device/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}

/** 删除设备 POST /api/v1/things/device/delete */
export async function postV1ThingsDevice__openAPI__delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsDevice__openAPI__deleteParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    productID: string;
    deviceName?: string;
    tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    "/api/v1/things/device/delete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取设备列表 POST /api/v1/things/device/index */
export async function postV1ThingsDeviceIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsDeviceIndexParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    page: { page?: number; size?: number };
    /** 为空时获取所有产品 */
    productID?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      list?: {
        productID?: string;
        deviceName?: string;
        createdTime?: string;
        secret?: string;
        firstLogin?: string;
        lastLogin?: string;
        version?: string;
        logLevel?: number;
        tags?: { key?: string; value?: string }[];
      }[];
      total?: number;
      num?: number;
    };
  }>("/api/v1/things/device/index", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备详情 POST /api/v1/things/device/read */
export async function postV1ThingsDeviceRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsDeviceReadParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    /** 为空时获取所有产品 */
    productID: string;
    deviceName: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      productID?: string;
      deviceName?: string;
      createdTime?: string;
      secret?: string;
      firstLogin?: string;
      lastLogin?: string;
      version?: string;
      logLevel?: number;
      tags?: { key?: string; value?: string }[];
    };
  }>("/api/v1/things/device/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 更新设备 POST /api/v1/things/device/update */
export async function postV1ThingsDeviceUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1ThingsDeviceUpdateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    productID: string;
    version?: string;
    /** 1)关闭 2)错误 3)告警 4)信息 5)调试  */
    logLevel?: number;
    tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    "/api/v1/things/device/update",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}
