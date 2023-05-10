export interface AlarmLogInfo {
  id: number;
  /** 描述 */
  desc: string;
  createdTime: number;
  /** 告警记录ID */
  alarmRecordID: number;
  /** 告警流水 */
  serial: string;
  /** 场景名称 */
  sceneName: string;
  /** 场景ID */
  sceneID: number;
}
