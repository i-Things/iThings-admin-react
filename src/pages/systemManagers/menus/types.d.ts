export interface menuListItem {
  id: number;
  name: string;
  icon: string;
  path: string;
  parentID: number | string | number[];
  order: number;
  component: string;
  redirect?: string;
}
