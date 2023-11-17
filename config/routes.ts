export default [
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
        path: '/',
        redirect: '/deviceManagers/product/index',
      },
      // {
      //   path: '/systemManagers',
      //   name: '系统管理',
      //   icon: 'icon_system',
      //   access: 'canAdmin',
      //   routes: [
      //     {
      //       name: '用户管理',
      //       path: '/systemManagers/user/index',
      //       component: './systemManagers/user/index',
      //     },
      //     {
      //       name: '角色管理',
      //       path: '/systemManagers/role/index',
      //       component: './systemManagers/role/index',
      //     },
      //     {
      //       name: '菜单管理',
      //       path: '/systemManagers/menu/index',
      //       component: './systemManagers/menu/index',
      //     },
      //     {
      //       name: '接口管理',
      //       path: '/systemManagers/api/index',
      //       component: './systemManagers/api/index',
      //     },
      //     {
      //       name: '日志管理',
      //       routes: [
      //         {
      //           name: '登录日志',
      //           path: '/systemManagers/log/loginLog/index',
      //           component: './systemManagers/log/loginLog/index',
      //         },
      //         {
      //           name: '操作日志',
      //           path: '/systemManagers/log/operationLog/index',
      //           component: './systemManagers/log/operationLog/index',
      //         },
      //       ],
      //     },
      //     {
      //       component: '404',
      //     },
      //   ],
      // },
      // {
      //   component: '404',
      // },
      // {
      //   path: '/home',
      //   name: '首页',
      //   component: './home/index',
      //   icon: 'icon_dosing',
      // },
      // {
      //   path: '/deviceManagers',
      //   name: '设备管理',
      //   icon: 'icon_data_01',
      //   routes: [
      //     {
      //       name: '产品',
      //       path: '/deviceManagers/product/index',
      //       component: './deviceManagers/product/index',
      //     },
      //     {
      //       name: '产品详情',
      //       hideInMenu: true,
      //       path: '/deviceManagers/product/detail/:id',
      //       component: './deviceManagers/product/detail/index',
      //     },
      //     {
      //       name: '设备',
      //       path: '/deviceManagers/device/index',
      //       component: './deviceManagers/device/index',
      //     },
      //     {
      //       name: '设备详情',
      //       hideInMenu: true,
      //       path: '/deviceManagers/device/detail/:id/:name/:type',
      //       component: './deviceManagers/device/detail/index',
      //     },
      //     {
      //       name: '分组',
      //       path: '/deviceManagers/group/index',
      //       component: './deviceManagers/group/index',
      //     },
      //     {
      //       name: '分组详情',
      //       hideInMenu: true,
      //       path: '/deviceManagers/group/detail/:id',
      //       component: './deviceManagers/group/detail/index',
      //     },
      //   ],
      // },
      // {
      //   path: '/ruleEngine',
      //   name: '规则引擎',
      //   icon: 'icon_data_01',
      //   routes: [
      //     {
      //       name: '场景联动',
      //       path: '/ruleEngine/scene/index',
      //       component: './ruleEngine/scene/index.tsx',
      //     },
      //     {
      //       name: '详情',
      //       path: '/ruleEngine/scene/detail',
      //       component: './ruleEngine/scene/detail/index.tsx',
      //     },
      //   ],
      // },
      // {
      //   path: '/operationsMonitorings',
      //   name: '运维监控',
      //   icon: 'icon_system',
      //   routes: [
      //     {
      //       name: '在线调试',
      //       path: '/operationsMonitorings/onlineDebugs/index',
      //       component: './operationsMonitorings/onlineDebug/index',
      //     },
      //     {
      //       name: '日志服务',
      //       path: '/operationsMonitorings/logService/index',
      //       component: './operationsMonitorings/logService/index',
      //     },
      //     {
      //       name: '远程配置',
      //       path: '/operationsMonitorings/remoteConfiguration/index',
      //       component: './operationsMonitorings/remoteConfiguration/index',
      //     },
      //     {
      //       component: '404',
      //     },
      //   ],
      // },
      // {
      //   path: '/alarmManagers',
      //   name: '告警管理',
      //   icon: 'icon_system',
      //   routes: [
      //     {
      //       name: '告警配置',
      //       path: '/alarmManagers/alarmConfiguration/index',
      //       component: './alarmManagers/alarmConfiguration/index',
      //     },
      //     {
      //       name: '新增告警配置',
      //       path: '/alarmManagers/alarmConfiguration/save',
      //       component: './alarmManagers/alarmConfiguration/addAlarmConfig/index',
      //     },
      //     {
      //       name: '告警记录',
      //       path: '/alarmManagers/alarmConfiguration/log',
      //       component: './alarmManagers/alarmRecord/index',
      //     },
      //     {
      //       name: '告警日志',
      //       path: '/alarmManagers/alarmConfiguration/log/detail/:id/:level',
      //       component: './alarmManagers/alarmLog/index',
      //     },
      //   ],
      // },
    ],
  },
  {
    layout: false,
    name: '404',
    path: '/*',
    component: '404',
  },
];
