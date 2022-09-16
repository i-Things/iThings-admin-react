import type { Option } from '@/hooks/types';
export interface MenuListItem {
  id: number;
  name: string;
  icon: string;
  path: string;
  parentID: number | string | number[];
  order: number;
  component: string;
  createdTime: string;
  hideInMenu: string;
  redirect?: string;
  children?: [];
}

export interface MenuOption extends MenuListItem, Option {}
