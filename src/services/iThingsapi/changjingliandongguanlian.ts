// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 删除告警和场景的关联 POST /api/v1/things/rule/alarm/scene/delete */
export async function postApiV1ThingsRuleAlarmScene__openAPI__delete(
  body: {
    alarmID: number;
    sceneID: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/alarm/scene/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增告警和场景的关联 POST /api/v1/things/rule/alarm/scene/multi-create */
export async function postApiV1ThingsRuleAlarmSceneMultiCreate(
  body: {
    alarmID: number;
    sceneIDs: number[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/rule/alarm/scene/multi-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
