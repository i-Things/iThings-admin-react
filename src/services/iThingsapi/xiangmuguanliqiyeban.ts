// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增项目 POST /api/v1/things/project/info/create */
export async function postApiV1ThingsProjectInfoCreate(
  body: {
    /** 项目名称 */
    projectName: string;
    /** 项目所属公司名称 */
    companyName?: string;
    /** 项目联系人姓名 */
    contactName?: string;
    /** 项目联系人号码 */
    contactMobile?: string;
    /** 项目省市区县 */
    region?: string;
    /** 项目详细地址 */
    address?: string;
    /** 项目备注 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/project/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除项目 POST /api/v1/things/project/info/delete */
export async function postApiV1ThingsProjectInfo__openAPI__delete(
  body: {},
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/things/project/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取项目列表 POST /api/v1/things/project/info/index */
export async function postApiV1ThingsProjectInfoIndex(
  body: {
    page?: API.PageInfo;
    projectIDs?: string[];
    projectName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total?: number;
      list?: {
        createdTime?: string;
        projectID?: string;
        projectName?: string;
        companyName?: string;
        contactName?: string;
        contactMobile?: string;
        region?: string;
        address?: string;
        desc?: string;
      }[];
    };
  }>('/api/v1/things/project/info/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取项目信息 POST /api/v1/things/project/info/read */
export async function postApiV1ThingsProjectInfoRead(
  body: {
    projectID: string;
    /** 项目名称 */
    projectName?: string;
    /** 项目所属公司名称 */
    companyName?: string;
    /** 项目联系人姓名 */
    contactName?: string;
    /** 项目联系人号码 */
    contactMobile?: string;
    /** 项目省市区县 */
    region?: string;
    /** 项目详细地址 */
    address?: string;
    /** 项目备注 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: API.ProjectInfo }>(
    '/api/v1/things/project/info/read',
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

/** 更新项目 POST /api/v1/things/project/info/update */
export async function postApiV1ThingsProjectInfoUpdate(
  body: {
    /** 项目名称 */
    projectName: string;
    /** 项目所属公司名称 */
    companyName?: string;
    /** 项目联系人姓名 */
    contactName?: string;
    /** 项目联系人号码 */
    contactMobile?: string;
    /** 项目省市区县 */
    region?: string;
    /** 项目详细地址 */
    address?: string;
    /** 项目备注 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/things/project/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
