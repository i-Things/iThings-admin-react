# iThings 的后台前端

iThings 的后台前端项目是一个基于 Antd Pro 组件风格，使用 umi 脚手架搭建的系统级前端项目。

## 环境准备

安装 `node_modules`:

```bash
yarn
```

## 脚本命令

前端项目提供一些脚本命令可以用来启动项目、项目打包、检查代码风格、规范和单元测试。所有脚本命令统一放置在 `package.json` 文件中，这对于修改或者添加其他脚本命令来说十分简单和安全。

### 启动项目

```bash
// 使用 mock 接口
yarn start
```

```bash
// 不使用 mock 接口
yarn dev
```

### 项目打包

```bash
yarn build
```

### 检查代码风格、规范

```bash
yarn lint
```

你也可以用下面的命令进行修复:

```bash
yarn lint:fix
```

### 单元测试

```bash
yarn test
```

## 更多

## 文件命名规范

- 推荐：React 组件的文件夹命名都是大驼峰+ 单数，其他文件夹都是小驼峰+ 复数。
- 推荐：文件命名都是小驼峰，单复数看情形。
- 推荐：方法名都是小驼峰，单复数看情形。
- 推荐：变量名除常量外都是小驼峰，单复数看情形。
- 推荐：常量名都是全大写字母+ 下划线分隔，单复数看情形。

## 目录结构

```md
├── README.md // 项目介绍
├── config // 配置文件夹
│   ├── config.dev.ts //开发时配置
│   ├── config.ts // 基本配置
│   ├── defaultSettings.ts // 默认设置
│   ├── iThingsapi.json // openApi导出的JSON
│   ├── proxy.ts // 本地开发时代理配置
│   └── routes.ts // 路由表
├── deploy.sh // 部署脚本
├── jest.config.js // 单元测试相关
├── jsconfig.json // 单元测试相关
├── mock // 本地 mock 文件夹
│   └── user.ts
├── package.json // 依赖
├── public // 公共资源目录
│   ├── CNAME
│   ├── favicon.ico
│   ├── favicon.png
│   ├── icons
│   │   ├── icon-128x128.png
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.png
│   │   ├── icon_data_01.png
│   │   └── logo.png
│   └── pro_icon.svg
├── src // 主文件夹
│   ├── access.ts // plugin-access 插件依赖文件
│   ├── app.tsx // 应用入口
│   ├── assets // 静态资源
│   │   ├── icons
│   │   └── img
│   ├── components // 公共组件目录
│   │   ├── Footer
│   │   ├── HeaderDropdown
│   │   └── RightContent
│   ├── global.less
│   ├── global.tsx
│   ├── hooks // 自定义 hook 文件夹
│   │   ├── useTitle.ts
│   ├── layouts // 布局组件
│   │   ├── BasicLayout.tsx
│   │   └── BlankLayout.tsx
│   ├── manifest.json
│   ├── pages // 页面文件夹
│   │   ├── 404.tsx
│   │   ├── Admin.tsx
│   │   ├── Welcome.less
│   │   ├── Welcome.tsx
│   │   ├── device // 设备模块
│   │   ├── document.ejs
│   │   ├── product // 产品模块
│   │   └── user // 用户登录模块
│   ├── service-worker.js
│   ├── services // 由 openApi 生成的异步请求文件，使用方法见 pages/user
│   │   └── iThingsapi
│   ├── typings.d.ts // 类型声明
│   └── utils // 工具方法目录
│       ├── const.ts // 常量表
│       ├── date.ts // 时间|日期相关方法
│       ├── iconMap.ts // 菜单图表对应Map
│       ├── request.ts // 封装的请求相关
│       └── utils.ts // 常规工具方法
├── tests // 单元测试相关
│   ├── PuppeteerEnvironment.js
│   ├── beforeTest.js
│   ├── getBrowser.js
│   ├── run-tests.js
│   └── setupTests.js
├── tsconfig.json // ts 配置文件
├── types // 全局类型声明文件
│   ├── base.ts
│   ├── postcss-px2viewport.d.ts
│   └── userInfo
│       ├── data.d.ts
│       └── service.ts
├── yarn-error.log
└── yarn.lock
```
