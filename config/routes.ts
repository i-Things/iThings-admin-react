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
    component: '../layouts/BasicLayout',
    layout: false,
    routes: [
      {
        path: '/home',
        name: '大屏',
        component: './home/index',
        icon: 'icon_dosing',
      },
      {
        path: '/deviceDemo',
        name: '设备数据demo',
        component: './deviceDemo/index',
        icon: 'icon_dosing',
      },
      {
        path: '/deviceMangers',
        name: '设备管理',
        icon: 'icon_data_01',
        routes: [
          {
            name: '产品',
            path: '/deviceMangers/product/index',
            component: './deviceMangers/product/index',
          },
          {
            name: '产品详情',
            hideInMenu: true,
            path: '/deviceMangers/product/detail/:id',
            component: './deviceMangers/product/detail/index',
          },
          {
            name: '设备',
            path: '/deviceMangers/device/index',
            component: './deviceMangers/device/index',
          },
          {
            name: '设备详情',
            hideInMenu: true,
            path: '/deviceMangers/device/detail/:id/:name/:type',
            component: './deviceMangers/device/detail/index',
          },
          {
            name: '分组',
            path: '/deviceMangers/group/index',
            component: './deviceMangers/group/index',
          },
          {
            name: '分组详情',
            hideInMenu: true,
            path: '/deviceMangers/group/detail/:id',
            component: './deviceMangers/group/detail/index',
          },
        ],
      },
      {
        path: '/systemMangers',
        name: '系统管理',
        icon: 'icon_system',
        access: 'canAdmin',
        routes: [
          {
            name: '用户管理',
            path: '/systemMangers/user/index',
            component: './systemMangers/user/index',
          },
          {
            name: '角色管理',
            path: '/systemMangers/role/index',
            component: './systemMangers/role/index',
          },
          {
            name: '菜单管理',
            path: '/systemMangers/menu/index',
            component: './systemMangers/menu/index',
          },
          {
            name: '接口管理',
            path: '/systemMangers/api/index',
            component: './systemMangers/api/index',
          },
          {
            name: '日志管理',
            routes: [
              {
                name: '登录日志',
                path: '/systemMangers/log/loginLog/index',
                component: './systemMangers/log/loginLog/index',
              },
              {
                name: '操作日志',
                path: '/systemMangers/log/operationLog/index',
                component: './systemMangers/log/operationLog/index',
              },
            ],
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/operationsMonitorings',
        name: '运维监控',
        icon: 'icon_system',
        routes: [
          {
            name: '在线调试',
            path: '/operationsMonitorings/onlineDebugs/index',
            component: './operationsMonitorings/onlineDebug/index',
          },
          {
            name: '日志服务',
            path: '/operationsMonitorings/logService/index',
            component: './operationsMonitorings/logService/index',
          },
          {
            name: '远程配置',
            path: '/operationsMonitorings/remoteConfiguration/index',
            component: './operationsMonitorings/remoteConfiguration/index',
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/',
        redirect: '/deviceMangers/product/index',
      },
      {
        component: '404',
      },
    ],
  },
  {
    layout: false,
    name: '404',
    path: '/*',
    component: '404',
  },
];
