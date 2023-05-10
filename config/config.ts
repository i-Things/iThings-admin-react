import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  clientLoader: {},
  /*
    front/iThingsCore/    iThings核心前端路由
    front/iThingsCompany/  iThings企业版前端路由
    front/custom/chengde/  企业版定制版前端路由
  */
  publicPath: '/front/iThingsCore/',
  dva: {},
  // dynamicImport: {
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.colorPrimary,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  // esbuild: {},
  title: 'iThings',
  request: {},
  initialState: {},
  presets: ['umi-presets-pro'],
  model: {},
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: true,
  requestRecord: {},
  openAPI: [
    {
      requestLibPath: "import request from '@/utils/request'",
      schemaPath: join(__dirname, 'iThingsapi.json'),
      mock: false,
      projectName: 'iThingsapi',
    },
  ],
  mfsu: {},
  chainWebpack: (config: any, { env }) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: [
          'abap',
          'apex',
          'azcli',
          'bat',
          'bicep',
          'cameligo',
          'clojure',
          'coffee',
          'cpp',
          'csharp',
          'csp',
          'css',
          'dart',
          'dockerfile',
          'ecl',
          'elixir',
          'flow9',
          'fsharp',
          'go',
          'graphql',
          'handlebars',
          'hcl',
          'html',
          'ini',
          'java',
          'javascript',
          'json',
          'julia',
          'kotlin',
          'less',
          'lexon',
          'liquid',
          'lua',
          'm3',
          'markdown',
          'mips',
          'msdax',
          'mysql',
          'objective-c',
          'pascal',
          'pascaligo',
          'perl',
          'pgsql',
          'php',
          'pla',
          'postiats',
          'powerquery',
          'powershell',
          'protobuf',
          'pug',
          'python',
          'qsharp',
          'r',
          'razor',
          'redis',
          'redshift',
          'restructuredtext',
          'ruby',
          'rust',
          'sb',
          'scala',
          'scheme',
          'scss',
          'shell',
          'solidity',
          'sophia',
          'sparql',
          'sql',
          'st',
          'swift',
          'systemverilog',
          'tcl',
          'twig',
          'typescript',
          'vb',
          'xml',
          'yaml',
        ],
      },
    ]);
  },
});
