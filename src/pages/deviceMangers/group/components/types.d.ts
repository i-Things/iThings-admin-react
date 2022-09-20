export type TagProps = {
  key: string;
  value: string;
};

export interface GroupDescriptonProps {
  groupName: string;
  groupID: string;
  createdTime?: string;
  description?: string;
  tags?: TagProps[];
  activateDevice?: number;
  currentOnline?: number;
  groupLevel?: string;
  totalDevice?: number;
}
