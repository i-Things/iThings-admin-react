/* eslint-disable react-hooks/exhaustive-deps */
import { Line } from "@ant-design/plots";
import { Empty } from "antd";
import React from "react";
import style from "./style.less";
interface chartsProps {
  config: any;
  isDashbord?: boolean;
}

const LineCharts: React.FC<chartsProps> = (props: chartsProps) => {
  const { config, isDashbord } = props;

  console.log("1");

  // 根据 props 来请求数据
  const originConfig = {
    padding: "auto",
    tooltip: {
      showMarkers: false,
      enterable: true,
    },
    yAxis: {
      label: {
        formatter: function formatter(v: string) {
          return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return "".concat(s, ",");
          });
        },
      },
    },
  };
  // 对数据进行处理
  if (config?.yField) {
    const key = config.yField;
    config.data.map((item: { [x: string]: any }) => {
      item[key] = Number(item[key]);
    });
  }

  const mergeConfig = { ...originConfig, ...config };

  return (
    <div
      className={isDashbord ? style.dashbord_charts_wrap : style.charts_wrap}
    >
      {mergeConfig?.data?.length == 0 ? <Empty /> : <Line {...mergeConfig} />}
    </div>
  );
};

export default React.memo(LineCharts);
