import { join } from "path";
import px2viewport from "postcss-px2viewport";
import { defineConfig } from "umi";
import defaultSettings from "./defaultSettings";
import proxy from "./proxy";
import routes from "./routes";

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  extraPostCSSPlugins: [px2viewport({ viewportWidth: 1920 })],
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    locale: true,
    siderWidth: 250,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: "@ant-design/pro-layout/es/PageLoading",
  },
  targets: {
    ie: 11,
  },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    "primary-color": defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || "dev"],
  manifest: {
    basePath: "/",
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import  request  from '@/utils/request'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, "fmcsapi.json"),
      mock: false,
      projectName: "fmcsapi",
    },
  ],
  nodeModulesTransform: {
    type: "none",
  },
  // mfsu: {},
  webpack5: {},
  exportStatic: {},
});
