// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 采集器设备信息 POST /api/v1/app/collector/collector-deviceinfo */
export async function postApiV1AppCollectorCollectorDeviceinfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postApiV1AppCollectorCollectorDeviceinfoParams & {
    // header
    "fmcs-guid"?: string;
  },
  body: {
    /** 采集器名称 即叶子节点名称 */
    deviceName: string;
    /** 采集器虚拟ID */
    collectorId: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      id?: number;
      collectorLocate?: string;
      collectorID?: string;
      collectorName?: string;
      collectorModle?: string;
      deviceName?: string;
      gateway?: string;
      plcType?: string;
      responsible?: string;
      operationStatus?: string;
      phone?: string;
      deviceType?: string;
      system?: string;
      createdTime?: number;
    };
  }>("/api/v1/app/collector/collector-deviceinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 采集器目录结构 POST /api/v1/app/collector/collector-folder */
export async function postApiV1AppCollectorCollectorFolder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postApiV1AppCollectorCollectorFolderParams & {
    // header
    "fmcs-guid"?: string;
  },
  body: {},
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>(
    "/api/v1/app/collector/collector-folder",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}
