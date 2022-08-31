import type { menuListItem } from '../menus/types';
export interface RoleListItem {
  uid: string;
  name: string;
  remark: string;
  status: string;
  createTime: string;
  option: string;
  roleMenuID?: number[];
}

export type treeListItem = menuListItem & {
  key: string;
  title: string;
  label: string;
};

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
