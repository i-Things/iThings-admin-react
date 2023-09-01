// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取分组设备列表 POST /api/v1/things/group/device/index */
export async function postApiV1ThingsGroupDeviceIndex(
  body: {
    /** 分组ID */
    groupID: string;
    /** 产品ID */
    productID?: string;
    /** 设备名称 */
    deviceName?: string;
    /** 如果不为nil,如果为空,获取设备所有最新属性 如果传了属性列表,则会返回属性列表 */
    withProperties?: string[];
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { list?: API.DeviceInfo[] } }>(
    '/api/v1/things/group/device/index',
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

/** 添加分组设备(支持批量) POST /api/v1/things/group/device/multi-create */
export async function postApiV1ThingsGroupDeviceMultiCreate(
  body: {
    /** 分组ID */
    groupID: string;
    list: { productID?: string; deviceName?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/group/device/multi-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除分组设备(支持批量) POST /api/v1/things/group/device/multi-delete */
export async function postApiV1ThingsGroupDeviceMultiDelete(
  body: {
    /** 分组ID */
    groupID: string;
    list: { productID?: string; deviceName?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/group/device/multi-delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建分组 POST /api/v1/things/group/info/create */
export async function postApiV1ThingsGroupInfoCreate(
  body: {
    /** 分组名称 */
    groupName: string;
    /** 父组ID 1-根组 ，非根组，则传所选父分组的groupID 作为本组的parentID */
    parentID?: string;
    /** 绑定的productID */
    productID?: string;
    /** 分组描述 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/group/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除分组 POST /api/v1/things/group/info/delete */
export async function postApiV1ThingsGroupInfo__openAPI__delete(
  body: {
    /** 分组ID */
    groupID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/group/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分组列表 POST /api/v1/things/group/info/index */
export async function postApiV1ThingsGroupInfoIndex(
  body: {
    page: { page?: number; size?: number };
    productID: string;
    /** 父组ID, 1-根组 */
    parentID: string;
    /** 按分组名称筛选 */
    groupName?: string;
    tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      list?: {
        groupName?: string;
        parentID?: number;
        groupID?: number;
        productID?: string;
        productName?: string;
        desc?: string;
        createdTime?: string;
        tags?: { key?: string; value?: string }[];
      }[];
      total?: number;
      num?: number;
    };
  }>('/api/v1/things/group/info/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分组详情信息 POST /api/v1/things/group/info/read */
export async function postApiV1ThingsGroupInfoRead(
  body: {
    /** 分组ID */
    groupID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      groupName?: string;
      groupID?: string;
      parentID?: string;
      createdTime?: string;
      desc?: string;
      tags?: { key?: string; value?: string }[];
    };
  }>('/api/v1/things/group/info/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新分组信息 POST /api/v1/things/group/info/update */
export async function postApiV1ThingsGroupInfoUpdate(
  body: {
    groupID: string;
    groupName: string;
    desc?: string;
    tags?: { key?: string; value?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/group/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
