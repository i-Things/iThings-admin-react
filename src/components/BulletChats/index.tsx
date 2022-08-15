import React from "react";
import { Bullet } from "@ant-design/charts";
import { Col, Empty, Row } from "antd";

interface bulletProps {
  config: any;
}

const BulletChats: React.FC<bulletProps> = (props: bulletProps) => {
  const { config } = props;

  const mConfig = {
    rangeMax: 100,
    title: {
      visible: true,
    },
    description: {
      visible: true,
    },
  };
  const mergeConfig = { ...mConfig, ...config };

  return (
    <div style={{ marginBottom: 30 }}>
      <Row>
        <Col span={24}>
          {mergeConfig?.data?.length == 0 ? (
            <Empty />
          ) : (
            <Bullet {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(BulletChats);
