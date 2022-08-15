/* eslint-disable react-hooks/exhaustive-deps */
import { Column } from "@ant-design/plots";
import { Empty } from "antd";
import React from "react";
import style from "./style.less";

interface chartsProps {
  config: any;
  isDashbord?: boolean;
}

const ColumnCharts: React.FC<chartsProps> = (props: chartsProps) => {
  const { config, isDashbord } = props;

  console.log("2");

  // 根据 props 来请求数据
  const originConfig = {
    autoFit: true,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
  };

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
      {mergeConfig?.data?.length == 0 ? <Empty /> : <Column {...mergeConfig} />}
    </div>
  );
};

export default React.memo(ColumnCharts);
