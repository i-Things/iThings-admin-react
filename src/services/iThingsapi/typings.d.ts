declare namespace API {
  type chanpinhexinziduan = {
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
    description?: string;
    /** 创建时间 */
    createdTime?: string;
    /** 产品状态 */
    devStatus?: number;
  };

  type chenggongfanhuiduixiang = {
    /** 返回code */
    code: number;
    /** 返回消息 */
    msg: string;
  };

  type chenggongfanhuishuzu = {
    /** 返回code */
    code: number;
    /** 返回消息 */
    msg: string;
  };

  type fenye = {
    page?: { page?: number; size?: number };
  };

  type shebeixinxihexinziduan = {
    /** 产品id 不可修改 */
    productID: string;
    /** 设备名称 不可修改 */
    deviceName: string;
    /** 创建时间 */
    createdTime: string;
    /** 设备秘钥 */
    secret: string;
    /** 激活时间 */
    firstLogin?: string;
    /** 最后上线时间 */
    lastLogin?: string;
    /** 固件版本 */
    version?: string;
    /** 日志级别 1)关闭 2)错误 3)告警 4)信息 5)调试  */
    logLevel: number;
    /** 标签 */
    tags?: { key?: string; value?: string }[];
    /** 在线状态 1离线 2在线 只读 */
    isOnline: number;
  };
}
