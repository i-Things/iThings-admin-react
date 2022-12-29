// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取分组设备列表 POST /api/v1/things/group/device/index */
export async function postThingsGroupDeviceIndex(
  body: {
    /** 分组ID */
    groupID: string;
    /** 产品ID */
    productID: string;
    /** 设备名称 */
    deviceName: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      list?: {
        productID?: string;
        deviceName?: string;
        createdTime?: string;
        secret?: string;
        firstLogin?: string;
        lastLogin?: string;
        version?: string;
        logLevel?: string;
        cert?: string;
        isOnline?: string;
      }[];
    };
  }>('/api/v1/things/group/device/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加分组设备(支持批量) POST /api/v1/things/group/device/multi-create */
export async function postThingsGroupDeviceMultiCreate(
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
export async function postThingsGroupDeviceMultiDelete(
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
export async function postThingsGroupInfoCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postThingsGroupInfoCreateParams,
  body: {
    district_id?: string;
  },
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<{ code: number; msg: string }>('/api/v1/things/group/info/create', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 删除分组 POST /api/v1/things/group/info/delete */
export async function postThingsGroupInfo__openAPI__delete(
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
export async function postThingsGroupInfoIndex(
  body: {
    page: { page?: number; size?: number };
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
export async function postThingsGroupInfoRead(
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
export async function postThingsGroupInfoUpdate(
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
