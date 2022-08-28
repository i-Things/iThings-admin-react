export interface RoleListItem {
  uid: string;
  name: string;
  remark: string;
  status: string;
  createTime: string;
  option: string;
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
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
