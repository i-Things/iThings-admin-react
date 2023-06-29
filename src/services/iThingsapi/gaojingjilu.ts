// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取告警记录列表 POST /api/v1/things/rule/alarm/record/index */
export async function postApiV1ThingsRuleAlarmRecordIndex(
  body: {
    alarmID?: number;
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total?: number;
      num?: number;
      list?: {
        id?: number;
        dealState?: number;
        alarmID?: number;
        triggerType?: number;
        productID?: string;
        deviceName?: string;
        sceneName?: string;
        sceneID?: number;
        level?: number;
        lastAlarm?: string;
        createdTime?: string;
      }[];
    };
  }>('/api/v1/things/rule/alarm/record/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
