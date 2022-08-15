// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取ota升级包上传信息 GET /open/dm/genOTAUploadUri */
export async function getOpenDmGenOTAUploadUri(options?: {
  [key: string]: any;
}) {
  return request<Record<string, any>>("/open/dm/genOTAUploadUri", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取设备数据 GET /open/dm/getDeviceData */
export async function getOpenDmGetDeviceData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOpenDmGetDeviceDataParams,
  options?: { [key: string]: any }
) {
  return request<{
    total: string;
    list: { timestamp?: string; dataID?: string; getValue?: string }[];
  }>("/open/dm/getDeviceData", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取设备日志信息 GET /open/dm/getDeviceDescribeLog */
export async function getOpenDmGetDeviceDescribeLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOpenDmGetDeviceDescribeLogParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/open/dm/getDeviceDescribeLog", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取设备信息 POST /open/dm/getDeviceInfo */
export async function postOpenDmGetDeviceInfo(
  body: {},
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/open/dm/getDeviceInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品列表 POST /open/dm/getProductInfo */
export async function postOpenDmGetProductInfo(
  body: {},
  options?: { [key: string]: any }
) {
  return request<{
    list: {
      createdTime?: string;
      productID?: string;
      productName?: string;
      authMode?: number;
      deviceType?: number;
      categoryID?: number;
      netType?: number;
      dataProto?: number;
      autoRegister?: number;
      description?: string;
    }[];
    total: number;
    num: number;
  }>("/open/dm/getProductInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品物模型 POST /open/dm/getProductTemplate */
export async function postOpenDmGetProductTemplate(
  body: {
    productID: string;
  },
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/open/dm/getProductTemplate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 设备登录认证 POST /open/dm/loginAuth */
export async function postOpenDmLoginAuth(
  body: {
    username: string;
    password: string;
    clientID: string;
    ip: string;
  },
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/open/dm/loginAuth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理设备 POST /open/dm/manageDevice */
export async function postOpenDmManageDevice(
  body: {},
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/open/dm/manageDevice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理产品 POST /open/dm/manageProduct */
export async function postOpenDmManageProduct(
  body: {
    opt: number;
    info: {
      productID?: string;
      productName?: string;
      authMode?: number;
      deviceType?: number;
      categoryID?: number;
      netType?: number;
      dataProto?: number;
      autoRegister?: number;
      description?: string;
    };
  },
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/open/dm/manageProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理产品物模型 POST /open/dm/manageProductTemplate */
export async function postOpenDmManageProductTemplate(
  body: {
    info: { productID?: string; template?: string };
  },
  options?: { [key: string]: any }
) {
  return request<{ createdTime: string; productID: string; template: string }>(
    "/open/dm/manageProductTemplate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 同步调用设备行为 POST /open/dm/sendAction */
export async function postOpenDmSendAction(
  body: {},
  options?: { [key: string]: any }
) {
  return request<{
    clientToken: string;
    outputParams: string;
    status: string;
    code: string;
  }>("/open/dm/sendAction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
