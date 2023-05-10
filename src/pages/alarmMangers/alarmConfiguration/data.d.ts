export interface AlarmItem {
  id?: number;
  /** 名称 */
  name: string;
  /** 状态 1启用 2禁用 */
  state: number;
  desc: string;
  createdTime?: number;
  /** 告警配置级别 1提醒 2一般 3严重 4紧急 5超紧急 */
  level: number;
}

export interface AlarmInfo {
  total: number;
  list: AlarmItem[];
  num: number;
}
