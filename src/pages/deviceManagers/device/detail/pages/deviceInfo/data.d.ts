export interface TagsInfo {
  key?: string;
  value?: string;
}

export interface DeviceInfo {
  productID: string;
  deviceName: string;
  deviceAlias: string;
  createdTime: string;
  secret: string;
  imei: string;
  mac: string;
  hardInfo: string;
  softInfo: string;
  firstLogin: string;
  lastLogin: string;
  version: string;
  logLevel: number;
  cert: string;
  tags: TagsInfo[];
  isOnline: number;
  address: string;
  position: {
    longitude?: number;
    latitude?: number;
  };
  /** 项目id */
  projectID?: string;
  /** 项目区域id */
  areaID?: string;
  /** 移动运营商 1)移动 2)联通 3)电信 4)广电 */
  mobileOperator?: number;
  /** 手机号 */
  phone?: string;
  /** SIM卡卡号 */
  iccid?: string;
  /** 所属用户id */
  userID?: string;
}
