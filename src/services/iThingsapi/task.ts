// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 升级状态统计 POST /api/v1/things/ota/task/analysis */
export async function analysis(body: API.OtaTaskAnalysisReq, options?: { [key: string]: any }) {
  return request<API.OtaTaskAnalysisResp>('/api/v1/things/ota/task/analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消所有升级中的任务 POST /api/v1/things/ota/task/cancel */
export async function cancel(body: API.OtaTaskCancleReq, options?: { [key: string]: any }) {
  return request<string>('/api/v1/things/ota/task/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建升级任务 POST /api/v1/things/ota/task/create */
export async function create(body: API.OtaTaskCreateReq, options?: { [key: string]: any }) {
  return request<string>('/api/v1/things/ota/task/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消单个设备升级 POST /api/v1/things/ota/task/device-cancel */
export async function deviceCancle(
  body: API.OtaTaskDeviceCancleReq,
  options?: { [key: string]: any },
) {
  return request<string>('/api/v1/things/ota/task/device-cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批次设备列表 POST /api/v1/things/ota/task/device-index */
export async function deviceIndex(
  body: API.OtaTaskDeviceIndexReq,
  options?: { [key: string]: any },
) {
  return request<API.OtaTaskDeviceIndexResp>('/api/v1/things/ota/task/device-index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重试单个设备升级 POST /api/v1/things/ota/task/device-retry */
export async function deviceRetry(
  body: API.OtaTaskDeviceRetryReq,
  options?: { [key: string]: any },
) {
  return request<string>('/api/v1/things/ota/task/device-retry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取升级批次任务列表 POST /api/v1/things/ota/task/index */
export async function index(body: API.OtaTaskIndexReq, options?: { [key: string]: any }) {
  return request<API.OtaTaskIndexResp>('/api/v1/things/ota/task/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 升级任务信息 POST /api/v1/things/ota/task/read */
export async function read(body: API.OtaTaskReadReq, options?: { [key: string]: any }) {
  return request<API.OtaTaskReadResp>('/api/v1/things/ota/task/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
