import type { Request, Response } from 'express';

let roleList = [
  {
    userID: 1234,
    name: 'user',
    status: 1,
    remark: 'aqwww',
    createdTime: 1661830593000,
    roleMenuID: [2, 3, 4],
  },
  {
    userID: 12345,
    name: 'user',
    status: 2,
    remark: 'aqwww',
    createdTime: 1661830593000,
    roleMenuID: [19],
  },
];

async function postApiV1SystemRoleIndex(req: Request, res: Response) {
  return res.json({
    code: 200,
    msg: 'string',
    data: {
      list: roleList,
      total: 1,
    },
  });
}

async function postApiV1SystemRoleCreate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    roleList.push({
      ...req.body,
      userID: 123456,
      createdTime: 1661830593000,
      roleMenuID: [1, 2, 3],
    });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}

async function postApiV1SystemRoleUpdate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    roleList.push({ ...req.body, userID: 123, createdTime: 1661830593000, roleMenuID: [1, 2, 3] });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}

async function postApiV1SystemRole__openAPI__delete(req: Request, res: Response) {
  roleList = roleList.filter((item) => item.userID != req.body?.id);
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}

async function postApiV1SystemRoleRoleMenuUpdate(req: Request, res: Response) {
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}

export default {
  'POST /api/v1/system/role/index': postApiV1SystemRoleIndex,
  'POST /api/v1/system/role/create': postApiV1SystemRoleCreate,
  'POST /api/v1/system/role/update': postApiV1SystemRoleUpdate,
  'POST /api/v1/system/role/delete': postApiV1SystemRole__openAPI__delete,
  'POST /api/v1/system/role/role-menu/update': postApiV1SystemRoleRoleMenuUpdate,
};
