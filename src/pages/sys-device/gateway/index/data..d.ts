interface IGateWayData {
  id: string; // 设备id

  collectorLocate?: string; // 采集器位置

  collectorID?: sting; // 采集器虚拟ID

  collectorName?: string; // 采集器名字

  collectorModle?: string; // 采集器型号

  deviceName?: string; // 设备名称

  gateway?: string; // 所属网关

  plcType?: string; // 所属PLC

  responsible?: string; // 负责人

  operationStatus?: string; // 投运状态

  phone?: string; // 联系电话

  deviceType?: string; // 设备型号

  system?: string; // 所属系统

  createdTime?: number; // 创建时间
}
