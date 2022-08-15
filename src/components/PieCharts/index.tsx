import { Pie } from "@ant-design/plots";
import { Col, Empty, Row } from "antd";
import React from "react";

interface chartsProps {
  config: any;
}

const PieCharts: React.FC<chartsProps> = (props: chartsProps) => {
  const { config } = props;

  // 根据 props 来请求数据
  const originConfig = {
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };

  const mergeConfig = { ...originConfig, ...config };

  return (
    <div>
      <Row>
        <Col span={24}>
          {mergeConfig?.data?.length == 0 ? (
            <Empty />
          ) : (
            <Pie {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(PieCharts);
