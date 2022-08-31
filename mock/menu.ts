import type { Request, Response } from 'express';

let menuList = [
  {
    id: 1,
    name: '设备管理',
    icon: 'icon_data_01',
    path: '/deviceMangers',
    parentID: 0,
    order: 1,
    component: 'pages/deviceMangers/index.tsx',
  },
  {
    id: 2,
    name: '系统管理',
    icon: 'icon_system',
    path: '/systemManagers',
    parentID: 0,
    order: 2,
    component: 'pages/systemManagers/index.tsx',
  },
  {
    id: 3,
    name: '运维监控',
    icon: 'icon_system',
    path: '/operationsMonitorings',
    parentID: 0,
    order: 3,
    component: 'pages/operationsMonitorings/index.tsx',
  },
  {
    id: 4,
    name: '规则引擎',
    icon: 'icon_system',
    path: '/ruleEngines',
    parentID: 0,
    order: 4,
    component: 'pages/ruleEngines/index.tsx',
  },
  {
    id: 5,
    name: '产品',
    icon: 'icon_system',
    path: '/deviceMangers/products/index',
    parentID: 1,
    order: 1,
    component: 'pages/deviceMangers/products/index.tsx',
  },
  {
    id: 6,
    name: '产品详情-${id}',
    icon: 'icon_system',
    hideInMenu: true,
    path: '/deviceMangers/products/details/:id',
    parentID: 1,
    order: 2,
    component: 'pages/deviceMangers/products/details/index.tsx',
  },
  {
    id: 7,
    name: '设备',
    icon: 'icon_system',
    path: '/deviceMangers/devices/index',
    parentID: 1,
    order: 3,
    component: 'pages/deviceMangers/devices/index.tsx',
  },
  {
    id: 8,
    name: '设备详情-${id}',
    icon: 'icon_system',
    hideInMenu: true,
    path: '/deviceMangers/devices/details/:id',
    parentID: 1,
    order: 3,
    component: 'pages/deviceMangers/devices/details/index.tsx',
  },
  {
    id: 9,
    name: '用户管理',
    icon: 'icon_system',
    path: '/systemManagers/users/index',
    parentID: 2,
    order: 1,
    component: 'pages/systemManagers/users/index.tsx',
  },
  {
    id: 10,
    name: '角色管理',
    icon: 'icon_system',
    path: '/systemManagers/roles/index',
    parentID: 2,
    order: 2,
    component: 'pages/systemManagers/roles/index.tsx',
  },
  {
    id: 11,
    name: '菜单列表',
    icon: 'icon_system',
    path: '/systemManagers/menus/index',
    parentID: 2,
    order: 3,
    component: 'pages/systemManagers/menus/index.tsx',
  },
  {
    id: 12,
    name: '固件升级',
    icon: 'icon_system',
    path: '/operationsMonitorings/firmwareUpgrades/index',
    parentID: 3,
    order: 1,
    component: 'pages/operationsMonitorings/firmwareUpgrades/index.tsx',
  },
  {
    id: 13,
    name: '告警记录',
    icon: 'icon_system',
    path: '/operationsMonitorings/alarmRecords/index',
    parentID: 3,
    order: 2,
    component: 'pages/operationsMonitorings/alarmRecords/index.tsx',
  },
  {
    id: 14,
    name: '资源管理',
    icon: 'icon_system',
    path: '/operationsMonitorings/resourceManagements/index',
    parentID: 3,
    order: 3,
    component: 'pages/operationsMonitorings/resourceManagements/index.tsx',
  },
  {
    id: 15,
    name: '远程配置',
    icon: 'icon_system',
    path: '/operationsMonitorings/remoteConfigurations/index',
    parentID: 3,
    order: 4,
    component: 'pages/operationsMonitorings/remoteConfigurations/index.tsx',
  },
  {
    id: 16,
    name: '告警中心',
    icon: 'icon_system',
    path: '/operationsMonitorings/alarmCenters/index',
    parentID: 3,
    order: 5,
    component: 'pages/operationsMonitorings/alarmCenters/index.tsx',
  },
  {
    id: 17,
    name: '在线调试',
    icon: 'icon_system',
    path: '/operationsMonitorings/onlineDebugs/index',
    parentID: 3,
    order: 6,
    component: 'pages/operationsMonitorings/onlineDebugs/index.tsx',
  },
  {
    id: 18,
    name: '消息规则',
    icon: 'icon_system',
    path: '/ruleEngines/messageRules/index',
    parentID: 4,
    order: 1,
    component: 'pages/ruleEngines/messageRules/index.tsx',
  },
  {
    id: 19,
    name: '规则日志',
    icon: 'icon_system',
    path: '/ruleEngines/ruleLogs/index',
    parentID: 4,
    order: 2,
    component: 'pages/ruleEngines/ruleLogs/index.tsx',
  },
];

async function postSystemMenuIndex(req: Request, res: Response) {
  return res.json({
    code: 200,
    msg: 'string',
    data: {
      list: menuList,
      total: 1,
    },
  });
}
async function postSystemMenuCreate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    menuList.push({ ...req.body, uid: 123456, createdTime: 1661830593000, roleMenuID: [1, 2, 3] });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: menuList,
  });
}
async function postSystemMenuUpdate(req: Request, res: Response) {
  if (Object.keys(req.body).length > 0)
    menuList.push({ ...req.body, uid: 123, createdTime: 1661830593000, roleMenuID: [1, 2, 3] });
  return res.json({
    code: 200,
    msg: '添加成功',
    data: menuList,
  });
}
async function postSystemMenu__openAPI__delete(req: Request, res: Response) {
  menuList = menuList.filter((item) => item.uid != req.body?.id);
  return res.json({
    code: 200,
    msg: '添加成功',
    data: menuList,
  });
}

export default {
  'POST /api/v1/system/menu/index': postSystemMenuIndex,
  'POST /api/v1/system/menu/create': postSystemMenuCreate,
  'POST /api/v1/system/menu/update': postSystemMenuUpdate,
  'POST /api/v1/system/menu/delete': postSystemMenu__openAPI__delete,
};
