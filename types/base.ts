export interface PageRequest {
  page_size: number;
  page: number;
}

export interface PageResponse<T> {
  list: T;
  pager: Pager;
}

export interface Pager {
  page: number;
  page_size: number;
  total_rows: number;
}

export interface ListResponse<T> {
  list: T[];
}

export interface CommonResponse<T> {
  data: T;
  code: number;
  msg: string;
}

export type ModelType =
  | 'bool'
  | 'string'
  | 'int'
  | 'enum'
  | 'struct'
  | 'array'
  | 'float'
  | 'timestamp';
