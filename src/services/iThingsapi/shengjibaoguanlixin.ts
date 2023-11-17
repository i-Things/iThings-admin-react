// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建升级包版本 POST /api/v1/things/ota/otaFirmware/create */
export async function postApiV1ThingsOtaOtaFirmwareCreate(
  body: {
    productID: string;
    firmwareName: string;
    destVersion: string;
    signMethod: string;
    firmwareDesc: string;
    type: number;
    moduleName: string;
    needToVerify: boolean;
    firmwareFiles: API.FirmwareFile[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/ota/otaFirmware/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
