import React from "react";
import { Col, Empty, Row } from "antd";
import { Area } from "@ant-design/plots";

interface areanProps {
  config: any;
}

const AreanCharts: React.FC<areanProps> = (props: areanProps) => {
  const { config } = props;

  const mConfig = {
    xField: "time",
    yField: "value",
    xAxis: {
      range: [0, 1],
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
            <Area {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(AreanCharts);
