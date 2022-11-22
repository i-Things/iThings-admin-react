export type TagProps = {
  key: string;
  value: string;
};
export interface groupSearchParmasProps {
  tags: TagProps[];
  groupName: string;
}
export interface GroupDescriptonProps {
  groupName: string;
  groupID: string;
  parentID: string;
  createdTime?: string;
  desc?: string;
  tags?: TagProps[];
  activateDevice?: number;
  currentOnline?: number;
  groupLevel?: string;
  totalDevice?: number;
}
