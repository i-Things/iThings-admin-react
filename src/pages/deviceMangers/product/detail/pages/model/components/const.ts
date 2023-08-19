import type { MutableRefObject } from 'react';
export type DataType =
  | 'bool'
  | 'int'
  | 'string'
  | 'float'
  | 'enum'
  | 'timestamp'
  | 'struct'
  | 'array';

export enum TypeEnum {
  Property = 1,
  Event = 2,
  Action = 3,
}

export type typeType = TypeEnum;

export type elementInterface = 'int' | 'string' | 'float' | 'struct';

export const initialValues = {
  type: 1,
  elementType: 'int',
  dataType: 'bool',
  mode: 'rw',
  eventType: 'alert',
  mapping: { '0': '关', '1': '开' },
  numericalRange: { min: '1', max: '100' },
  start: 0,
  isUseShadow: false,
  step: 1,
  max: '2048',
  desc: '',
  specs: [
    {
      type: 'bool',
      dataType: {
        mapping: { '0': '关', '1': '开' },
        shujudingyiForenum: [{ label: '0', value: '' }],
      },
    },
  ],
  params: [
    {
      type: 'bool',
      dataType: {
        mapping: { '0': '关', '1': '开' },
        shujudingyiForenum: [{ label: '0', value: '' }],
      },
    },
  ],
  input: [
    {
      type: 'bool',
      dataType: {
        mapping: { '0': '关', '1': '开' },
        shujudingyiForenum: [{ label: '0', value: '' }],
      },
    },
  ],
  output: [
    {
      type: 'bool',
      dataType: {
        mapping: { '0': '关', '1': '开' },
        shujudingyiForenum: [{ label: '0', value: '' }],
      },
    },
  ],
};

export const typeOptionsList = [
  { label: '属性', value: 1 },
  { label: '事件', value: 2 },
  { label: '行为', value: 3 },
];

export const shadowType = [
  { label: '开启', value: true },
  { label: '关闭', value: false },
];

export const eventTypeList = [
  { label: '告警', value: 'alert' },
  { label: '故障', value: 'fault' },
  { label: '信息', value: 'info' },
];

export const dataTypeOptionsList = [
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
  { label: '只读', value: 'r' },
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

// 功能类型 的对应关系
export const formItemMapping: { [key in typeType]: string[] } = {
  1: ['dataType', 'isUseShadow'],
  2: ['eventType', 'params'],
  3: ['input', 'output'],
};

// 元素类型 的对应关系
export const elementTypeMapping: { [key in elementInterface]: string[] } = {
  int: ['mode', 'numericalRange', 'start', 'step', 'unit'],
  string: ['mode', 'max'],
  float: ['mode', 'numericalRange', 'start', 'step', 'unit'],
  struct: ['mode', 'specs'],
};

export const dataTypeMapping: { [key in DataType]: string[] } = {
  bool: ['mode', 'mapping'],
  int: ['mode', 'numericalRange', 'start', 'step', 'unit'],
  string: ['mode', 'max'],
  float: ['mode', 'numericalRange', 'start', 'step', 'unit'],
  enum: ['mode', 'dataDefinitionForEnum'],
  timestamp: ['mode', 'dataDefinitionFortimestamp'],
  struct: ['mode', 'specs'],
  array: [
    'mode',
    'arrayInfo',
    'elementType',
    'numericalRange',
    'start',
    'step',
    'unit',
    'mode',
    'max',
    'mode',
  ],
};

export type EditFormType = {
  ref: any;
  modalVisit: boolean;
  setModalVisit: any;
  actionRef: MutableRefObject<any>;
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
