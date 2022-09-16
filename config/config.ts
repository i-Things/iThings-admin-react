import { join } from 'path';
import px2viewport from 'postcss-px2viewport';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const path = require('path');
const packageName = require('../package.json').name;

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  extraPostCSSPlugins: [px2viewport({ viewportWidth: 1920 })],
  hash: true,
  antd: {},
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
