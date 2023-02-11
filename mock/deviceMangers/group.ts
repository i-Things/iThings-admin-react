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
const groupDeviceList = [
  {
    deviceName: 'test001',
    createdTime: '1663057691039',
    lastLogin: '1663057691039',
    firstLogin: '1663057691039',
    productID: 'ohBwuajQ7ggGZAgCRuLP010200',
    secret: 'ohBwuajQ7ggGZAgCRuLP010200',
    cert: 'ohBwuajQ7ggGZAgCRuLP010200',
    version: 'v1',
    logLevel: '1',
    isOnline: 2,
  },
  {
    deviceName: 'test002',
    createdTime: '1663057691039',
    lastLogin: '1663057691039',
    firstLogin: '1663057691039',
    productID: 'ohBwuajQ7ggGZAgCRuLP010200',
    secret: 'ohBwuajQ7ggGZAgCRuLP010200',
    cert: 'ohBwuajQ7ggGZAgCRuLP010200',
    version: 'v1',
    logLevel: '1',
    isOnline: 2,
  },
  {
    deviceName: 'test003',
    createdTime: '1663057691039',
    lastLogin: '1663057691039',
    firstLogin: '1663057691039',
    productID: 'ohBwuajQ7ggGZAgCRuLP010200',
    secret: 'ohBwuajQ7ggGZAgCRuLP010200',
    cert: 'ohBwuajQ7ggGZAgCRuLP010200',
    version: 'v1',
    logLevel: '1',
    isOnline: 2,
  },
];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function postApiV1ThingsGroupInfoIndex(req: Request, res: Response) {
  await waitTime(100);
  return res.json({
    code: 0,
    msg: 'string',
    data: {
      list: groupList,
    },
  });
}

async function postApiV1ThingsGroupInfoRead(req: Request, res: Response) {
  await waitTime(100);
  return res.json({
    code: 0,
    msg: 'string',
    data: groupInfoList,
  });
}

async function postApiV1ThingsGroupDeviceIndex(req: Request, res: Response) {
  await waitTime(100);
  return res.json({
    code: 0,
    msg: 'string',
    data: {
      list: groupDeviceList,
    },
  });
}

export default {
  'POST /api/v1/things/group/info/index': postApiV1ThingsGroupInfoIndex,
  'POST /api/v1/things/group/info/read': postApiV1ThingsGroupInfoRead,
  'POST /api/v1/things/group/device/index': postApiV1ThingsGroupDeviceIndex,
};
