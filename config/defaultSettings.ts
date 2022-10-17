import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#2F54EB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
  title: 'iThings',
  headerHeight: 48,
  iconfontUrl: '',
  splitMenus: false,
};

export default Settings;
