// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 新增项目 POST /api/v1/system/project/info/create */
export async function postApiV1SystemProjectInfoCreate(
  body: {
    /** 项目名称 */
    projectName: string;
    /** 项目所属公司名称 */
    companyName?: string;
    /** 项目联系人id */
    userID?: string;
    /** 项目省市区县 */
    region?: string;
    /** 项目详细地址 */
    address?: string;
    /** 项目备注 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/project/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除项目 POST /api/v1/system/project/info/delete */
export async function postApiV1SystemProjectInfo__openAPI__delete(
  body: {},
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/system/project/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取项目列表 POST /api/v1/system/project/info/index */
export async function postApiV1SystemProjectInfoIndex(
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
        projectID?: string;
        projectName?: string;
        companyName?: string;
        userID?: string;
        region?: string;
        address?: string;
        desc?: string;
        createdTime?: string;
      }[];
    };
  }>('/api/v1/system/project/info/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取项目信息 POST /api/v1/system/project/info/read */
export async function postApiV1SystemProjectInfoRead(
  body: {
    projectID: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: API.ProjectInfo }>(
    '/api/v1/system/project/info/read',
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

/** 更新项目 POST /api/v1/system/project/info/update */
export async function postApiV1SystemProjectInfoUpdate(
  body: {
    /** 项目名称 */
    projectName: string;
    /** 项目所属公司名称 */
    companyName?: string;
    /** 项目联系人id */
    userID?: string;
    /** 项目省市区县 */
    region?: string;
    /** 项目详细地址 */
    address?: string;
    /** 项目备注 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/project/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
