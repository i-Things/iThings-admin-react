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
        path: '/deviceManger',
        name: '设备管理',
        icon: 'icon_data_01',
        routes: [
          {
            name: '产品',
            path: '/deviceManger/product/index',
            component: './product/index',
          },
          {
            name: '产品详情',
            hideInMenu: true,
            path: '/deviceManger/product/detail/:id',
            component: './product/detail/index',
          },
          {
            name: '设备',
            path: '/deviceManger/device/index',
            component: './device/index',
          },
          {
            name: '设备详情',
            hideInMenu: true,
            path: '/deviceManger/device/detail/:id',
            component: './device/detail/index',
          },
        ],
      },
      {
        path: '/systermManager',
        name: '系统管理',
        icon: 'icon_system',
        routes: [
          {
            name: '用户管理',
            path: '/systermManager/user',
            component: './system/User',
          },
          {
            name: '角色管理',

            path: '/systermManager/role',
            component: './system/Role',
          },
          // {
          //   name: '菜单列表',
          //   path: '/system/menu/list',
          //   component: './system/Menu',
          // },
        ],
      },
      {
        path: '/',
        redirect: '/deviceManger/product/index',
      },
      {
        component: '404',
      },
    ],
  },
];
