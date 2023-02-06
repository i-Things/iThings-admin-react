// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建流 POST /api/v1/things/rule/flow/create */
export async function postThingsRuleFlowCreate(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/things/rule/flow/create', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除流 POST /api/v1/things/rule/flow/delete */
export async function postThingsRuleFlow__openAPI__delete(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/things/rule/flow/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取流列表 POST /api/v1/things/rule/flow/index */
export async function postThingsRuleFlowIndex(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/things/rule/flow/index', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改流 POST /api/v1/things/rule/flow/update */
export async function postThingsRuleFlowUpdate(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/things/rule/flow/update', {
    method: 'POST',
    ...(options || {}),
  });
}
