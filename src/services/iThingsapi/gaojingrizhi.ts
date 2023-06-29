// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取告警流水日志记录列表 POST /api/v1/things/rule/alarm/log/index */
export async function postApiV1ThingsRuleAlarmLogIndex(
  body: {
    page?: { page?: number; size?: number };
    alarmRecordID: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: { num?: number; total?: number; list?: API.alarmLog[] };
  }>('/api/v1/things/rule/alarm/log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
