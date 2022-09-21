export interface TagsInfo {
  key?: string;
  value?: string;
}

export interface DeviceInfo {
  productID?: string;
  deviceName?: string;
  createdTime?: string;
  secret?: string;
  firstLogin?: string;
  lastLogin?: string;
  version?: string;
  logLevel?: number;
  cert?: string;
  tags?: TagsInfo[];
  isOnline?: number;
}
