import styles from '@/pages/user/Login/index.less';
import { history } from '@umijs/max';
import { Button, Col, Row } from 'antd';
import React from 'react';
import wechat from '../../public/icons/godLei6-wechat.jpg';
import logo from '../../public/icons/logo/Group.png';
const NoFoundPage: React.FC = () => (
  <div className={styles.container}>
    <Row align="middle">
      <img width={36} height={36} src={logo} />
      <div className={styles.title}>iThings</div>
    </Row>
    <Row className={styles['row-content']}>
      <Col flex="auto">
        <div className={styles.content}>
          <h1 style={{ fontSize: '50px' }}>404</h1>
          <h2>该功能正在开发中</h2>
          <h3>可以添加我的微信(godLei6)加微信群关注实时进展</h3>
          <img width={450} height={450} src={wechat} />
          <Button type="primary" onClick={() => history.push('/')}>
            回到首页
          </Button>
        </div>
      </Col>
    </Row>
  </div>

  // <Result
  //   status="404"
  //   title="404"
  //   subTitle="该功能正在开发中,可以添加我的微信(godLei6)加微信群关注实时进展"
  //   icon={<img
  //     src={logo}
  //     alt=""
  //     style={{
  //       width: 20,
  //       height: 20,
  //       marginTop: 20,
  //     }}
  //   />}
  //   extra={
  //     <Button type="primary" onClick={() => history.push('/')}>
  //       回到首页
  //     </Button>
  //   }
  // />
);

export default NoFoundPage;
