// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 创建任务组 POST /api/v1/system/timed/task/group/create */
export async function postApiV1SystemTimedTaskGroupCreate(
  body: {
    code: string;
    name?: string;
    type?: string;
    subType?: string;
    priority?: number;
    env?: Record<string, any>;
    config?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/timed/task/group/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除任务组 POST /api/v1/system/timed/task/group/delete */
export async function postApiV1SystemTimedTaskGroup__openAPI__delete(
  body: {
    code: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/timed/task/group/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取任务组列表 POST /api/v1/system/timed/task/group/index */
export async function postApiV1SystemTimedTaskGroupIndex(
  body: {
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { list?: API.taskGroup[]; total?: number } }>(
    '/api/v1/system/timed/task/group/index',
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

/** 获取任务组详情 POST /api/v1/system/timed/task/group/read */
export async function postApiV1SystemTimedTaskGroupRead(
  body: {
    code: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      code?: string;
      name?: string;
      type?: string;
      subType?: string;
      priority?: number;
      env?: Record<string, any>;
      config?: string;
    };
  }>('/api/v1/system/timed/task/group/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新任务组 POST /api/v1/system/timed/task/group/update */
export async function postApiV1SystemTimedTaskGroupUpdate(
  body: {
    code: string;
    name?: string;
    type?: string;
    subType?: string;
    priority?: number;
    env?: Record<string, any>;
    config?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/timed/task/group/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建任务 POST /api/v1/system/timed/task/info/create */
export async function postApiV1SystemTimedTaskInfoCreate(
  body: {
    groupCode: string;
    type?: number;
    name?: string;
    code: string;
    params?: string;
    cronExpr?: string;
    status?: number;
    priority?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/timed/task/info/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除任务 POST /api/v1/system/timed/task/info/delete */
export async function postApiV1SystemTimedTaskInfo__openAPI__delete(
  body: {
    code: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/timed/task/info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取任务列表 POST /api/v1/system/timed/task/info/index */
export async function postApiV1SystemTimedTaskInfoIndex(
  body: {
    page?: { page?: number; size?: number };
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: { list?: API.taskInfo[]; total?: number } }>(
    '/api/v1/system/timed/task/info/index',
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

/** 获取任务详情 POST /api/v1/system/timed/task/info/read */
export async function postApiV1SystemTimedTaskInfoRead(
  body: {
    code: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string; data: API.taskInfo }>(
    '/api/v1/system/timed/task/info/read',
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

/** 更新任务 POST /api/v1/system/timed/task/info/update */
export async function postApiV1SystemTimedTaskInfoUpdate(
  body: {
    groupCode: string;
    type?: number;
    name?: string;
    code: string;
    params?: string;
    cronExpr?: string;
    status?: number;
    priority?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/timed/task/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 执行任务 POST /api/v1/system/timed/task/send */
export async function postApiV1SystemTimedTaskSend(
  body: {
    groupCode: string;
    code: string;
    option: {
      priority?: number;
      processIn?: number;
      processAt?: number;
      timeout?: number;
      deadline?: number;
    };
    paramQueue: { topic?: string; payload?: string };
    paramSql: { execContent?: string; param?: Record<string, any> };
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('/api/v1/system/timed/task/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
