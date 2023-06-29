// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增告警处理记录 POST /api/v1/things/rule/alarm/deal-record/create */
export async function postApiV1ThingsRuleAlarmDealRecordCreate(
  body: {
    alarmRecordID: number;
    result: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/alarm/deal-record/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取告警处理记录列表 POST /api/v1/things/rule/alarm/deal-record/index */
export async function postApiV1ThingsRuleAlarmDealRecordIndex(
  body: {
    page?: { page?: number; size?: number };
    alarmRecordID?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { total?: number; num?: number; list?: API.alarmDealRecord[] };
  }>('/api/v1/things/rule/alarm/deal-record/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
