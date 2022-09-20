import type { Request, Response } from 'express';

const groupList = [
  {
    groupName: 'test001',
    createTime: '1663057691039',
    groupID: 'ohBwuajQ7ggGZAgCRuLP010200',
    groupLevel: 10,
    totalDevice: 10,
    activateDevice: 10,
    currentOnline: 10,
    description: 'test',
    tags: [{ key: 'q', value: 'w' }],
  },
  {
    groupName: 'test002',
    createTime: '1663057691039',
    groupID: 'ohBwuajQ7ggGZAgCRuLP010200',
    groupLevel: 10,
    totalDevice: 10,
    activateDevice: 10,
    currentOnline: 10,
    description: 'test',
    tags: [{ key: 'q', value: 'w' }],
  },
  {
    groupName: 'test003',
    createTime: '1663057691039',
    groupID: 'ohBwuajQ7ggGZAgCRuLP010200',
    groupLevel: 10,
    totalDevice: 10,
    activateDevice: 10,
    currentOnline: 10,
    description: 'test',
    tags: [{ key: 'q', value: 'w' }],
  },
];
const groupInfoList = {
  groupName: 'test001',
  createTime: '1663057691039',
  groupID: 'ohBwuajQ7ggGZAgCRuLP010200',
  groupLevel: '分组/test001',
  totalDevice: 10,
  activateDevice: 5,
  currentOnline: 5,
  description: '123',
  tags: [
    { key: 'qwe', value: 'asd' },
    { key: 'qwe', value: 'asd' },
    { key: 'qwe', value: 'asd' },
  ],
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
async function postThingsGroupInfoIndex(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({
    code: 0,
    msg: 'string',
    data: {
      list: groupList,
    },
  });
}
async function postThingsGroupInfoRead(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({
    code: 0,
    msg: 'string',
    data: groupInfoList,
  });
}
export default {
  'POST /api/v1/things/group/info/index': postThingsGroupInfoIndex,
  'POST /api/v1/things/group/info/read': postThingsGroupInfoRead,
};
