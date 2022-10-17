import { GITHUB_WEBSITE } from '@/utils/const';
import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import logo from '../../../public/icons/github.png';
import Avatar from './AvatarDropdown';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <span className={styles.action}>
        <a href={GITHUB_WEBSITE} target="_blank" rel="noreferrer">
          <img
            src={logo}
            alt=""
            style={{
              width: 25,
              height: 25,
              marginBottom: 3,
            }}
          />
        </a>
      </span>
      <Avatar menu />
    </Space>
  );
};

export default GlobalHeaderRight;
