import { Divider } from 'antd';
import styles from './index.less';

const FooterCom = () => {
  return (
    <div className={styles.footer}>
      <span style={{ marginRight: 4 }}>Powered by</span>
      <a
        href="https://github.com/i-Things"
        target="_blank"
        rel="noreferrer"
        className={styles['footer-link']}
      >
        iThings
      </a>
      <Divider type="vertical" />
      <a
        href="https://ithings.net.cn/"
        className={styles['footer-link']}
        target="_blank"
        rel="noreferrer"
      >
        昆明云物通科技有限公司
      </a>
    </div>
  );
};

export default FooterCom;
