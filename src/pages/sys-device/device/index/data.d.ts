export interface ITags {
  key: string;
  value: string;
}

export interface IDeviceListData {
  productID: string;
  deviceName?: string;
  createdTime?: string;
  secret?: string;
  firstLogin?: string;
  lastLogin?: string;
  version?: string;
  logLevel?: number;
  tags: ITags[];
}
