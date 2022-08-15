import React from "react";
import { Col, Empty, Row } from "antd";
import { Bar } from "@ant-design/plots";

interface barProps {
  config: any;
}

const BarCharts: React.FC<barProps> = (props: barProps) => {
  const { config } = props;

  const mConfig = {
    xField: "type",
    yField: "value",
  };

  const mergeConfig = { ...mConfig, ...config };

  return (
    <div style={{ marginBottom: 30 }}>
      <Row>
        <Col span={24}>
          {mergeConfig?.data?.length == 0 ? (
            <Empty />
          ) : (
            <Bar {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(BarCharts);
