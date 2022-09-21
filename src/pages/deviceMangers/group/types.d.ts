import type { Option } from '@/hooks/types';
export interface GroupListItem {
  groupName: string;
  groupID: string;
  createdTime: string;
}

export interface GroupDeviceItem {
  productID: string;
  deviceName: string;
  secret: string;
  createdTime: string;
  firstLogin: string;
  lastLogin: string;
  version: string;
  logLevel: string;
  cert: string;
  isOnline: number;
}
export interface GroupOption extends GroupListItem, Option {}
