export interface TagsInfo {
  key?: string;
  value?: string;
}

export interface DeviceInfo {
  productID: string;
  deviceName: string;
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
}
