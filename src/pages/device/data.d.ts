interface IDeviceTag {
  key: string;
  value: string;
}

interface IDeviceMsg {
  productID: string;
  deviceName: string;
  createdTime: string;
  secret: string;
  firstLogin: string;
  lastLogin: string;
  version: string;
  logLevel: number;
  tags: Array<IDeviceTag>;
}
