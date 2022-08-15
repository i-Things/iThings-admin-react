/* eslint-disable react-hooks/exhaustive-deps */
import { Gauge } from "@ant-design/plots";
import { Col, Empty, Row } from "antd";
import React from "react";

interface chartsProps {
  config: any;
}

const GaugeCharts: React.FC<chartsProps> = (props: chartsProps) => {
  const { config } = props;

  // 根据 props 来请求数据
  const originConfig = {
    percent: 0.75,
    type: "meter",
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: "36px",
          lineHeight: "36px",
        },
      },
    },
  };

  const mergeConfig = { ...originConfig, ...config };

  return (
    <div style={{ marginBottom: 30 }}>
      <Row>
        <Col span={24}>
          {mergeConfig?.data?.length == 0 ? (
            <Empty />
          ) : (
            <Gauge {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(GaugeCharts);
