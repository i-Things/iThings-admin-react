declare namespace API {
  type __openAPI__false = {};

  type Adapter = Engine;

  type Application = {
    affiliationUrl?: string;
    cert?: string;
    clientId?: string;
    clientSecret?: string;
    createdTime?: string;
    description?: string;
    displayName?: string;
    enableCodeSignin?: boolean;
    enablePassword?: boolean;
    enableSignUp?: boolean;
    enableSigninSession?: boolean;
    expireInHours?: number;
    forgetUrl?: string;
    grantTypes?: string[];
    homepageUrl?: string;
    logo?: string;
    name?: string;
    organization?: string;
    organizationObj?: Organization;
    owner?: string;
    providers?: ProviderItem[];
    redirectUris?: string[];
    refreshExpireInHours?: number;
    signinHtml?: string;
    signinUrl?: string;
    signupHtml?: string;
    signupItems?: SignupItem[];
    signupUrl?: string;
    termsOfUse?: string;
    tokenFormat?: string;
  };

  type biaogeshujuchaxuntiaojian = {
    /** 查询模型 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 查询条件 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** 页码 */
    pagination?: { pageSize?: number; pageIndex?: number; orderBy?: string; order?: string };
    /** 查询语句 sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  };

  type Cert = {
    authorityPublicKey?: string;
    authorityRootPublicKey?: string;
    bitSize?: number;
    createdTime?: string;
    cryptoAlgorithm?: string;
    displayName?: string;
    expireInYears?: number;
    name?: string;
    owner?: string;
    privateKey?: string;
    publicKey?: string;
    scope?: string;
    type?: string;
  };

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

  type emailForm = {};

  type Engine = {};

  type fenye = {
    page?: { page?: number; size?: number };
  };

  type guanxishuju = {
    /** 源 */
    source: string;
    /** 目的 */
    target: string;
    /** 值 可以是小数 */
    value: number;
  };

  type Header = {
    name?: string;
    value?: string;
  };

  type IntrospectionResponse = {
    active?: boolean;
    aud?: string[];
    client_id?: string;
    exp?: number;
    iat?: number;
    iss?: string;
    jti?: string;
    nbf?: number;
    scope?: string;
    sub?: string;
    token_type?: string;
    username?: string;
  };

  type Organization = {
    createdTime?: string;
    defaultAvatar?: string;
    displayName?: string;
    enableSoftDeletion?: boolean;
    favicon?: string;
    masterPassword?: string;
    name?: string;
    owner?: string;
    passwordSalt?: string;
    passwordType?: string;
    phonePrefix?: string;
    tags?: string[];
    websiteUrl?: string;
  };

  type Payment = {
    createdTime?: string;
    currency?: string;
    detail?: string;
    displayName?: string;
    message?: string;
    name?: string;
    organization?: string;
    owner?: string;
    payUrl?: string;
    price?: number;
    productDisplayName?: string;
    productName?: string;
    provider?: string;
    returnUrl?: string;
    state?: string;
    tag?: string;
    type?: string;
    user?: string;
  };

  type Permission = {
    actions?: string[];
    createdTime?: string;
    displayName?: string;
    effect?: string;
    isEnabled?: boolean;
    name?: string;
    owner?: string;
    resourceType?: string;
    resources?: string[];
    roles?: string[];
    users?: string[];
  };

  type Product = {
    createdTime?: string;
    currency?: string;
    detail?: string;
    displayName?: string;
    image?: string;
    name?: string;
    owner?: string;
    price?: number;
    providers?: string[];
    quantity?: number;
    returnUrl?: string;
    sold?: number;
    state?: string;
    tag?: string;
  };

  type Provider = {
    appId?: string;
    bucket?: string;
    category?: string;
    cert?: string;
    clientId?: string;
    clientId2?: string;
    clientSecret?: string;
    clientSecret2?: string;
    content?: string;
    createdTime?: string;
    displayName?: string;
    domain?: string;
    enableSignAuthnRequest?: boolean;
    endpoint?: string;
    host?: string;
    idP?: string;
    intranetEndpoint?: string;
    issuerUrl?: string;
    metadata?: string;
    method?: string;
    name?: string;
    owner?: string;
    port?: number;
    providerUrl?: string;
    regionId?: string;
    signName?: string;
    subType?: string;
    templateCode?: string;
    title?: string;
    type?: string;
  };

  type ProviderItem = {
    alertType?: string;
    canSignIn?: boolean;
    canSignUp?: boolean;
    canUnlink?: boolean;
    name?: string;
    prompted?: boolean;
    provider?: Provider;
  };

  type Records = {};

  type RequestForm = {};

  type Response = __openAPI__false;

  type Role = {
    createdTime?: string;
    displayName?: string;
    isEnabled?: boolean;
    name?: string;
    owner?: string;
    roles?: string[];
    users?: string[];
  };

  type shebeixinxihexinziduan = {
    /** 产品id 不可修改 */
    productID: string;
    /** 设备名称 不可修改 */
    deviceName: string;
    /** 创建时间 */
    createdTime?: string;
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

  type shuzhuangjiedian = {
    /** 节点名称 */
    title: string;
    /** 节点键值 */
    key: string;
    value?: string;
    children?: E6A091E78AB6E88A82E782B9[];
  };

  type SignupItem = {
    name?: string;
    prompted?: boolean;
    required?: boolean;
    rule?: string;
    visible?: boolean;
  };

  type smsForm = {};

  type Syncer = {
    affiliationTable?: string;
    avatarBaseUrl?: string;
    createdTime?: string;
    database?: string;
    databaseType?: string;
    errorText?: string;
    host?: string;
    isEnabled?: boolean;
    name?: string;
    organization?: string;
    owner?: string;
    password?: string;
    port?: number;
    syncInterval?: number;
    table?: string;
    tableColumns?: TableColumn[];
    tablePrimaryKey?: string;
    type?: string;
    user?: string;
  };

  type TableColumn = {
    casdoorName?: string;
    isHashed?: boolean;
    name?: string;
    type?: string;
    values?: string[];
  };

  type Token = {
    accessToken?: string;
    application?: string;
    code?: string;
    codeChallenge?: string;
    codeExpireIn?: number;
    codeIsUsed?: boolean;
    createdTime?: string;
    expiresIn?: number;
    name?: string;
    organization?: string;
    owner?: string;
    refreshToken?: string;
    scope?: string;
    tokenType?: string;
    user?: string;
  };

  type TokenWrapper = {
    access_token?: string;
    error?: string;
    expires_in?: number;
    id_token?: string;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
  };

  type tubiaoshujuchaxuntiaojian = {
    /** 查询模型 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 查询条件 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** 查询语句 sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  };

  type User = {
    address?: string[];
    adfs?: string;
    affiliation?: string;
    alipay?: string;
    apple?: string;
    avatar?: string;
    azuread?: string;
    baidu?: string;
    bio?: string;
    birthday?: string;
    casdoor?: string;
    createdIp?: string;
    createdTime?: string;
    dingtalk?: string;
    displayName?: string;
    education?: string;
    email?: string;
    emailVerified?: boolean;
    facebook?: string;
    firstName?: string;
    gender?: string;
    gitee?: string;
    github?: string;
    gitlab?: string;
    google?: string;
    hash?: string;
    homepage?: string;
    id?: string;
    idCard?: string;
    idCardType?: string;
    infoflow?: string;
    isAdmin?: boolean;
    isDefaultAvatar?: boolean;
    isDeleted?: boolean;
    isForbidden?: boolean;
    isGlobalAdmin?: boolean;
    isOnline?: boolean;
    karma?: number;
    language?: string;
    lark?: string;
    lastName?: string;
    lastSigninIp?: string;
    lastSigninTime?: string;
    ldap?: string;
    linkedin?: string;
    location?: string;
    name?: string;
    owner?: string;
    password?: string;
    passwordSalt?: string;
    permanentAvatar?: string;
    phone?: string;
    preHash?: string;
    properties?: string;
    qq?: string;
    ranking?: number;
    region?: string;
    score?: number;
    signupApplication?: string;
    slack?: string;
    steam?: string;
    tag?: string;
    title?: string;
    type?: string;
    updatedTime?: string;
    wechat?: string;
    wecom?: string;
    weibo?: string;
  };

  type Userinfo = {
    address?: string;
    aud?: string;
    email?: string;
    iss?: string;
    name?: string;
    phone?: string;
    picture?: string;
    preferred_username?: string;
    sub?: string;
  };

  type Webhook = {
    contentType?: string;
    createdTime?: string;
    events?: string[];
    headers?: Header[];
    isEnabled?: boolean;
    isUserExtended?: boolean;
    method?: string;
    name?: string;
    organization?: string;
    owner?: string;
    url?: string;
  };

  type wumoxingjilu = {
    /** 发生时间戳 毫秒级 */
    timestamp: string;
    /** 事件类型 事件限定 信息:info 告警alert 故障:fault */
    type?: string;
    /** 数据的id */
    dataID: string;
    /** 获取到的值 */
    getValue?: string;
    /** 发送过去的参数 action限定 */
    sendValue?: string;
  };

  type yunduandiaoshirizhishujujiegouti = {
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
}
