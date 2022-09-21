export type modelType = {
  /** property 属性 event事件 action 请求 */
  method: string;
  deviceName: string;
  productID: string;
  /** 如果不指定则获取所有属性数据 */
  dataID?: string[];
};

export type logParamsType = {
  deviceName: string;
  productID: string;
  timeStart?: string;
  timeEnd?: string;
  page?: { page?: number; size?: number };
  /** connected:上线 disconnected:下线  property:属性 event:事件 action:操作 thing:物模型提交的操作为匹配的日志 */
  actions?: string[];
  topics?: string[];
  content?: string;
  requestID?: string;
};

export type attrType = {
  timestamp?: string;
  type?: string;
  dataID?: string;
  getValue?: string;
  sendValue?: string;
};

export type onoffType = {
  timestamp?: string;
  action?: string;
  requestID?: string;
  tranceID?: string;
  topic?: string;
  content?: string;
  resultType?: string;
};
