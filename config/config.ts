import { join } from 'path';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  /*
    front/iThingsCore/    iThings核心前端路由
    front/iThingsCompany/  iThings企业版前端路由
    front/custom/chengde/  企业版定制版前端路由
  */
  publicPath: '/front/iThingsCore/',
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import  request  from '@/utils/request'",
      schemaPath: join(__dirname, 'iThingsapi.json'),
      mock: false,
      projectName: 'iThingsapi',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
