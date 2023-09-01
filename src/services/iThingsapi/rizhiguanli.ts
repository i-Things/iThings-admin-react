// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取登录日志列表 POST /api/v1/system/log/login/index */
export async function postApiV1SystemLogLoginIndex(
  body: {
    page?: { page?: number; size?: number };
    /** 按ip地址查找 */
    ipAddr?: string;
    /** 按登录地址查找 */
    loginLocation?: string;
    /** 按时间范围查找 */
    dateRange?: { start?: string; end?: string };
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total?: number;
      list?: {
        userID?: number;
        userName?: string;
        ipAddr?: string;
        loginLocation?: string;
        browser?: string;
        os?: string;
        code?: string;
        msg?: string;
        createdTime?: string;
      }[];
    };
  }>('/api/v1/system/log/login/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取操作日志列表 POST /api/v1/system/log/oper/index */
export async function postApiV1SystemLogOperIndex(
  body: {
    page?: { page?: number; size?: number };
    /** 按操作名称查找 */
    operName?: string;
    /** 按操作人员名称查找 */
    operUserName?: string;
    /** 按业务类型（1新增 2修改 3删除 4查询 5其它）查找 */
    businessType?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total?: number;
      list?: {
        userID?: number;
        operUserName?: string;
        operName?: string;
        businessType?: string;
        uri?: string;
        operIpAddr?: string;
        operLocation?: string;
        req?: string;
        resp?: string;
        code?: string;
        msg?: string;
        createdTime?: string;
      }[];
    };
  }>('/api/v1/system/log/oper/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
