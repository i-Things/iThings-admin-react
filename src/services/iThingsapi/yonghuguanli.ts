// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取验证码 POST /api/v1/system/user/captcha */
export async function postSystemUserCaptcha(
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
    data: body,
    ...(options || {}),
  });
}

/** 创建用户信息 POST /api/v1/system/user/create */
export async function postSystemUserCreate(
  body: {
    /** 注册方式:	phone手机号注册 wxopen 微信开放平台登录 wxin 微信内登录 wxminip 微信小程序 密码方式 pwd 账密方式 */
    reqType: string;
    /** 手机号注册时填写手机号,账密登录时填写用户账号 */
    userName: string;
    /** 明文密码 必输 */
    password: string;
    /** 用户角色 */
    role: number;
    /** 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 */
    sex: number;
    /** 邮箱 */
    email?: string;
    /** 手机号 */
    phone?: string;
    /** 微信UnionID */
    wechat?: string;
    /** 最后登录ip */
    lastIP?: string;
    /** 注册ip */
    regIP?: string;
    /** 用户的昵称 */
    nickName?: string;
    /** 用户所在城市 */
    city?: string;
    /** 用户所在省份 */
    province?: string;
    /** 用户所在国家 */
    country?: string;
    /** 用户的语言，简体中文为zh_CN */
    language?: string;
    /** 用户头像 */
    headImgUrl?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; uid: number }>('/api/v1/system/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/v1/system/user/delete */
export async function postSystemUser__openAPI__delete(
  body: {
    /** 用户id */
    uid: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息列表 POST /api/v1/system/user/index */
export async function postSystemUserIndex(
  body: {
    /** 分页 */
    page: { page?: number; size?: number };
    /** 按用户账号筛选 */
    userName?: string;
    /** 按手机号筛选 */
    phone?: string;
    /** 按邮箱筛选 */
    email?: string;
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
        email?: string;
        phone?: string;
        wechat?: string;
        lastIP?: string;
        regIP?: string;
        role?: string;
        nickName?: string;
        sex?: string;
        citty?: string;
        country?: string;
        province?: string;
        language?: string;
        headImgUrl?: string;
        createdTime?: string;
      }[];
      total?: string;
    };
  }>('/api/v1/system/user/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录 POST /api/v1/system/user/login */
export async function postSystemUserLogin(
  body: {
    /** 账号密码登录时需要填写.0,无密码 1，明文 2，md5加密 */
    pwdType: number;
    /** 登录账号(支持用户名,手机号登录) 账号密码登录时需要填写 */
    userID: string;
    /** 密码，建议md5转换 密码登录时需要填写 注意：md5转换的密码固定使用是32位小写方式的md5转换结果 */
    password: string;
    /** 验证类型 sms 短信验证码 img 图形验证码加账号密码登录 wxopen 微信开放平台登录 wxin 微信内登录 wxminip 微信小程序 */
    loginType: string;
    /** 验证码 微信登录填code 登录类型为img时必输 */
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
        email?: string;
        phone?: string;
        wechat?: string;
        lastIP?: string;
        regIP?: string;
        nickName?: string;
        city?: string;
        country?: string;
        province?: string;
        language?: string;
        headImgUrl?: string;
        createTime?: string;
        role?: number;
        sex?: string;
      };
      token?: { accessToken?: string; accessExpire?: string; refreshAfter?: string };
    };
  }>('/api/v1/system/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 POST /api/v1/system/user/read */
export async function postSystemUserRead(
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
      sex?: number;
      city?: string;
      country?: string;
      province?: string;
      language?: string;
      headImgUrl?: string;
      createTime?: string;
      email?: string;
      phone?: string;
      wechat?: string;
      lastIP?: string;
      regIP?: string;
      role?: string;
    };
  }>('/api/v1/system/user/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户资源 POST /api/v1/system/user/resource-read */
export async function postSystemUserResourceRead(body: {}, options?: { [key: string]: any }) {
  return request<{
    code: number;
    msg: string;
    data: {
      menu?: {
        id?: number;
        name?: string;
        parentID?: number;
        type?: number;
        path?: string;
        component?: string;
        icon?: string;
        redirect?: string;
        createTime?: number;
        order?: number;
      }[];
    };
  }>('/api/v1/system/user/resource-read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户基本数据 POST /api/v1/system/user/update */
export async function postSystemUserUpdate(
  body: {
    /** 用户id */
    uid: string;
    /** 用户账号 */
    userName?: string;
    /** 邮箱 */
    email?: string;
    /** 手机号 */
    phone?: string;
    /** 微信号 */
    wechat?: string;
    /** 用户的昵称 */
    nickName?: string;
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
    /** 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 */
    sex?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data?: Record<string, any> }>(
    '/api/v1/system/user/update',
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
