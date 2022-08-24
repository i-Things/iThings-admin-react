// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取验证码 POST /api/v1/system/user/captcha */
export async function postSystemUserCaptcha(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserCaptchaParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    /** 用途 */
    use: string;
    data: string;
    type: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data?: { codeID?: string; url?: string; expire?: number };
  }>('/api/v1/system/user/captcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 创建用户核心信息 POST /api/v1/system/user/core/create */
export async function postSystemUserCoreCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserCoreCreateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    /** 注册方式:	phone手机号注册 wxopen 微信开放平台登录 wxin 微信内登录 wxminip 微信小程序,password密码方式  */
    reqType: string;
    /** 账号 或者 写手机号 */
    identity: string;
    password: string;
    /** 验证码    微信登录填code */
    code?: string;
    /** 验证码编号 微信登录填state */
    codeID?: string;
    /** 用户角色，1- admin  2-供应商 3-user   */
    role: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { uid?: string; accessToken?: string; accessExpire?: string; RefreshAfter?: string };
  }>('/api/v1/system/user/core/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户核心信息列表 POST /api/v1/system/user/core/index */
export async function postSystemUserCoreIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserCoreIndexParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    page: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      list?: {
        uid?: string;
        userName?: string;
        password?: string;
        email?: string;
        phone?: string;
        wechat?: string;
        lastIP?: string;
        regIP?: string;
        createdTime?: string;
        status?: string;
        role?: string;
      }[];
      total?: string;
    };
  }>('/api/v1/system/user/core/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 创建用户基本信息 POST /api/v1/system/user/info/create */
export async function postSystemUserInfoCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserInfoCreateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    /** 注册第一步的token */
    token: string;
    /** 用户id */
    Uid?: string;
    /** 用户名(唯一) */
    userName?: string;
    /** 用户的昵称 */
    nickName?: string;
    /** 邀请人用户id */
    inviterUid?: string;
    /** 邀请码 */
    inviterId?: string;
    /** 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 */
    sex?: number;
    /** 用户所在城市 */
    city?: string;
    /** 用户所在国家 */
    country?: string;
    /** 用户所在省份 */
    province?: string;
    /** 用户的语言，简体中文为zh_CN */
    language?: string;
    /** 用户头像 */
    headImgUrl?: string;
    /** 创建时间 */
    createTime?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/user/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/v1/system/user/info/delete */
export async function postSystemUserInfo__openAPI__delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserInfo__openAPI__deleteParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
    /** 用户token */
    'iThings-token'?: string;
  },
  body: {
    /** 用户id */
    uid?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    '/api/v1/system/user/info/delete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    },
  );
}

/** 更新用户基本数据 POST /api/v1/system/user/info/update */
export async function postSystemUserInfoUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserInfoUpdateParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'fmcs-guid'?: string;
    /** 用户token */
    'fmcs-token'?: string;
  },
  body: {
    /** 用户id */
    uid?: string;
    /** 用户的昵称 */
    nickName?: string;
    /** 邀请人用户id */
    inviterUid?: string;
    /** 邀请码 */
    inviterId?: string;
    /** 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 */
    sex?: number;
    /** 用户所在城市 */
    city?: string;
    /** 用户所在国家 */
    country?: string;
    /** 用户所在省份 */
    province?: string;
    /** 用户的语言，简体中文为zh_CN */
    language?: string;
    /** 用户头像 */
    headImgUrl?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data?: Record<string, any> }>(
    '/api/v1/system/user/info/update',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    },
  );
}

/** 登录 POST /api/v1/system/user/login */
export async function postSystemUserLogin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserLoginParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
  },
  body: {
    /** 账号密码登录时需要填写.0,无密码 1，明文 2，md5加密 */
    pwdType: number;
    /** 登录账号(支持用户名,手机号登录) 账号密码登录时需要填写 */
    userID: string;
    /** 密码，建议md5转换 密码登录时需要填写 注意：md5转换的密码固定使用是32位小写方式的md5转换结果 */
    password: string;
    /** 验证类型 sms 短信验证码 img 图形验证码加账号密码登录 wxopen 微信开放平台登录 wxin 微信内登录 wxminip 微信小程序 */
    loginType: string;
    /** 验证码    微信登录填code 登录类型为img时必输 */
    code?: string;
    /** 验证码编号 微信登录填state 登录类型为img时必输 */
    codeID?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      info: {
        uid?: string;
        userName?: string;
        nickName?: string;
        inviterUid?: string;
        inviterId?: string;
        sex?: string;
        city?: string;
        country?: string;
        province?: string;
        language?: string;
        headImgUrl?: string;
        createTime?: string;
        role?: string;
      };
      token?: { accessToken?: string; accessExpire?: string; refreshAfter?: string };
    };
  }>('/api/v1/system/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 POST /api/v1/system/user/read */
export async function postSystemUserRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSystemUserReadParams & {
    // header
    /** 时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    'iThings-guid'?: string;
    /** 用户token */
    'iThings-token'?: string;
  },
  body: {
    /** 用户id */
    uid?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      uid?: string;
      userName?: string;
      nickName?: string;
      inviterUid?: string;
      inviterId?: string;
      sex?: number;
      city?: string;
      country?: string;
      province?: string;
      language?: string;
      headImgUrl?: string;
      createTime?: string;
      password?: string;
      email?: string;
      phone?: string;
      wechat?: string;
      lastIP?: string;
      regIP?: string;
      status?: number;
    };
  }>('/api/v1/system/user/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
