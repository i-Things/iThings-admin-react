import type { Option } from '@/hooks/types';
export interface GroupListItem {
  groupName: string;
  groupID: string;
  createdTime: string;
}
export interface GroupOption extends GroupListItem, Option {}
