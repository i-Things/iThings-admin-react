export const TOKENKEY = 'iThings-token';

export const GUIDKEY = 'iThings-guid';

export const SETTOKENKEY = 'iThings-set-token';

export const iThingsSetToken = 'iThings-set-token';

export const DEVICE_TYPE_FORM = [
  { label: '设备', value: 1 },
  { label: '网关', value: 2 },
  { label: '子设备', value: 3 },
];

export const DEVICE_TYPE_VALUE = {
  1: { text: '设备' },
  2: { text: '网关' },
  3: { text: '子设备' },
};

export const NET_TYPE_FORM = [
  { label: '其他', value: 1 },
  { label: 'wi-fi', value: 2 },
  { label: '2G/3G/4G', value: 3 },
  { label: '5G', value: 4 },
  { label: 'BLE', value: 5 },
  { label: 'LoRaWAN', value: 6 },
];

export const NET_TYPE_VALUE = {
  1: { text: '其他' },
  2: { text: 'wi-fi' },
  3: { text: '2G/3G/4G' },
  4: { text: '5G' },
  5: { text: 'BLE' },
  6: { text: 'LoRaWAN' },
};

export const AUTH_MODE_FORM = [
  { label: '账密认证', value: 1 },
  { label: '秘钥认证', value: 2 },
];

export const AUTO_REGISTER_FORM = [
  { label: '关闭', value: 1 },
  { label: '打开', value: 2 },
  { label: '打开并自动创建设备', value: 2 },
];

export const AUTO_REGISTER_VALUE = {
  1: { text: '关闭' },
  2: { text: '打开' },
  3: { text: '打开并自动创建设备' },
};

export const DATA_PROTO_VALUE = {
  1: { text: '自定义' },
  2: { text: '数据模板' },
};
export const DATA_PROTO_FORM = [
  { label: '自定义', value: 1 },
  { label: '数据模板', value: 2 },
];

export type PRODUCT_INFO = {
  productID?: string;
  productName?: string;
  netType?: number;
  dataProto?: number;
  deviceType?: number;
  authMode?: number;
  autoRegister?: number;
  categoryID?: number;
  description?: string;
  createdTime?: string;
  devStatus?: number;
};

export const EVENT_TYPE_DATA = [
  { id: 0, name: '全部事件类型' },
  { id: 1, name: '告警' },
  { id: 2, name: '故障' },
  { id: 3, name: '信息' },
];
export const TIME_TYPE_DATA = [
  { id: 0, name: '30分钟' },
  { id: 1, name: '1小时' },
  { id: 2, name: '今天' },
  { id: 3, name: '昨天' },
  { id: 4, name: '近7天' },
];
