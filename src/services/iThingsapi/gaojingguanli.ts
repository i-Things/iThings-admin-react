// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增告警 POST /api/v1/things/rule/alarm/info/create */
export async function postApiV1ThingsRuleAlarmInfoCreate(
  body: {
    /** 1启用 2禁用 */
    name: string;
    /** 1启用 2禁用 */
    status: number;
    desc: string;
    /** 1提醒 2一般 3严重 4紧急 5超紧急 */
    level: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { id?: number } }>(
    '/api/v1/things/rule/alarm/info/create',
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

/** 删除告警 POST /api/v1/things/rule/alarm/info/delete */
export async function postApiV1ThingsRuleAlarmInfo__openAPI__delete(
  body: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/alarm/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取告警信息列表 POST /api/v1/things/rule/alarm/info/index */
export async function postApiV1ThingsRuleAlarmInfoIndex(
  body: {
    page?: { page?: number; size?: number };
    name?: string;
    /** 1启用 2禁用 */
    sceneID?: number;
    alarmIDs?: number[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { total?: number; list?: API.alarmInfo[]; num?: number };
  }>('/api/v1/things/rule/alarm/info/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取告警详情 POST /api/v1/things/rule/alarm/info/read */
export async function postApiV1ThingsRuleAlarmInfoRead(
  body: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: API.alarmInfo }>(
    '/api/v1/things/rule/alarm/info/read',
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

/** 更新告警 POST /api/v1/things/rule/alarm/info/update */
export async function postApiV1ThingsRuleAlarmInfoUpdate(
  body: {
    /** 1启用 2禁用 */
    name: string;
    /** 1启用 2禁用 */
    status: number;
    desc: string;
    /** 1提醒 2一般 3严重 4紧急 5超紧急 */
    level: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/alarm/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
