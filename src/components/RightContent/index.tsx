import { GITHUB_WEBSITE, OFFICIAL_WEBSITE } from '@/utils/const';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import githubLogo from '../../../public/icons/github.png';
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
            src={githubLogo}
            alt=""
            style={{
              width: 25,
              height: 25,
              marginBottom: 3,
            }}
          />
        </a>
      </span>
      <span className={styles.action}>
        <a href={OFFICIAL_WEBSITE} target="_blank" rel="noreferrer">
          <QuestionCircleOutlined
          // style={{
          //   fontSize: 24,
          //   marginTop: 18,
          // }}
          />
        </a>
      </span>

      <Avatar menu />
    </Space>
  );
};

export default GlobalHeaderRight;
