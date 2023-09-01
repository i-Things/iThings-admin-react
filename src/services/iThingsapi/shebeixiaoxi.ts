// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取物模型事件历史记录 POST /api/v1/things/device/msg/event-log/index */
export async function postApiV1ThingsDeviceMsgEventLogIndex(
  body: {
    /** 不填获取产品下所有设备 */
    deviceNames: string[];
    /** 信息:info  告警alert  故障:fault */
    types?: string[];
    productID: string;
    dataID: string;
    timeStart: string;
    timeEnd: string;
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      list?: { timestamp?: string; type?: string; dataID?: string; params?: string }[];
      total?: number;
    };
    code: number;
    msg: string;
  }>('/api/v1/things/device/msg/event-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取云端诊断日志 POST /api/v1/things/device/msg/hub-log/index */
export async function postApiV1ThingsDeviceMsgHubLogIndex(
  body: {
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
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      list?: {
        timestamp?: string;
        action?: string;
        requestID?: string;
        tranceID?: string;
        topic?: string;
        content?: string;
        resultType?: string;
      }[];
      total?: number;
    };
    code: number;
    msg: string;
  }>('/api/v1/things/device/msg/hub-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取最新属性 POST /api/v1/things/device/msg/property-latest/index */
export async function postApiV1ThingsDeviceMsgPropertyLatestIndex(
  body: {
    deviceName: string;
    productID: string;
    /** 如果不指定则获取所有属性数据 */
    dataIDs: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: { list?: { timestamp?: string; dataID?: string; value?: string }[]; total?: number };
    code: number;
    msg: string;
  }>('/api/v1/things/device/msg/property-latest/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单个id属性历史记录 POST /api/v1/things/device/msg/property-log/index */
export async function postApiV1ThingsDeviceMsgPropertyLogIndex(
  body: {
    /** 不填获取产品下所有设备 */
    deviceNames: string[];
    productID: string;
    dataID: string;
    timeStart?: string;
    timeEnd?: string;
    /** avg:平均值 first:第一个参数 last:最后一个参数 count:总数 twa: 时间加权平均函数 参考:https://docs.taosdata.com/taos-sql/function */
    argFunc?: string;
    /** (单位毫秒) 如果这个值不为零值 则时间的开始和结束必须有效及聚合函数不应该为空 */
    interval?: number;
    /**   //  FILL 语句指定某一窗口区间数据缺失的情况下的填充模式。填充模式包括以下几种：   //    不进行填充：NONE（默认填充模式）。   //    VALUE 填充：固定值填充，此时需要指定填充的数值。例如：FILL(VALUE, 1.23)。   //    PREV 填充：使用前一个非 NULL 值填充数据。例如：FILL(PREV)。   //    NULL 填充：使用 NULL 填充数据。例如：FILL(NULL)。   //    LINEAR 填充：根据前后距离最近的非 NULL 值做线性插值填充。例如：FILL(LINEAR)。   //    NEXT 填充：使用下一个非 NULL 值填充数据。例如：FILL(NEXT)。 */
    fill?: string;
    /** 0:aes(默认,从久到近排序) 1:desc(时间从近到久排序) */
    order?: number;
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: { list?: { timestamp?: string; dataID?: string; value?: string }[]; total?: number };
    code: number;
    msg: string;
  }>('/api/v1/things/device/msg/property-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备本地日志 获取设备主动上传的sdk日志 POST /api/v1/things/device/msg/sdk-log/index */
export async function postApiV1ThingsDeviceMsgSdkLogIndex(
  body: {
    deviceName: string;
    productID: string;
    logLevel?: number;
    timeStart?: string;
    timeEnd?: string;
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: { list?: API.deviceMsgSdkIndex[]; total?: number };
    code: number;
    msg: string;
  }>('/api/v1/things/device/msg/sdk-log/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备影子列表 POST /api/v1/things/device/msg/shadow/index */
export async function postApiV1ThingsDeviceMsgShadowIndex(
  body: {
    deviceName: string;
    productID: string;
    /** 如果不指定则获取所有属性数据 */
    dataIDs: string[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: { list?: { updatedDeviceTime?: number; dataID?: string; value?: string }[] };
    code: number;
    msg: string;
  }>('/api/v1/things/device/msg/shadow/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
