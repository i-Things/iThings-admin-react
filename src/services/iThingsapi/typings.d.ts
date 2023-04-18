declare namespace API {
  type action = {
    /** 执行器类型 notify: 通知 delay:延迟  device:设备输出  alarm: 告警 */
    executor: string;
    /** 通知 */
    notify?: Record<string, any>;
    delay?: { time?: number; unit?: string };
    alarm?: { mode?: string };
    device?: {
      productID?: string;
      selector?: string;
      selectorValues?: string[];
      type?: string;
      dataID?: string;
      value?: string;
    };
  };

  type alarmDealRecord = {
    id: number;
    createdTime: number;
    /** 告警记录ID */
    alarmRecordID: number;
    /** 告警处理结果 */
    result: string;
    /** 告警处理类型 1人工 2系统 */
    type: number;
    /** 最早告警时间 */
    alarmTime: number;
  };

  type alarmInfo = {
    /** 名称 */
    id?: number;
    /** 状态 1启用 2禁用 */
    name: string;
    state: number;
    desc: string;
    createdTime?: number;
    /** 告警配置级别 1提醒 2一般 3严重 4紧急 5超紧急 */
    level: number;
  };

  type alarmLog = {
    id: number;
    /** 描述 */
    desc: string;
    createdTime: number;
    /** 告警记录ID */
    alarmRecordID: number;
    /** 告警流水 */
    serial: string;
    /** 场景名称 */
    sceneName: string;
    /** 场景ID */
    sceneID: number;
  };

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

  type deviceCore = {
    /** 产品id */
    productID: string;
    /** 设备名 */
    deviceName: string;
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

  type deviceMsgSdkIndex = {
    /** 发生时间戳 毫秒 */
    timestamp: string;
    /** 日志级别 1)关闭 2)错误 3)告警 4)信息 5)调试 */
    loglevel: number;
    /** 具体内容 */
    content: string;
  };

  type FirmwareCreateReq = {
    /** 升级包名称 */
    name: string;
    /** 产品id */
    productID: string;
    /** 升级包版本 */
    version: string;
    /** 是否差分包,1:整包,2:差分 */
    isDiff: number;
    /** 签名方法 MD5/SHA@256 */
    signMethod: string;
    /** 描述 */
    desc: Record<string, any>;
    extData: Record<string, any>;
    /** 升级包附件列表，最多支持上传20个文件，总文件大小不能超过1,000 MB。 */
    files: FirmwareFile[];
  };

  type FirmwareDelReq = {
    /** 固件升级包编号 */
    firmwareID: number;
  };

  type FirmwareFile = {
    /** 附件地址，上传附件后接口应该返回 */
    url: string;
    /** 附件原名，上传附件后接口应该返回 */
    name: string;
  };

  type FirmwareIndex = {
    /** 升级包名称 */
    name: string;
    /** 升级包版本 */
    version: string;
    /** 产品id */
    productID: string;
    /** 产品名称 */
    productName: string;
    /** 是否差分包,1:整包,2:差分 */
    isDiff: number;
    /** 创建时间 只读 */
    createdTime: number;
    /** 签名方法 */
    signMethod: string;
  };

  type FirmwareIndexReq = {
    /** 产品id 获取产品id下的所有升级包 */
    productID: string;
    /** 获取时间的开始 */
    timeStart: number;
    /** 时间的结束 */
    timeEnd: number;
    page?: PageInfo;
  };

  type FirmwareIndexResp = {
    /** 数据 */
    list: FirmwareIndex[];
    /** 总数 */
    total: number;
  };

  type FirmwareInfo = {
    /** 固件升级包编号 */
    firmwareID: number;
    /** 升级包名称 */
    name: string;
    /** 升级包版本 */
    version: string;
    /** 产品id */
    productID: string;
    /** 产品名称 */
    productName: string;
    /** 是否差分包,1:整包,2:差分 */
    isDiff: number;
    /** 创建时间 只读 */
    createdTime: number;
    /** 签名方法 */
    signMethod: string;
    description: Record<string, any>;
    extData: Record<string, any>;
  };

  type FirmwareInfoUpdateReq = {
    /** 固件升级包编号 */
    firmwareID: number;
    /** 升级包名称 */
    name: string;
    desc: Record<string, any>;
    extData: Record<string, any>;
  };

  type FirmwareReadReq = {
    /** 固件升级包编号 */
    firmwareID: number;
  };

  type FirmwareSignedUrlReq = {
    /** 产品id */
    productID: string;
    /** 文件名 */
    fileName: string;
  };

  type FirmwareSignedUrlResp = {
    /** 附件path */
    dir: string;
    /** 附件直传地址 */
    signedUrl: string;
  };

  type FirmwareTaskIndexReq = {
    /** 固件升级包编号 */
    firmwareID: number;
    taskUid?: string;
    page?: PageInfo;
  };

  type FirmwareTaskIndexResp = {
    /** 总数 */
    total: number;
    list: FirmwareTaskInfo[];
  };

  type FirmwareTaskInfo = {
    taskUid: string;
    /** 升级范围1全部设备2定向升级 */
    type: number;
    /** 升级策略:1静态升级2动态升级 */
    upgradeType: number;
    /** 升级状态:1未升级2升级中3完成 */
    status: number;
    /** 创建时间 只读 */
    createdTime: number;
  };

  type flow = {
    /** 唯一id-雪花算法 */
    ruleID: string;
    /** 流名称 */
    ruleName?: string;
    /** 是否禁用 1:是 2:否 */
    isDisabled?: number;
    /** 描述 markdown格式 */
    desc?: string;
  };

  type page = {
    page?: { page?: number; size?: number };
  };

  type PageInfo = {
    /**  页码 */
    page?: number;
    /**  每页大小 */
    size?: number;
  };

  type postApiV1SystemMenuIndexParams = {
    role: number;
  };

  type postApiV1ThingsDeviceInfoCountParams = {
    /** 查询统计的开始时间，非必填，秒 */
    startTime?: number;
    /** 查询统计的结束时间，非必填，秒 */
    endTime?: number;
  };

  type ProductCustom = {
    /** 产品id */
    productID: string;
    /** 协议转换脚本 */
    transformScript?: string;
    /** 脚本语言类型 1:JavaScript 2:lua 3:python */
    scriptLang?: number;
    /** 自定义topic数组 */
    customTopic?: string;
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
    /** 产品标签 */
    tags: tag;
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

  type putIthings25hcK5yzlbqZipParams = {
    'X-Amz-Algorithm'?: string;
    'X-Amz-Credential'?: string;
    'X-Amz-Date'?: string;
    'X-Amz-Expires'?: string;
    'X-Amz-SignedHeaders'?: string;
    'X-Amz-Signature'?: string;
  };

  type scene = {
    id?: number;
    /** 场景名称 */
    name?: string;
    /** 触发器 */
    trigger?: string;
    /** 触发条件列表 */
    when?: string;
    /** 满足条件时执行的动作 */
    then?: string;
    /** 描述 */
    desc?: string;
    /** 状态 1启用 2禁用 */
    state: number;
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

  type tag = Record<string, any>;

  type TaskAnalysisReq = {
    taskUid: string;
  };

  type TaskAnalysisResp = {
    /** 统计结果,json格式 */
    result: string;
  };

  type TaskCancleReq = {
    taskUid: string;
  };

  type TaskCreateReq = {
    /** 固件升级包编号 */
    firmwareID: number;
    /** 升级范围1全部设备2定向升级 */
    type: number;
    /** 升级策略:1静态升级2动态升级 */
    upgradeType: number;
    /** 待升级设备列表,["device1","device2",...] */
    deviceList: string;
    /** 待升级版本,["version1","version2",...] */
    versionList: string;
  };

  type TaskDeviceCancleReq = {
    taskUid: string;
    /** 设备编号 */
    deviceName: string;
  };

  type TaskDeviceIndexReq = {
    taskUid: string;
    /** 设备编号 */
    deviceName?: string;
    /** 升级状态:101待确认 201/202/203待推送 301已推送 401升级中 501升级成功 601升级失败 701已取消 */
    status?: string;
    page?: PageInfo;
  };

  type TaskDeviceIndexResp = {
    list: TaskDeviceInfo[];
    /** 总数 */
    total: number;
  };

  type TaskDeviceInfo = {
    taskUid: string;
    /** 设备编号 */
    deviceName: string;
    /** 当前版本 */
    version: string;
    /** 升级状态:101待确认 201/202/203待推送 301已推送 401升级中 501升级成功 601升级失败 701已取消 */
    status: string;
    /** 状态更新时间 只读 */
    updatedTime: number;
  };

  type TaskReadReq = {
    taskUid?: string;
  };

  type TaskReadResp = {
    taskUid: string;
    /** 升级范围1全部设备2定向升级 */
    type: number;
    /** 升级策略:1静态升级2动态升级 */
    upgradeType: number;
    /** 升级包版本 */
    version: string;
    /** 待升级版本号 */
    srcVersion: string;
    /** 产品id */
    productID: string;
    /** 产品名称 */
    productName: string;
    /** 升级状态:1未升级2升级中3完成 */
    status: number;
    /** 是否自动重试,1:不,2自动重试,最多重试10次 */
    autoRepeat: number;
    /** 创建时间 只读 */
    createdTime: number;
  };

  type term = {
    /** 嵌套条件 */
    terms?: term[];
    /** 字段类型 property:属性 sysTime:系统时间 */
    columnType: string;
    /** 物模型类型配置 属性需要填写 */
    columnSchema?: {
      productID?: string;
      deviceName?: string;
      dataID?: string[];
      termType?: string;
      values?: string;
    };
    /** 时间类型 */
    columnTime: { type?: string; cron?: string };
    /** 和下个条件的关联类型  or  and */
    netCondition: string;
    /** 和嵌套条件的关联类型 or  and */
    childrenCondition: string;
  };

  type timeRange = {
    timeRange?: { start?: number; end?: number };
  };

  type trigger = {
    /** 设备触发 */
    device?: triggerDevice[];
    timer?: triggerTimer;
  };

  type triggerDevice = {
    /** 产品id */
    productID: string;
    /** 设备选择方式 all: 全部 fixed:指定的设备 */
    selector: string;
    /** 选择的列表 选择的列表, fixed类型是设备名列表 */
    selectorValues: string[];
    /** 触发类型 connected:上线 disConnected:下线 reportProperty:属性上报 reportEvent: 事件上报 */
    operator: string;
    /** 物模型操作 reportProperty:属性上报 reportEvent: 事件上报 需要填写 */
    operationSchema?: { dataID?: string[]; termType?: string; values?: string[] };
  };

  type triggerTimer = {
    /** 时间类型 cron */
    type: string;
    /** cron表达式 */
    cron: string;
  };
}
