import RightContent from '@/components/RightContent';
import { IconMap } from '@/utils/iconMap';
import { ProLayout } from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React from 'react';
import { Link } from 'umi';
import defaultSettings from '../../config/defaultSettings';
moment.locale('zh-cn');

const BasicLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <ProLayout
      siderWidth={250}
      rightContentRender={() => <RightContent />}
      disableContentMargin={false}
      footerRender={false}
      menuItemRender={(menuItemProps, defaultDom: any) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return (
            // @ts-ignore
            <Link to={menuItemProps.path ? menuItemProps.path : '#'}>{defaultDom}</Link>
          );
        }
        if (menuItemProps.pro_layout_parentKeys.length < 2) {
          // @ts-ignore
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        } else {
          return (
            // @ts-ignore
            <Link to={menuItemProps.path}>
              {menuItemProps.icon}
              {defaultDom}
            </Link>
          );
        }
      }}
      subMenuItemRender={(TWTProps, defaultDom) => {
        return (
          <>
            <div>{defaultDom}</div>
          </>
        );
      }}
      menuDataRender={(menuData) => {
        return menuData.map((item) => {
          return {
            ...item,
            icon: (
              <img
                src={IconMap[item.icon as string]}
                alt=""
                style={{
                  width: 14,
                  height: 14,
                  marginRight: 5,
                  marginBottom: 5,
                }}
              />
            ),
          };
        });
      }}
      collapsedButtonRender={false}
      {...props}
      {...defaultSettings}
    >
      <div>
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
      </div>
    </ProLayout>
  );
};

export default BasicLayout;
