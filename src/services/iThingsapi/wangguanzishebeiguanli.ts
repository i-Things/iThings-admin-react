// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取子设备列表 POST /api/v1/things/device/gateway/index */
export async function postApiV1ThingsDeviceGatewayIndex(
  body: {
    page?: { page?: number; size?: number };
    gateWayProductID: string;
    gateWaydeviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { list?: API.DeviceInfo[]; total?: number } }>(
    '/api/v1/things/device/gateway/index',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 批量添加网关子设备 POST /api/v1/things/device/gateway/multi-create */
export async function postApiV1ThingsDeviceGatewayMultiCreate(
  body: {
    list: API.deviceCore[];
    gateWayProductID: string;
    gateWaydeviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/device/gateway/multi-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量解绑网关子设备 POST /api/v1/things/device/gateway/multi-delete */
export async function postApiV1ThingsDeviceGatewayMultiDelete(
  body: {
    list: API.deviceCore[];
    gateWayProductID: string;
    gateWaydeviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/device/gateway/multi-delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
