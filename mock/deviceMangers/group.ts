import type { Request, Response } from 'express';

const groupList = [
  {
    groupName: 'test001',
    createTime: '1663057691039',
    groupID: 'ohBwuajQ7ggGZAgCRuLP010200',
  },
  {
    groupName: 'test002',
    createTime: '1663057691039',
    groupID: 'ohBwuajQ7ggGZAgCRuLP010200',
  },
  {
    groupName: 'test003',
    createTime: '1663057691039',
    groupID: 'ohBwuajQ7ggGZAgCRuLP010200',
  },
];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
async function postDeviceGroupIndex(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({
    code: 0,
    msg: 'string',
    data: {
      list: groupList,
    },
  });
}
export default {
  'POST /api/v1/device/group/index': postDeviceGroupIndex,
};
