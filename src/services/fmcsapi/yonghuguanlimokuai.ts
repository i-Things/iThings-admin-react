// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 登录 POST /front/user/login */
export async function postFrontUserLogin(
  body: {
    userID: string;
    pwdtype: number;
    password: string;
    loginType: string;
    code: string;
    codeID: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    info: { uid?: string; createTime?: string };
    token: {
      accessToken?: string;
      accessExpire?: string;
      refreshAfter?: string;
    };
  }>("/front/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户信息 POST /front/user/modifyUserInfo */
export async function postFrontUserModifyUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postFrontUserModifyUserInfoParams & {
    // header
    "yl-token": string;
  },
  body: {},
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/front/user/modifyUserInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 注册第二步 POST /front/user/register2 */
export async function postFrontUserRegister2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postFrontUserRegister2Params & {
    // header
    authorization: string;
  },
  body: {},
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/front/user/register2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 注册第一步微信小程序 POST /front/user/registerCore */
export async function postFrontUserRegisterCore(
  body: {},
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/front/user/registerCore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /front/user/userInfo */
export async function getFrontUserUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFrontUserUserInfoParams & {
    // header
    "yl-token": string;
  },
  body: {},
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/front/user/userInfo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取验证码 POST /front/verify/captcha */
export async function postFrontVerifyCaptcha(
  body: {},
  options?: { [key: string]: any }
) {
  return request<{ codeID: string; url: string; expire: number }>(
    "/front/verify/captcha",
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

/** 获取用户核心信息列表 GET /open/user/userCoreList */
export async function getOpenUserUserCoreList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOpenUserUserCoreListParams,
  body: {},
  options?: { [key: string]: any }
) {
  return request<{
    total: number;
    info: {
      uid?: number;
      userName?: string;
      email?: string;
      phone?: string;
      wechat?: string;
      lastIP?: string;
      regIP?: string;
      createdTime?: number;
      status?: number;
    }[];
  }>("/open/user/userCoreList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 批获取用户信息列表 POST /open/user/userInfos */
export async function postOpenUserUserInfos(
  body: {},
  options?: { [key: string]: any }
) {
  return request<{ info: { uid?: string; createTime?: string }[] }>(
    "/open/user/userInfos",
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
