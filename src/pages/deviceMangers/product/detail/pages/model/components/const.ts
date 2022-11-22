export const typeBtnList = [
  { label: '属性', value: 1 },
  { label: '事件', value: 2 },
  { label: '行为', value: 3 },
];

export const eventTypeList = [
  { label: '告警', value: 'alert' },
  { label: '故障', value: 'fault' },
  { label: '信息', value: 'info' },
];

export const dataTypeList = [
  { label: '布尔型', value: 'bool' },
  { label: '整数型', value: 'int' },
  { label: '字符串', value: 'string' },
  { label: '浮点型', value: 'float' },
  { label: '枚举整型', value: 'enum' },
  { label: '时间型', value: 'timestamp' },
  { label: '结构体', value: 'struct' },
  { label: '数组', value: 'array' },
];

export const _dataTypeList = [
  { label: '布尔型', value: 'bool' },
  { label: '整数型', value: 'int' },
  { label: '字符串', value: 'string' },
  { label: '浮点型', value: 'float' },
  { label: '枚举整型', value: 'enum' },
  { label: '时间型', value: 'timestamp' },
  { label: '数组', value: 'array' },
];

export const rwTypeList = [
  { label: '读写', value: 'rw' },
  { label: '自读', value: 'r' },
];

export const yuansuleixingList = [
  { label: '整数型', value: 'int' },
  { label: '字符串', value: 'string' },
  { label: '浮点型', value: 'float' },
];

export const _yuansuleixingList = [
  { label: '整数型', value: 'int' },
  { label: '字符串', value: 'string' },
  { label: '浮点型', value: 'float' },
  { label: '结构体', value: 'struct' },
];

export type EditFormType = {
  ref: any;
  modalVisit: boolean;
  setModalVisit: any;
};

export const TYPE_ENUM = {
  1: { text: '属性' },
  2: { text: '事件' },
  3: { text: '行为' },
};

export const DATA_TYPE_ENUM = {
  bool: '布尔型',
  int: '整数型',
  string: '字符串',
  float: '浮点型',
  enum: '枚举整型',
  timestamp: '时间型',
  struct: '结构体',
  array: '数组',
  alert: '告警',
  fault: '故障',
  info: '信息',
};

export const MODE_ENUM = {
  rw: '读写',
  r: '可读',
};
