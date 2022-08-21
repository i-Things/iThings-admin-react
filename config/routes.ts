export default [
  {
    path: "/user",
    // component: "../layouts/BlankLayout",
    routes: [
      {
        path: "/user/login",
        layout: false,
        name: "login",
        component: "./user/Login",
      },
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        component: "404",
      },
    ],
  },
  {
    path: "/",
    component: "../layouts/BasicLayout",
    layout: false,
    routes: [
      {
        path: "/device",
        name: "设备管理",
        hideInMenu: true,
        icon: "dashboard",
        routes: [
          {
            name: "设备管理",
            path: "/device/index",
            component: "./device/index",
          },
          {
            name: "设备详情",
            path: "/device/detail/:id/:name",
            hideInMenu: true,
            component: "./device/detail",
          },
        ],
      },
      {
        path: "/sys-device",
        name: "设备管理",
        icon: "icon_device",
        routes: [
          {
            name: "型号管理",
            routes: [
              {
                path: "/sys-device/gateway",
                name: "网关管理",
                routes: [
                  {
                    name: "新增网关",
                    hideInMenu: true,
                    path: "/sys-device/gateway/create",
                    component: "./sys-device/gateway/create",
                  },
                  {
                    name: "修改网关",
                    hideInMenu: true,
                    path: "/sys-device/gateway/update",
                    component: "./sys-device/gateway/update",
                  },
                  {
                    name: "绑定网关模型",
                    hideInMenu: true,
                    path: "/sys-device/gateway/schema/bind",
                    component: "./sys-device/gateway/schema/bind",
                  },
                  {
                    name: "获取网关模型列表",
                    hideInMenu: true,
                    path: "/sys-device/gateway/schema/index",
                    component: "./sys-device/gateway/schema/index",
                  },
                  {
                    name: "获取网关列表",
                    path: "/sys-device/gateway/index",
                    component: "./sys-device/gateway/index",
                  },
                ],
              },
              {
                path: "/sys-device/device",
                name: "设备管理",
                routes: [
                  {
                    name: "新增设备",
                    hideInMenu: true,
                    path: "/sys-device/device/create",
                    component: "./sys-device/device/create",
                  },
                  {
                    name: "修改设备",
                    hideInMenu: true,
                    path: "/sys-device/device/update",
                    component: "./sys-device/device/update",
                  },
                  {
                    name: "获取设备模型",
                    hideInMenu: true,
                    path: "/sys-device/device/schema/read/:id/:name",
                    component: "./sys-device/device/schema/read",
                  },
                  {
                    name: "获取设备列表",
                    path: "/sys-device/device/index",
                    component: "./sys-device/device/index",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/sys-things",
        name: "物模型管理",
        icon: "icon_ithings",
        routes: [
          {
            name: "产品管理",
            routes: [
              {
                name: "产品列表",
                path: "/sys-things/product/info/index",
                component: "./sys-things/product/info/index",
              },
              {
                name: "新增产品",
                hideInMenu: true,
                path: "/sys-things/product/info/create",
                component: "./sys-things/product/info/create",
              },
              {
                name: "设备列表",
                path: "/sys-things/device/info/index",
                component: "./sys-things/device/info/index",
              },
              {
                name: "更新产品",
                hideInMenu: true,
                path: "/sys-things/product/info/update/:id",
                component: "./sys-things/product/info/update",
              },
              {
                name: "获取产品详情",
                hideInMenu: true,
                path: "/sys-things/product/info/read/:id",
                component: "./sys-things/product/info/read",
              },
              {
                name: "获取设备详情",
                hideInMenu: true,
                path: "/sys-things/device/info/read/:id/:name",
                component: "./sys-things/device/info/read",
              },

              {
                path: "/sys-things/device",
                name: "产品详情",
                hideInMenu: true,
                routes: [
                  {
                    name: "编辑物模型",
                    path: "/sys-things/product/schema/update",
                    component: "./sys-things/product/schema/update",
                  },
                  {
                    name: "获取物模型",
                    path: "/sys-things/product/schema/read",
                    component: "./sys-things/product/schema/read",
                  },

                  {
                    name: "获取设备列表",
                    hideInMenu: true,
                    path: "/sys-things/device/info/index/:id",
                    component: "./sys-things/device/info/index",
                  },
                ],
              },
            ],
          },
          {
            name: "设备管理",
            hideInMenu: true,
            routes: [
              {
                path: "/sys-things/device",
                name: "设备列表",
                routes: [
                  {
                    name: "设备列表",
                    path: "/sys-things/device/info/index",
                    component: "./sys-things/device/info/index",
                  },
                  {
                    name: "新增产品",
                    path: "/sys-things/device/info/create",
                    component: "./sys-things/device/info/create",
                  },
                  {
                    name: "更新产品",
                    path: "/sys-things/device/info/update",
                    component: "./sys-things/device/info/update",
                  },
                ],
              },
              {
                path: "/sys-device/device",
                name: "设备详情",
                routes: [
                  {
                    name: "设备物模型记录",
                    path: "/sys-things/data/schema-log",
                    component: "./sys-things/data/schema-log",
                  },
                  {
                    name: "设备sdk日志",
                    path: "/sys-things/data/sdk-log",
                    component: "./sys-things/data/sdk-log",
                  },
                  {
                    name: "设备云端诊断日志",
                    path: "/sys-things/data/hub-log",
                    component: "./sys-things/data/hub-log",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/systerm-manager",
        name: "系统管理",
        icon: "icon_system",
        routes: [
          {
            name: "用户管理",
            path: "/systerm-manager/user",
            component: "./systerm/user",
          },
          {
            name: "产品品类管理",
            path: "/systerm-manager/product",
            component: "./systerm/product",
          },
        ],
      },
      {
        name: "设备详情",
        path: "/device/detail/:id/:name",
        hideInMenu: true,
        component: "./device/detail",
      },
      {
        path: "/product-manager",
        name: "产品管理",
        hideInMenu: true,
        icon: "dashboard",
        routes: [
          {
            name: "物模型",
            path: "/product-manager/thing",
            component: "./product",
          },
          {
            name: "新增物模型",
            path: "/product-manager/thing/create",
            component: "./product/create",
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/',
        redirect: '/sys-things/product/info/index'
      },
      {
        component: "404",
      },
    ],
  },
]