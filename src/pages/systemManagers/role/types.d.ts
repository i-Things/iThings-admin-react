import type { MenuListItem } from '../menus/types';
export interface RoleListItem {
  id: string;
  name: string;
  remark: string;
  status: string;
  createTime: string;
  option: string;
  roleMenuID?: number[];
}

export interface TreeListItem extends MenuListItem {
  key: string;
  title: string;
  label: string;
  value: string;
}

export interface FormSubmitValueProp {
  id: number;
  menuID: number[];
  roleID?: number;
}

export interface RoleListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RoleListData {
  list: RoleListItem[];
  pagination: Partial<RoleListPagination>;
}

export interface RoleListParams {
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
