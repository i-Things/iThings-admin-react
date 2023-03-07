// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 升级状态统计 POST /api/v1/things/ota/task/analysis */
export async function taskAnalysis(body: API.TaskAnalysisReq, options?: { [key: string]: any }) {
  return request<API.TaskAnalysisResp>('/api/v1/things/ota/task/analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消所有升级中的任务 POST /api/v1/things/ota/task/cancel */
export async function taskCancel(body: API.TaskCancleReq, options?: { [key: string]: any }) {
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
export async function taskCreate(body: API.TaskCreateReq, options?: { [key: string]: any }) {
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
export async function taskDeviceCancle(
  body: API.TaskDeviceCancleReq,
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

/** 重试单个设备升级 POST /api/v1/things/ota/task/device-retry */
export async function postApiV1ThingsOtaTaskDeviceRetry(
  body: {},
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/ota/task/device-retry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批次设备列表 POST /api/v1/things/ota/task/deviceIndex */
export async function taskDeviceIndex(
  body: API.TaskDeviceIndexReq,
  options?: { [key: string]: any },
) {
  return request<API.TaskDeviceIndexResp>('/api/v1/things/ota/task/deviceIndex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取升级批次任务列表 POST /api/v1/things/ota/task/index */
export async function taskList(body: API.FirmwareTaskIndexReq, options?: { [key: string]: any }) {
  return request<API.FirmwareTaskIndexResp>('/api/v1/things/ota/task/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 升级任务信息 POST /api/v1/things/ota/task/read */
export async function taskRead(body: API.TaskReadReq, options?: { [key: string]: any }) {
  return request<API.TaskReadResp>('/api/v1/things/ota/task/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
