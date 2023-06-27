import type { Request, Response } from 'express';

// let menuList = [
//   {
//     id: 0,
//     name: '登录',
//     icon: 'icon_data_01',
//     path: '/user/login',
//     parentID: 1,
//     order: 1,
//     component: './user/Login',
//   },
//   {
//     id: 2,
//     name: '设备管理',
//     icon: 'icon_data_01',
//     path: '/deviceMangers',
//     parentID: 1,
//     order: 1,
//     component: './deviceMangers/index.tsx',
//   },
//   {
//     id: 3,
//     name: '系统管理',
//     icon: 'icon_system',
//     path: '/systemManagers',
//     parentID: 1,
//     order: 2,
//     component: './systemManagers/index.tsx',
//   },
//   {
//     id: 4,
//     name: '运维监控',
//     icon: 'icon_system',
//     path: '/operationsMonitorings',
//     parentID: 1,
//     order: 3,
//     component: './operationsMonitorings/index.tsx',
//   },
//   {
//     id: 5,
//     name: '规则引擎',
//     icon: 'icon_system',
//     path: '/ruleEngines',
//     parentID: 1,
//     order: 4,
//     component: './ruleEngines/index.tsx',
//   },
//   {
//     id: 6,
//     name: '产品',
//     icon: 'icon_system',
//     path: '/deviceMangers/products/index',
//     parentID: 2,
//     order: 1,
//     component: './deviceMangers/products/index.tsx',
//   },
//   {
//     id: 7,
//     name: '产品详情-${id}',
//     icon: 'icon_system',
//     hideInMenu: true,
//     path: '/deviceMangers/products/details/:id',
//     parentID: 2,
//     order: 2,
//     component: './deviceMangers/products/details/index.tsx',
//   },
//   {
//     id: 8,
//     name: '设备',
//     icon: 'icon_system',
//     path: '/deviceMangers/devices/index',
//     parentID: 2,
//     order: 3,
//     component: './deviceMangers/devices/index.tsx',
//   },
//   {
//     id: 9,
//     name: '设备详情-${id}',
//     icon: 'icon_system',
//     hideInMenu: true,
//     path: '/deviceMangers/devices/details/:id',
//     parentID: 2,
//     order: 3,
//     component: './deviceMangers/devices/details/index.tsx',
//   },
//   {
//     id: 10,
//     name: '用户管理',
//     icon: 'icon_system',
//     path: '/systemManagers/users/index',
//     parentID: 3,
//     order: 1,
//     component: './systemManagers/users/index.tsx',
//   },
//   {
//     id: 11,
//     name: '角色管理',
//     icon: 'icon_system',
//     path: '/systemManagers/roles/index',
//     parentID: 3,
//     order: 2,
//     component: './systemManagers/roles/index.tsx',
//   },
//   {
//     id: 12,
//     name: '菜单列表',
//     icon: 'icon_system',
//     path: '/systemManagers/menus/index',
//     parentID: 3,
//     order: 3,
//     component: './systemManagers/menus/index.tsx',
//   },
//   {
//     id: 13,
//     name: '固件升级',
//     icon: 'icon_system',
//     path: '/operationsMonitorings/firmwareUpgrades/index',
//     parentID: 4,
//     order: 1,
//     component: './operationsMonitorings/firmwareUpgrades/index.tsx',
//   },
//   {
//     id: 14,
//     name: '告警记录',
//     icon: 'icon_system',
//     path: '/operationsMonitorings/alarmRecords/index',
//     parentID: 4,
//     order: 2,
//     component: './operationsMonitorings/alarmRecords/index.tsx',
//   },
//   {
//     id: 15,
//     name: '资源管理',
//     icon: 'icon_system',
//     path: '/operationsMonitorings/resourceManagements/index',
//     parentID: 4,
//     order: 3,
//     component: './operationsMonitorings/resourceManagements/index.tsx',
//   },
//   {
//     id: 16,
//     name: '远程配置',
//     icon: 'icon_system',
//     path: '/operationsMonitorings/remoteConfigurations/index',
//     parentID: 4,
//     order: 4,
//     component: './operationsMonitorings/remoteConfigurations/index.tsx',
//   },
//   {
//     id: 17,
//     name: '告警中心',
//     icon: 'icon_system',
//     path: '/operationsMonitorings/alarmCenters/index',
//     parentID: 4,
//     order: 5,
//     component: './operationsMonitorings/alarmCenters/index.tsx',
//   },
//   {
//     id: 18,
//     name: '在线调试',
//     icon: 'icon_system',
//     path: '/operationsMonitorings/onlineDebugs/index',
//     parentID: 4,
//     order: 6,
//     component: './operationsMonitorings/onlineDebugs/index.tsx',
//   },
//   {
//     id: 19,
//     name: '消息规则',
//     icon: 'icon_system',
//     path: '/ruleEngines/messageRules/index',
//     parentID: 5,
//     order: 1,
//     component: './ruleEngines/messageRules/index.tsx',
//   },
//   {
//     id: 20,
//     name: '规则日志',
//     icon: 'icon_system',
//     path: '/ruleEngines/ruleLogs/index',
//     parentID: 5,
//     order: 2,
//     component: './ruleEngines/ruleLogs/index.tsx',
//   },
// ];

let menuList = [
  {
    path: '/user',
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    layout: false,
    routes: [
      {
        path: '/deviceMangers',
        name: '设备管理',
        icon: 'icon_data_01',
        routes: [
          {
            name: '产品',
            path: '/deviceMangers/products',
            component: './deviceMangers/products/index',
          },
          {
            name: '产品详情',
            hideInMenu: true,
            path: '/deviceMangers/products/details/:id',
            component: './deviceMangers/products/details/index',
          },
          {
            name: '设备',
            path: '/deviceMangers/devices',
            component: './deviceMangers/devices/index',
          },
          {
            name: '设备详情',
            hideInMenu: true,
            path: '/deviceMangers/devices/detail/:id',
            component: './deviceMangers/devices/details/index',
          },
        ],
      },
      {
        path: '/systemManagers',
        name: '系统管理',
        icon: 'icon_system',
        routes: [
          {
            name: '用户管理',
            path: '/systemManagers/users',
            component: './systemManagers/users/index',
          },
          {
            name: '角色管理',
            path: '/systemManagers/roles',
            component: './systemManagers/roles/index',
          },
          {
            name: '菜单管理',
            path: '/systemManagers/menus',
            component: './systemManagers/menus/index',
          },
        ],
      },
      {
        path: '/',
        redirect: '/systemManagers/users',
      },
      {
        component: '404',
      },
    ],
  },
];

async function postApiV1SystemMenuIndex(req: Request, res: Response) {
  return res.json({
    code: 200,
    msg: 'string',
    data: {
      list: menuList,
      total: 19,
    },
  });
}

async function postApiV1SystemMenuCreate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    menuList.push({
      ...req.body,
      userID: 123456,
      createdTime: 1661830593000,
      roleMenuID: [1, 2, 3],
    });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: menuList,
  });
}

async function postApiV1SystemMenuUpdate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    menuList.push({ ...req.body, userID: 123, createdTime: 1661830593000, roleMenuID: [1, 2, 3] });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: menuList,
  });
}

async function postApiV1SystemMenu__openAPI__delete(req: Request, res: Response) {
  menuList = menuList.filter((item) => item.id != req.body?.id);
  return res.json({
    code: 200,
    msg: '添加成功',
    data: menuList,
  });
}

export default {
  'POST /api/v1/system/menu/index': postApiV1SystemMenuIndex,
  'POST /api/v1/system/menu/create': postApiV1SystemMenuCreate,
  'POST /api/v1/system/menu/update': postApiV1SystemMenuUpdate,
  'POST /api/v1/system/menu/delete': postApiV1SystemMenu__openAPI__delete,
};
