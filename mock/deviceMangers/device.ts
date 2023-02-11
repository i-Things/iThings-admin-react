import type { Request, Response } from 'express';

const deviceList = [
  {
    deviceName: 'test001',
    lastLogin: '1663057691039',
    deviceID: 'ohBwuajQ7ggGZAgCRuLP010200',
    product: 'test001',
    status: 1,
    nodeType: '设备',
  },
  {
    deviceName: 'test002',
    lastLogin: '1663057691039',
    deviceID: 'ohBwuajQ7ggGZAgCRuLP010200',
    product: 'test001',
    status: 1,
    nodeType: '设备',
  },
  {
    deviceName: 'test003',
    lastLogin: '1663057691039',
    deviceID: 'ohBwuajQ7ggGZAgCRuLP010200',
    product: 'test001',
    status: 2,
    nodeType: '设备',
  },
];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function postApiV1ThingsDeviceInfoIndex(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({
    code: 0,
    msg: 'string',
    data: {
      list: deviceList,
    },
  });
}

export default {
  'POST /api/v1/things/device/info/index': postApiV1ThingsDeviceInfoIndex,
};
