import type { Request, Response } from 'express';

let roleList = [
  {
    uid: 1234,
    name: 'user',
    status: 1,
    remark: 'aqwww',
    createdTime: 1661830593000,
    roleMenuID: [2, 3, 4],
  },
  {
    uid: 12345,
    name: 'user',
    status: 2,
    remark: 'aqwww',
    createdTime: 1661830593000,
    roleMenuID: [19],
  },
];

async function postSystemRoleIndex(req: Request, res: Response) {
  return res.json({
    code: 200,
    msg: 'string',
    data: {
      list: roleList,
      total: 1,
    },
  });
}
async function postSystemRoleCreate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    roleList.push({ ...req.body, uid: 123456, createdTime: 1661830593000, roleMenuID: [1, 2, 3] });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}
async function postSystemRoleUpdate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    roleList.push({ ...req.body, uid: 123, createdTime: 1661830593000, roleMenuID: [1, 2, 3] });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}
async function postSystemRole__openAPI__delete(req: Request, res: Response) {
  roleList = roleList.filter((item) => item.uid != req.body?.id);
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}
async function postSystemRoleRoleMenuUpdate(req: Request, res: Response) {
  return res.json({
    code: 200,
    msg: '添加成功',
    data: roleList,
  });
}

export default {
  'POST /api/v1/system/role/index': postSystemRoleIndex,
  'POST /api/v1/system/role/create': postSystemRoleCreate,
  'POST /api/v1/system/role/update': postSystemRoleUpdate,
  'POST /api/v1/system/role/delete': postSystemRole__openAPI__delete,
  'POST /api/v1/system/role/role-menu/update': postSystemRoleRoleMenuUpdate,
};
