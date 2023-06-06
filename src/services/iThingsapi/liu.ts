// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建流 POST /api/v1/things/rule/flow/info/create */
export async function postApiV1ThingsRuleFlowInfoCreate(
  body: {
    ruleID: string;
    ruleName?: string;
    /** 1:是 2:否 */
    isDisabled?: number;
    /** markdown格式 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/rule/flow/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除流 POST /api/v1/things/rule/flow/info/delete */
export async function postApiV1ThingsRuleFlowInfo__openAPI__delete(
  body: {
    ruleID: string;
    ruleName?: string;
    /** 1:是 2:否 */
    isDisabled?: number;
    /** markdown格式 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/rule/flow/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取流列表 POST /api/v1/things/rule/flow/info/index */
export async function postApiV1ThingsRuleFlowInfoIndex(
  body: {
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { list?: API.flow[] } }>(
    '/api/v1/things/rule/flow/info/index',
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

/** 修改流 POST /api/v1/things/rule/flow/info/update */
export async function postApiV1ThingsRuleFlowInfoUpdate(
  body: {
    ruleID: string;
    ruleName?: string;
    /** 1:是 2:否 */
    isDisabled?: number;
    /** markdown格式 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SuccRet>('/api/v1/things/rule/flow/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
