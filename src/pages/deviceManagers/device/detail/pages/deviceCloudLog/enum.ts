/** 物模型日志类型 */
export enum ModelType {
  /** 属性 */
  PROPERTY = 'property',
  /** 事件 */
  EVENT = 'event',
}

/** 日志类型 */
export enum LogType {
  /** 物模型日志 */
  MODEL = 'model',
  /** 内容日志 */
  CONTENT = 'content',
  /** 上下线日志 */
  ONOFFLINE = 'onoffline',
  /** 操作日志 订阅和发布 */
  ACCESS = 'access',
}
