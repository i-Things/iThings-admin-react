export interface RecordList {
  id: number;
  dealState: number;
  alarmID: number;
  triggerType: number;
  productID: string;
  deviceName: string;
  sceneName: string;
  sceneID: number;
  level: number;
  lastAlarm: string;
  createdTime: string;
}

export interface RecordData {
  total: number;
  num: number;
  list: Partial<RecordList>[];
}

export interface HandleListInfo {
  id: number;
  createdTime: number;
  /** 告警记录ID */
  alarmRecordID: number;
  /** 告警处理结果 */
  result: string;
  /** 告警处理类型 1人工 2系统 */
  type: number;
  /** 最早告警时间 */
  alarmTime: number;
}
