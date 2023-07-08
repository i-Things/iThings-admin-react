import type { editor } from 'monaco-editor';

export const TOKENKEY = 'iThings-token';

export const KEYPREFIX = 'iThings-';

export const GUIDKEY = 'iThings-guid';

export const SETTOKENKEY = 'iThings-set-token';

export const iThingsSetToken = 'iThings-set-token';

export const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

export const OFFICIAL_WEBSITE = 'https://ithings.net.cn/';
export const GITHUB_WEBSITE = 'https://github.com/i4de/iThings';
export const LAYOUT_TYPE_VERTICAL = 'vertical';

export const FORMITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
export const ROLE_VALUE_ENUM = {
  1: 'admin',
  2: '供应商',
  3: 'user',
};

export const STATUS_VALUE_ENUM = {
  1: { text: '启用', status: 'Success' },
  2: { text: '禁用', status: 'Error' },
};
export const SEARCH_CONFIGURE: { labelWidth: 'auto' } = {
  labelWidth: 'auto',
};
export const PROTABLE_OPTIONS = {
  setting: {
    listsHeight: 400,
  },
};
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

export const DEVICE_LOG_LEVEL_FORM = [
  { label: '关闭', value: 1 },
  { label: '错误', value: 2 },
  { label: '告警', value: 3 },
  { label: '信息', value: 4 },
  { label: '调试', value: 5 },
];

export const DEVICE_LOG_LEVEL_VALUE = {
  1: { text: '关闭' },
  2: { text: '错误' },
  3: { text: '告警' },
  4: { text: '信息' },
  5: { text: '调试' },
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
  { label: '打开并自动创建设备', value: 3 },
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

export const BUSINESS_TYPE_VALUE = {
  1: { text: '新增', color: 'blue' },
  2: { text: '删除', color: 'red' },
  3: { text: '修改', color: 'yellow' },
  4: { text: '查询', color: 'green' },
  5: { text: '其它', color: '#ccc' },
};

export const METHOD_VALUE = {
  1: { text: 'GET' },
  2: { text: 'POST' },
  3: { text: 'HEAD' },
  4: { text: 'OPTIONS' },
  5: { text: 'PUT' },
  6: { text: 'DELETE' },
  7: { text: 'TRACE' },
  8: { text: 'CONNECT' },
  9: { text: '其它' },
};

export type DEVICE_INFO = {
  productID?: string;
  deviceName?: string;
  createdTime?: string;
  secret?: string;
  firstLogin?: string;
  lastLogin?: string;
  version?: string;
  logLevel?: number;
  tags?: { key?: string; value?: string }[];
  isOnline?: number;
  withProperties?: any;
  deviceAlias?: string;
  areaID?: string;
  position: {
    latitude: number;
    longitude: number;
  };
};

export type DeviceInfo = {
  /** 产品id 不可修改 */
  productID: string;
  /** 设备名称 不可修改 */
  deviceName: string;
  /** 设备秘钥 */
  secret: string;
  /** 设备证书 */
  cert: string;
  /** IMEI信息 */
  imei: string;
  /** MAC信息 */
  mac: string;
  /** 固件版本 */
  version: string;
  /** 模组硬件型号 */
  hardInfo: string;
  /** 模组软件版本 */
  softInfo: string;
  /** 设备定位 */
  position?: { longitude?: number; latitude?: number };
  /** 详细地址 */
  address?: string;
  tags?: { key?: string; value?: string }[];
  /** 在线状态 1离线 2在线 只读 */
  isOnline?: number;
  /** 激活时间 */
  firstLogin?: string;
  /** 最后上线时间 */
  lastLogin?: string;
  /** 日志级别 1)关闭 2)错误 3)告警 4)信息 5)调试  */
  logLevel?: number;
  /** 创建时间 */
  createdTime?: string;
  /** 获取的属性列表,如果不传withProperty,则不会返回 key是属性id,value是{"value:"xxx","timestamp":123}的结构体,时间戳是毫秒时间戳 */
  withProperties?: Record<string, any>;
  /** 设备别名 */
  deviceAlias?: string;
  /** 项目id */
  projectID?: string;
  /** 项目区域id */
  areaID?: string;
};

export type PRODUCT_INFO = {
  productID?: string;
  productName?: string;
  /** 产品图片 */
  productImg?: string;
  /** 是否更新产品图片 只有这个参数为true的时候才会更新产品图片,传参为产品图片的file path */
  isUpdateProductImg?: boolean;
  /* 产品秘钥 动态更新开启时有效 */
  secret?: string;
  netType?: number;
  dataProto?: number;
  deviceType?: number;
  authMode?: number;
  autoRegister?: number;
  categoryID?: number;
  desc?: string;
  createdTime?: string;
  devStatus?: number;
  tags?: { key?: string; value?: string }[];
};

export const EVENT_TYPE_DATA = [
  { value: 'all', label: '全部事件类型' },
  { value: 'alert', label: '告警' },
  { value: 'fault', label: '故障' },
  { value: 'info', label: '信息' },
];
export const TIME_TYPE_DATA = [
  { value: 0, label: '30分钟' },
  { value: 1, label: '1小时' },
  { value: 2, label: '今天' },
  { value: 3, label: '昨天' },
  { value: 4, label: '近7天' },
];

// 编辑器配置项
export const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  selectOnLineNumbers: true,
  automaticLayout: true, // 自动布局
  foldingStrategy: 'indentation', // 代码可分小段折叠
  autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号)
  autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号)
  autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号
  autoIndent: 'full', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
  folding: true, // 是否启用代码折叠
  renderLineHighlight: 'all', // 当前行突出显示方式
  readOnly: false,
  scrollBeyondLastLine: false,
  scrollBeyondLastColumn: 0,
};

export const MODEL_VALUE_TYPE_ENUMS = {
  int: '整数型',
  string: '字符串',
  float: '浮点型',
};
export const CON_HEIGHT_STYLE = { height: '100%' };
