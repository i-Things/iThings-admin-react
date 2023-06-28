import RightContent from '@/components/RightContent';
import { OFFICIAL_WEBSITE } from '@/utils/const';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { ProLayout } from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { useState } from 'react';
// @ts-ignore
import FooterCom from '@/components/FooterCom';
import { history, Outlet, useModel } from '@umijs/max';
import defaultSettings from '../../config/defaultSettings';
import logo from '../../public/icons/logo/Group.png';

moment.locale('zh-cn');

const BasicLayout: React.FC = (props) => {
  const { initialState } = useModel('@@initialState');
  const [pathname, setPathname] = useState('/welcome');
  const menuTree = initialState?.currentUser?.menuInfo;

  return (
    <ProLayout
      location={{
        pathname,
      }}
      title="iThings"
      siderWidth={250}
      rightContentRender={() => <RightContent />}
      footerRender={() => <FooterCom />}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || '/welcome');
            history.push(item.path ?? '/welcome');
          }}
        >
          {dom}
        </a>
      )}
      subMenuItemRender={(TWTProps: any, defaultDom: any) => {
        return (
          <>
            <div>{defaultDom}</div>
          </>
        );
      }}
      menuDataRender={() => menuTree as MenuDataItem[]}
      {...props}
      {...defaultSettings}
      logo={<img src={logo} alt="" />}
      onMenuHeaderClick={() => {
        window.open(OFFICIAL_WEBSITE);
      }}
    >
      <div>
        <ConfigProvider locale={zhCN}>
          <Outlet />
        </ConfigProvider>
      </div>
    </ProLayout>
  );
};

export default BasicLayout;
