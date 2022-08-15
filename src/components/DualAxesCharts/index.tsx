/* eslint-disable react-hooks/exhaustive-deps */
import { DualAxes } from "@ant-design/plots";
import { Col, Empty, Row } from "antd";
import React from "react";

interface chartsProps {
  config: any;
}

const DualAxesCharts: React.FC<chartsProps> = (props: chartsProps) => {
  const { config } = props;

  // 根据 props 来请求数据
  const originConfig = {
    xField: "time",
    yField: ["value", "count"],
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };

  const mergeConfig = { ...originConfig, ...config };

  return (
    <div style={{ marginBottom: 30 }}>
      <Row>
        <Col span={24}>
          {mergeConfig?.data?.length == 0 ? (
            <Empty />
          ) : (
            <DualAxes {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(DualAxesCharts);
