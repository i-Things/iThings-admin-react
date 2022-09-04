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
        path: '/deviceMangers',
        name: '设备管理',
        icon: 'icon_data_01',
        routes: [
          {
            name: '产品',
            path: '/deviceMangers/products/index',
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
            path: '/deviceMangers/devices/index',
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
            path: '/systemManagers/users/index',
            component: './systemManagers/users/index',
          },
          {
            name: '角色管理',
            path: '/systemManagers/roles/index',
            component: './systemManagers/roles/index',
          },
          {
            name: '菜单管理',
            path: '/systemManagers/menus/index',
            component: './systemManagers/menus/index',
          },
        ],
      },
      {
        path: '/',
        redirect: '/systemManagers/users/index',
      },
      {
        component: '404',
      },
    ],
  },
];
