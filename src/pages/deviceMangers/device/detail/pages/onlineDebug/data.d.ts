export type debugType = {
  timestamp?: string;
  action?: string;
  requestID?: string;
  tranceID?: string;
  topic?: string;
  content?: string;
  resultType?: string;
};

export interface DeviceInfo {
  productID: string;
  deviceName: string;
}
