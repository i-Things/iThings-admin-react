declare namespace API {
  type CloudeLogDebug = {
    /** 发生时间戳 */
    timestamp: string;
    /** 操作类型 显示相应的操作名称、API名称、服务的method */
    action: string;
    /** 请求ID */
    requestID: string;
    /** 服务器端事务id */
    tranceID: string;
    /** 主题 */
    topic: string;
    /** 具体内容 */
    content: string;
    /** 请求结果状态 */
    resultType: string;
  };

  type DeviceInfo = {
    /** 产品id 不可修改 */
    productID: string;
    /** 设备名称 不可修改 */
    deviceName: string;
    /** 创建时间 */
    createdTime?: string;
    /** 设备秘钥 */
    secret?: string;
    /** 激活时间 */
    firstLogin?: string;
    /** 最后上线时间 */
    lastLogin?: string;
    /** 固件版本 */
    version?: string;
    /** 日志级别 1)关闭 2)错误 3)告警 4)信息 5)调试  */
    logLevel?: number;
    /** 标签 */
    tags?: { key?: string; value?: string }[];
    /** 在线状态 1离线 2在线 只读 */
    isOnline?: number;
  };

  type page = {
    page?: { page?: number; size?: number };
  };

  type ProductInfo = {
    /** 产品id */
    productID: string;
    /** 产品名称 */
    productName?: string;
    /** 通讯方式 1:其他,2:wi-fi,3:2G/3G/4G,4:5G,5:BLE,6:LoRaWAN */
    netType?: number;
    /** 数据协议 1:自定义,2:数据模板 */
    dataProto?: number;
    /** 设备类型 1:设备,2:网关,3:子设备 */
    deviceType?: number;
    /** 认证方式 1:账密认证,2:秘钥认证 */
    authMode?: number;
    /** 动态注册 1:关闭,2:打开,3:打开并自动创建设备 */
    autoRegister?: number;
    /** 产品品类 */
    categoryID?: number;
    /** 描述 */
    desc?: string;
    /** 创建时间 */
    createdTime?: string;
    /** 产品状态 */
    devStatus?: number;
  };

  type ProductSchemaInfo = {
    /** 产品id */
    productID: string;
    /** 物模型类型 1:property属性 2:event事件 3:action行为 */
    type: number;
    /** 物模型标签 1:自定义 2:可选 3:必选  必选不可删除 */
    tag?: number;
    /** 标识符 */
    identifier: string;
    /** 功能名称 */
    name?: string;
    /** 描述 */
    desc?: string;
    /** 是否必须 1:是 2:否 */
    required: number;
    /** 各功能类型的详细参数定义 */
    affordance: string;
  };

  type SchemaAction = {
    /** 调用参数 */
    input: SchemaParam[];
    /** 返回参数 */
    output: SchemaParam[];
  };

  type SchemaDefine = {
    /** 参数类型 bool int string struct float timestamp array enum */
    type: string;
    /** 结构体 struct */
    specs: SchemaDefine[];
    /** 枚举及bool类型 bool enum */
    mapping: string;
    /** 数值最小值 int  float */
    min: string;
    /** 数值最大值 int string float */
    max: string;
    /** 初始值 int float */
    start: string;
    /** 步长 float */
    step: string;
    /** 单位 int float */
    unit: string;
    /** 数组 */
    arrayInfo: SchemaDefine | any;
  };

  type SchemaEvent = {
    /** 事件类型 信息:info  告警alert  故障:fault */
    type: string;
    /** 事件参数 */
    params: SchemaParam[];
  };

  type SchemaParam = {
    /** 参数标识符 */
    identifier: string;
    /** 参数名称 */
    name: string;
    /** 参数定义 */
    define: SchemaDefine;
  };

  type SchemaProperty = {
    /** 读写类型 r(只读) rw(可读可写) */
    mode: string;
    /** 参数定义 */
    define: SchemaDefine;
  };

  type SchemaSpec = {
    /** 参数标识符 */
    identifier: string;
    /** 参数名称 */
    name: string;
    /** 参数定义 */
    dataType: SchemaDefine;
  };

  type SuccRet = {
    /** 返回code */
    code: number;
    /** 返回消息 */
    msg: string;
  };
}
