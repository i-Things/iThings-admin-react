import type { Request, Response } from 'express';

const productList = [
  {
    productName: 'test001',
    lastLogin: '1663057691039',
    productID: 'ohBwuajQ7ggGZAgCRuLP010200',
    product: 'test001',
    status: 1,
    nodeType: '设备',
  },
  {
    productName: 'test002',
    lastLogin: '1663057691039',
    productID: 'ohBwuajQ7ggGZAgCRuLP010201',
    product: 'test001',
    status: 1,
    nodeType: '设备',
  },
  {
    productName: 'test003',
    lastLogin: '1663057691039',
    productID: 'ohBwuajQ7ggGZAgCRuLP010202',
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

async function postApiV1ThingsProductInfoIndex(req: Request, res: Response) {
  await waitTime(500);
  return res.json({
    code: 200,
    msg: 'string',
    data: {
      list: productList,
    },
  });
}

export default {
  'POST /api/v1/things/product/info/index': postApiV1ThingsProductInfoIndex,
};
