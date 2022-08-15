import RightContent from "@/components/RightContent";
import { IconMap } from "@/utils/iconMap";
import { ProLayout } from "@ant-design/pro-layout";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN"; // 引入语言包
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { history, Link } from "umi";
import styles from "./BasicLayout.less";
moment.locale("zh-cn"); // 注意这里设置 moment 必须放在有 import 的后面。

const BasicLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <ProLayout
      siderWidth={250}
      rightContentRender={() => <RightContent />}
      disableContentMargin={false}
      footerRender={false}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          menuItemProps.children ||
          !menuItemProps.path
        ) {
          return (
            <Link to={menuItemProps.path ? menuItemProps.path : "#"}>
              {defaultDom}
            </Link>
          );
        }
        if (menuItemProps.pro_layout_parentKeys.length < 2) {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        } else {
          return (
            <Link to={menuItemProps.path}>
              {menuItemProps.icon}
              {defaultDom}
            </Link>
          );
        }
      }}
      subMenuItemRender={(TWTProps, defaultDom) => {
        return (
          /*  */
          <>
            <div className={styles.firstMenuWrap}>{defaultDom}</div>
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
      menuHeaderRender={() => (
        <div
          style={{ backgroundColor: "#2750be", margin: "0 auto" }}
          onClick={() => {
            history.push("/");
          }}
        >
        </div>
      )}
      menuProps={{
        style: {
          height: "100vh",
          overflow: "scroll",
          backgroundColor: "#2750be",
          scrollbarWidth: "none",
        },
      }}
      collapsedButtonRender={false}
      {...props}
    >
      <div className={styles.ScreenAdapter}>
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
      </div>
    </ProLayout>
  );
};

export default BasicLayout;
