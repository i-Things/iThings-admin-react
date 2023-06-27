import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}
// 用户
async function postV1SystemUserLogin(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({
    code: 0,
    msg: '登录成功',
    data: {
      info: {
        userID: 'string',
        userName: 'string',
        nickName: 'string',
        inviterUid: 'string',
        inviterId: 'string',
        sex: 'string',
        city: 'string',
        country: 'string',
        province: 'string',
        language: 'string',
        headImgUrl: 'string',
        createTime: 'string',
        role: 'string',
      },
      token: {
        accessToken: 'string',
        accessExpire: 'string',
        refreshAfter: 'string',
      },
    },
  });
}

async function postV1SystemUserInfoIndex(req: Request, res: Response) {
  return res.json({
    code: 0,
    msg: 'string',
    data: {
      userID: 'string',
      userName: 'Hit',
      nickName: 'Hit',
      inviterUid: 'string',
      inviterId: 'string',
      sex: 'string',
      city: 'string',
      country: 'string',
      province: 'string',
      language: 'string',
      headImgUrl: 'https://huhui-coder.github.io/vue-press-docs/hit.JPG',
      createTime: 'string',
      Password: 'string',
      Email: 'string',
      Phone: 'string',
      Wechat: 'string',
      LastIP: 'string',
      RegIP: 'string',
      Status: 'string',
    },
  });
}

async function postV1SystemUserCaptcha(req: Request, res: Response) {
  return res.json({
    code: 0,
    msg: 'string',
    data: {
      codeID: 'string',
      url: 'data:image/jpeg;base64,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',
      expire: 'string',
    },
  });
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    res.send({
      success: true,
      data: {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
  'POST /api/v1/system/user/login': postV1SystemUserLogin,
  'POST /api/v1/system/user/read': postV1SystemUserInfoIndex,
  'POST /api/v1/system/user/captcha': postV1SystemUserCaptcha,
};
