export enum OperationTypeEnum {
  ADD = 'add',
  UPDATE = 'update',
  REMOVEONE = 'removeone',
  REMOVE = 'remove',
}

export interface Option {
  id: number | undefined;
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
  // 标记是否为叶子节点，设置了 `loadData` 时有效
  // 设为 `false` 时会强制标记为父节点，即使当前节点没有 children，也会显示展开图标
  isLeaf?: boolean;
  key: string;
  title: string;
}
