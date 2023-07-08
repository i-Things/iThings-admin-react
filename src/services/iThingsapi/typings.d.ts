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
    /** 状态 1启用 2禁用 */
    status: number;
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

  type analysisParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type cancelParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
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

  type CommonResp = {
    /**  id */
    id?: number;
  };

  type createParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type createParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type DateRange = {
    /** 开始时间 格式：yyyy-mm-dd */
    start?: string;
    /** 结束时间 格式：yyyy-mm-dd */
    end?: string;
  };

  type deleteUsingPOSTParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type deviceCancleParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type deviceCore = {
    /** 产品id */
    productID: string;
    /** 设备名 */
    deviceName: string;
  };

  type deviceIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type DeviceInfo = {
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
    /** 移动运营商 1)移动 2)联通 3)电信 4)广电 */
    mobileOperator?: number;
    /** 手机号 */
    phone?: string;
    /** SIM卡卡号 */
    iccid?: string;
    /** 所属用户id */
    userID?: string;
  };

  type deviceMsgSdkIndex = {
    /** 发生时间戳 毫秒 */
    timestamp: string;
    /** 日志级别 1)关闭 2)错误 3)告警 4)信息 5)调试 */
    loglevel: number;
    /** 具体内容 */
    content: string;
  };

  type deviceRetryParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
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

  type indexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type indexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type OtaFirmwareCreateReq = {
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
    desc: Record<string, any>;
    extData: Record<string, any>;
    /** 升级包附件列表，最多支持上传20个文件，总文件大小不能超过1,000 MB。 */
    files: OtaFirmwareFile[];
  };

  type OtaFirmwareDelReq = {
    /** 固件升级包编号 */
    firmwareID: number;
  };

  type OtaFirmwareFile = {
    /** 附件地址，上传附件后接口应该返回 */
    filePath: string;
    /** 附件原名，上传附件后接口应该返回 */
    name: string;
  };

  type OtaFirmwareFileInfo = {
    /** 附件地址 */
    uri: string;
    /** 附件原名 */
    name: string;
    /** 文件大小 */
    size: number;
    /** 签名值 */
    signature: string;
  };

  type OtaFirmwareIndex = {
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
  };

  type OtaFirmwareIndexReq = {
    /** 产品id 获取产品id下的所有升级包 */
    productID: string;
    /** 获取时间的开始 */
    timeStart: number;
    /** 时间的结束 */
    timeEnd: number;
    page?: PageInfo;
  };

  type OtaFirmwareIndexResp = {
    /** 数据 */
    list: OtaFirmwareIndex[];
    /** 总数 */
    total: number;
  };

  type OtaFirmwareInfo = {
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
    desc: Record<string, any>;
    extData: Record<string, any>;
  };

  type OtaFirmwareInfoUpdateReq = {
    /** 固件升级包编号 */
    firmwareID: number;
    /** 升级包名称 */
    name: string;
    desc: Record<string, any>;
    extData: Record<string, any>;
  };

  type OtaFirmwareReadReq = {
    /** 固件升级包编号 */
    firmwareID: number;
  };

  type OtaFirmwareReadResp = {
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
    desc: Record<string, any>;
    extData: Record<string, any>;
    files: OtaFirmwareFileInfo[];
  };

  type OtaTaskAnalysisReq = {
    taskUid: string;
  };

  type OtaTaskAnalysisResp = {
    /** 统计结果,json格式 */
    result: string;
  };

  type OtaTaskCancleReq = {
    taskID: number;
  };

  type OtaTaskCreateReq = {
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

  type OtaTaskDeviceCancleReq = {
    /** 特定设备的升级id */
    id: number;
  };

  type OtaTaskDeviceIndexReq = {
    taskUid: string;
    /** 设备编号 */
    deviceName?: string;
    /** 升级状态:101待确认 201/202/203待推送 301已推送 401升级中 501升级成功 601升级失败 701已取消 */
    status?: number;
    page?: PageInfo;
  };

  type OtaTaskDeviceIndexResp = {
    list: OtaTaskDeviceInfo[];
    /** 总数 */
    total: number;
  };

  type OtaTaskDeviceInfo = {
    id: number;
    taskUid: string;
    /** 设备编号 */
    deviceName: string;
    /** 当前版本 */
    version: string;
    /** 升级状态:101待确认 201/202/203待推送 301已推送 401升级中 501升级成功 601升级失败 701已取消 */
    status: number;
    /** 状态更新时间 只读 */
    updatedTime: number;
  };

  type OtaTaskDeviceRetryReq = {
    /** 特定设备的升级id */
    id: number;
  };

  type OtaTaskIndexReq = {
    /** 固件升级包编号 */
    firmwareID: number;
    taskUid?: string;
    page?: PageInfo;
  };

  type OtaTaskIndexResp = {
    /** 总数 */
    total: number;
    list: OtaTaskInfo[];
  };

  type OtaTaskInfo = {
    taskID: number;
    /** 批次号 */
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

  type OtaTaskReadReq = {
    taskID: number;
  };

  type OtaTaskReadResp = {
    taskID: number;
    taskUid: string;
    /** 升级范围1全部设备2定向升级 */
    type: number;
    /** 升级策略:1静态升级2动态升级 */
    upgradeType: number;
    /** 升级包版本 */
    version: string;
    /** 待升级版本号 */
    srcVersion: string;
    /** 待升级设备 */
    srcDevice: string;
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

  type PageInfo = {
    /**  页码 */
    page?: number;
    /**  每页大小 */
    size?: number;
  };

  type PagePage = {
    page?: { page?: number; size?: number };
  };

  type Point = {
    /** 经度 */
    longitude: number;
    /** 纬度 */
    latitude: number;
  };

  type position = {
    longitude: number;
    latitude: number;
  };

  type postApiV1SystemApi_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemApiCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemApiIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemApiUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAreaInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAreaInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAreaInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAreaInfoReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAreaInfoTreeParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAreaInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAuthApiIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemAuthApiMultiUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemCommonConfigParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemCommonUploadFileParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemCommonUploadUrlCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemDataAuth_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemDataAuthIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemDataAuthMultiUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemLogLoginIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemLogOperIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemMenu_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemMenuCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemMenuIndexParams = {
    role: number;
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemMenuUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemProjectInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemProjectInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemProjectInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemProjectInfoReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemProjectInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemRole_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemRoleCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemRoleIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemRoleRoleMenuUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemRoleUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUser_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserCaptchaParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserLoginParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserRegister1Params = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserRegister2Params = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserResourceReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1SystemUserUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceAuthAccessParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceAuthLoginParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceAuthRegisterParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceAuthRootCheckParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceGatewayIndexParams = {
    'iThings-project-id'?: string;
    'iThings-token'?: string;
  };

  type postApiV1ThingsDeviceGatewayMultiCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceGatewayMultiDeleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInfoCountParams = {
    /** 查询统计的开始时间，非必填，秒 */
    startTime?: number;
    /** 查询统计的结束时间，非必填，秒 */
    endTime?: number;
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInfoMultiImportParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInfoReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInteractActionReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInteractGetPropertyReplyParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInteractMultiSendPropertyParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInteractPropertyReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInteractSendActionParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInteractSendMsgParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceInteractSendPropertyParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceMsgEventLogIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceMsgHubLogIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceMsgPropertyLatestIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceMsgPropertyLogIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceMsgSdkLogIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsDeviceMsgShadowIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupDeviceIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupDeviceMultiCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupDeviceMultiDeleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupInfoReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsGroupInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductCustomReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductCustomUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductInfoReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductRemoteConfigCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductRemoteConfigIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductRemoteConfigLastestReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductRemoteConfigPushAllParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductSchema_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductSchemaCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductSchemaIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductSchemaTslImportParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductSchemaTslReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsProductSchemaUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmDealRecordCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmDealRecordIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmInfoReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmLogIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmRecordIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmScene_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleAlarmSceneMultiUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleFlowInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleFlowInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleFlowInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleFlowInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleSceneInfo_openAPI_deleteParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleSceneInfoCreateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleSceneInfoIndexParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleSceneInfoManuallyTriggerParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleSceneInfoReadParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postApiV1ThingsRuleSceneInfoUpdateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type postRegisterDevParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
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
    /** 产品图片 */
    productImg?: string;
    /** 是否更新产品图片 只有这个参数为true的时候才会更新产品图片,传参为产品图片的file path */
    isUpdateProductImg?: boolean;
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
    tags: tagList;
    /** 产品秘钥 动态注册产品秘钥 */
    secret: string;
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

  type ProjectArea = {
    /** 项目区域id(雪花id) */
    areaID: string;
    /** 上级项目区域id(雪花id) */
    parentAreaID: string;
    /** 所属项目id(雪花id) */
    projectID: string;
    /** 项目区域名称 */
    areaName: string;
    /** 项目区域定位(默认百度坐标系BD09) */
    position?: Record<string, any>;
    /** 项目区域备注 */
    desc?: string;
    createdTime?: string;
    updatedTime?: string;
    deletedTime?: string;
  };

  type ProjectAreaTree = {
    /** 项目区域id(雪花id) */
    areaID: string;
    /** 上级项目区域id(雪花id) */
    parentAreaID: string;
    /** 所属项目id(雪花id) */
    projectID: string;
    /** 项目区域名称 */
    areaName: string;
    /** 项目区域定位(默认百度坐标系BD09) */
    position?: Record<string, any>;
    /** 项目区域备注 */
    desc?: string;
    createdTime?: string;
    updatedTime?: string;
    deletedTime?: string;
    children: ProjectAreaTree[];
  };

  type ProjectInfo = {
    projectID: string;
    /** 项目名称 */
    projectName: string;
    /** 项目所属公司名称 */
    companyName?: string;
    /** 项目联系人id */
    userID?: string;
    /** 项目省市区县 */
    region?: string;
    /** 项目详细地址 */
    address?: string;
    /** 项目备注 */
    desc?: string;
    createdTime?: string;
  };

  type readParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type readParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type scene = {
    id?: number;
    /** 场景名称 */
    name?: string;
    /** 触发类型 device: 设备触发 timer: 定时触发 manual:手动触发 */
    triggerType: string;
    /** 触发器 */
    trigger?: string;
    /** 触发条件列表 */
    when?: string;
    /** 满足条件时执行的动作 */
    then?: string;
    /** 描述 */
    desc?: string;
    /** 状态 1启用 2禁用 */
    status: number;
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

  type SysRet = {
    sysCode: number;
    sysMsg: string;
  };

  type Tag = {
    key: string;
    value: string;
  };

  type tagList = Record<string, any>;

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

  type TimeRange = {
    /** 开始时间 unix时间戳 */
    start?: number;
    /** 结束时间 unix时间戳 */
    end?: number;
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

  type updateParams = {
    'iThings-token'?: string;
    'iThings-project-id'?: string;
  };

  type UserDataAuth = {
    createdTime: number;
    userID: string;
    dataType: number;
    dataID: string;
  };

  type UserInfo = {
    createdTime: string;
    /** 用户id */
    userID: string;
    /** 用户名 */
    userName: string;
    /** 用户名昵称 */
    nickName: string;
    /** 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 */
    sex: number;
    /** 用户所在城市 */
    city: string;
    /** 用户所在国家 */
    country: string;
    /** 用户所在省份 */
    province: string;
    /** 用户的语言，简体中文为zh_CN */
    language: string;
    /** 用户头像 */
    headImgUrl: string;
    /** 注册ip */
    regIP: string;
    /** 最后登录ip */
    lastIP: string;
    /** 微信UnionID */
    wechat: string;
    /**  手机号 */
    phone: string;
    /**  邮箱 */
    email: string;
    role: number;
    isAllData: number;
  };

  type WithID = {
    /**  id */
    id?: number;
  };
}
