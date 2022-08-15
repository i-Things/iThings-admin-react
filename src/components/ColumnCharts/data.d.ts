export interface IColumnChartsData {
  data: Array<{ [key: string]: any }>;
  xField: string;
  yField: string;
}

export interface IColumnChartsCfg {
  data: any;
  isGroup?: boolean;
  config?: any;
}
