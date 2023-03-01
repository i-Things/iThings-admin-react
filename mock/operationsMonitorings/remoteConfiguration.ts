import type { Request, Response } from 'express';

const List = {
  productID: '1',
  content: {
    test: '123',
  },
  createdTime: '1667550560664',
};

const ProductRemoteConfigList = [
  {
    id: 1,
    updateTime: '1667550560664',
    content: `
    {
      "test": "1"
    }
`,
  },
  {
    id: 2,
    updateTime: '1667550560664',
    content: `
    {
      "test": "2"
    }
`,
  },
  {
    id: 3,
    updateTime: '1667550560664',
    content: `
    {
      "test": "3"
    }
`,
  },
];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function postApiV1ThingsProductRemoteConfigLastestRead(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({
    code: 200,
    msg: 'string',
    data: List,
  });
}

async function postApiV1ThingsProductRemoteConfigIndex(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({
    code: 200,
    msg: 'string',
    data: {
      list: ProductRemoteConfigList,
      total: 3,
    },
  });
}

export default {
  'POST /api/v1/things/product/remote-config/lastest-read':
    postApiV1ThingsProductRemoteConfigLastestRead,
  'POST /api/v1/things/product/remote-config/index': postApiV1ThingsProductRemoteConfigIndex,
};
