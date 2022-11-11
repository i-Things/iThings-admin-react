// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取子设备列表 POST /api/v1/things/device/gateway/index */
export async function postThingsDeviceGatewayIndex(
  body: {
    page?: { page?: number; size?: number };
    gateWayProductID: string;
    gateWaydeviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ list: API.DeviceInfo; total: number }>('/api/v1/things/device/gateway/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加网关子设备 POST /api/v1/things/device/gateway/muti-create */
export async function postThingsDeviceGatewayMutiCreate(
  body: {
    list: API.deviceCore[];
    gateWayProductID: string;
    gateWaydeviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/device/gateway/muti-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 解绑网关子设备 POST /api/v1/things/device/gateway/muti-delete */
export async function postThingsDeviceGatewayMutiDelete(
  body: {
    list: API.deviceCore[];
    gateWayProductID: string;
    gateWaydeviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/device/gateway/muti-delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
