export interface DeviceStatic {
  deviceCount: { online?: number; offline?: number; inactive?: number; unknown?: number };
  deviceTypeCount: { device?: number; gateway?: number; subset?: number; unknown?: number };
}

export interface ChartsOptionData {
  name: string;
  value: number;
}
