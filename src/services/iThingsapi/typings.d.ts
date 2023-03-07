declare namespace API {
  type createParams = {
    'iThings-token'?: string;
  };

  type deleteUsingPOSTParams = {
    'iThings-token'?: string;
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

  type firmwareIndexParams = {
    'iThings-token'?: string;
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

  type postApiV1SystemApi_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemApiCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemApiIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemApiUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemCommonConfigParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemLogLoginIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemLogOperIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemMenu_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemMenuCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemMenuIndexParams = {
    role: number;
    'iThings-token'?: string;
  };

  type postApiV1SystemMenuUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemRole_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemRoleCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemRoleIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemRoleRoleMenuUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemRoleUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUser_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUserCaptchaParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUserCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUserIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUserLoginParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUserReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUserResourceReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1SystemUserUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceAuthAccessParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceAuthLoginParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceAuthRootCheckParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceGatewayIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceGatewayMultiCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceGatewayMultiDeleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInfoCountParams = {
    /** 查询统计的开始时间，非必填，秒 */
    startTime?: number;
    /** 查询统计的结束时间，非必填，秒 */
    endTime?: number;
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInfoCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInfoIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInfoReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInfoUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInteractSendActionParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInteractSendMsgParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceInteractSendPropertyParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceMsgEventLogIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceMsgHubLogIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceMsgPropertyLatestIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceMsgPropertyLogIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceMsgSdkLogIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupDeviceIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupDeviceMultiCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupDeviceMultiDeleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupInfoCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupInfoIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupInfoReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsGroupInfoUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsOtaTaskDeviceRetryParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductInfoCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductInfoIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductInfoReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductInfoUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductRemoteConfigCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductRemoteConfigIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductRemoteConfigLastestReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductRemoteConfigPushAllParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductSchema_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductSchemaCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductSchemaIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductSchemaTslImportParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductSchemaTslReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsProductSchemaUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleFlowInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleFlowInfoCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleFlowInfoIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleFlowInfoUpdateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleSceneInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleSceneInfoCreateParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleSceneInfoIndexParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleSceneInfoReadParams = {
    'iThings-token'?: string;
  };

  type postApiV1ThingsRuleSceneInfoUpdateParams = {
    'iThings-token'?: string;
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
    'iThings-token'?: string;
  };

  type readParams = {
    'iThings-token'?: string;
  };

  type scene = {
    id?: number;
    /** 场景名称 */
    name?: string;
    /** 触发器 */
    trigger?: string;
    /** 触发条件 */
    when?: string;
    /** 满足条件时执行的动作 */
    then?: string;
    /** 描述 */
    desc?: string;
    /** 状态 1启用 2禁用 */
    state: number;
  };

  type signedurlParams = {
    'iThings-token'?: string;
  };

  type SuccRet = {
    /** 返回code */
    code: number;
    /** 返回消息 */
    msg: string;
  };

  type tag = Record<string, any>;

  type taskAnalysisParams = {
    'iThings-token'?: string;
  };

  type TaskAnalysisReq = {
    taskUid: string;
  };

  type TaskAnalysisResp = {
    /** 统计结果,json格式 */
    result: string;
  };

  type taskCancelParams = {
    'iThings-token'?: string;
  };

  type TaskCancleReq = {
    taskUid: string;
  };

  type taskCreateParams = {
    'iThings-token'?: string;
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

  type taskDeviceCancleParams = {
    'iThings-token'?: string;
  };

  type TaskDeviceCancleReq = {
    taskUid: string;
    /** 设备编号 */
    deviceName: string;
  };

  type taskDeviceIndexParams = {
    'iThings-token'?: string;
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

  type taskListParams = {
    'iThings-token'?: string;
  };

  type taskReadParams = {
    'iThings-token'?: string;
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

  type updateParams = {
    'iThings-token'?: string;
  };
}
