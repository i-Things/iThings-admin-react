import type { Option } from '@/hooks/types';
import type { TagProps } from './components/types';
export interface GroupListItem {
  parentID: string;
  groupName: string;
  groupID: string;
  createdTime: string;
  desc: string;
  tags: TagProps[];
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

export interface GroupDeviceCreateListProps {
  productID: string;
  deviceName: string;
}

export interface GroupDeviceCreateProps {
  groupID: string;
  list: GroupDeviceCreateListProps[];
}

export type activeKeyProps = '1' | '2' | '3';
