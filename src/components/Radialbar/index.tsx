// 玉珏图
import React from "react";
import { RadialBar } from "@ant-design/plots";
import { Col, Empty, Row } from "antd";
import { IRadialbarData, IRadialbarProps } from "./data";

// 计算圆圈最大角度
const calcMaxAngle = (data: IRadialbarData[], maxNum: number): number => {
  let max = 0;
  data.forEach((i) => {
    if (max < i["num"]) max = i["num"];
  });
  return max >= maxNum ? 360 : (max / maxNum) * 360;
};

const Radialbar: React.FC<IRadialbarProps> = ({
  data,
  maxNum = 100,
  formatter,
  config,
}) => {
  let angle = calcMaxAngle(data, maxNum);
  const defaultConfig = {
    data,
    xField: "name",
    yField: "num",
    maxAngle: angle,
    radius: 0.8,
    innerRadius: 0.2,
    barBackground: {},
  };
  if (formatter ) {
    defaultConfig["tooltip"] = {
      formatter: (datum: IRadialbarData) => {
        return {
          name: formatter,
          value: datum.num,
        };
      },
    };
  }

  const mergeConfig = { ...defaultConfig, ...config };

  return (
    <div style={{ marginBottom: 30 }}>
      <Row>
        <Col span={24}>
          {mergeConfig?.data?.length == 0 ? (
            <Empty />
          ) : (
            <RadialBar {...mergeConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Radialbar);
