import { Column } from "@ant-design/plots";
import { Col, Empty, Row } from "antd";
import React from "react";
import { IColumnChartsCfg } from "./data";

const ColumnCharts: React.FC<IColumnChartsCfg> = ({
  data,
  isGroup = false,
  config,
}) => {
  const { data: udata, xField, yField } = data;
  // console.log(data);
  const defaultConfig = {
    // yAxis:{ max: 400, tickCount: 20 },
    data: udata,
    xField: xField,
    yField: yField,
    isGroup: isGroup,
  };

  const mergeConfig = { ...defaultConfig, ...config };

  return (
    <div style={{ marginBottom: 30 }}>
      <Row>
        <Col span={24}>
          {mergeConfig?.data?.length == 0 ? (
            <Empty />
          ) : (
            <Column {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(ColumnCharts);
