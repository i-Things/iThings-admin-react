// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建场景信息 POST /api/v1/things/rule/scene/info/create */
export async function postApiV1ThingsRuleSceneInfoCreate(
  body: {
    id?: number;
    name?: string;
    /** device: 设备触发 timer: 定时触发 manual:手动触发 */
    triggerType: string;
    trigger?: string;
    when?: string;
    then?: string;
    desc?: string;
    /** 1启用 2禁用 */
    status: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { id?: number } }>(
    '/api/v1/things/rule/scene/info/create',
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

/** 删除场景信息 POST /api/v1/things/rule/scene/info/delete */
export async function postApiV1ThingsRuleSceneInfo__openAPI__delete(
  body: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/scene/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取场景列表 POST /api/v1/things/rule/scene/info/index */
export async function postApiV1ThingsRuleSceneInfoIndex(
  body: {
    page?: { page?: number; size?: number };
    name?: string;
    /** 1启用 2禁用 */
    state?: number;
    /** device: 设备触发 timer: 定时触发 manual:手动触发 */
    triggerType?: string;
    alarmID?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { list?: API.scene[]; total?: number } }>(
    '/api/v1/things/rule/scene/info/index',
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

/** 手动触发场景联动 POST /api/v1/things/rule/scene/info/manually-trigger */
export async function postApiV1ThingsRuleSceneInfoManuallyTrigger(
  body: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/scene/info/manually-trigger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取场景信息 POST /api/v1/things/rule/scene/info/read */
export async function postApiV1ThingsRuleSceneInfoRead(
  body: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: API.scene }>(
    '/api/v1/things/rule/scene/info/read',
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

/** 更新场景信息 POST /api/v1/things/rule/scene/info/update */
export async function postApiV1ThingsRuleSceneInfoUpdate(
  body: {
    id?: number;
    name?: string;
    /** device: 设备触发 timer: 定时触发 manual:手动触发 */
    triggerType: string;
    trigger?: string;
    when?: string;
    then?: string;
    desc?: string;
    /** 1启用 2禁用 */
    status: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/scene/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
