import { Card, Col, Row } from "antd";
import React from "react";
import styles from "./style.less";
const IndexPage: React.FC = () => {
  return (
    <Card>
      <Row>
        <Col span={24}>
          <div className={styles.global_fontTitle}>
            <span>产品品类管理</span>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default IndexPage;
