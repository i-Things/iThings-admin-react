import { LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Menu, Spin } from 'antd';
import queryString from 'query-string';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const defaultImgUrl =
  'https://p26-passport.byteacctimg.com/img/user-avatar/d7e592d60c58f00ecb4957f1de203dfa~300x300.image';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const query = queryString.parse(history.location.search);
  const { redirect } = query as {
    redirect: string;
  };
  const { pathname } = history.location;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({}) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        localStorage.clear();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser?.userInfo?.nickName) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          // src={currentUser.headImgUrl || defaultImgUrl}
          src={defaultImgUrl}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser?.userInfo?.nickName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
