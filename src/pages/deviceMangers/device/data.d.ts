export interface DeviceInfo {
  productID: string;
  deviceName: string;
  /** 运维监控日志服务-筛选设备是否切换 */
  deviceIsChange?: boolean;
}

export interface PageInfo {
  current: number;
  pageSize: number;
}
