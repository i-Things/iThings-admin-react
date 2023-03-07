import { Badge, Card, Col, List, Row, Space, Statistic } from 'antd';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import './index.less';

import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import type { PieSeriesOption } from 'echarts/charts';
import type {
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from 'echarts/components';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  TooltipComponent,
  GridComponent,
  UniversalTransition,
  TitleComponent,
]);

type PieEChartsOption = echarts.ComposeOption<
  TooltipComponentOption | PieSeriesOption | GridComponentOption
>;

type LineEChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption
>;

const DeviceDemo = () => {
  const average = 99,
    total = 100;
  const pieOption: PieEChartsOption = {
    title: {
      text: average,
      x: 'center',
      y: 'center',
      top: '38%',
      textStyle: {
        color: '#26b99a',
      },
    },
    series: [
      {
        name: '总电量',
        type: 'pie',
        radius: ['70%', '72%'],
        //环的位置
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: 100, //需要显示的数据
            name: '总电量',
            itemStyle: {
              color: '#26b99a',
            },
          },
        ],
      },
      {
        name: '当前电量' + average + '%',
        type: 'pie',
        radius: ['38%', '67%'],
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            name: '当前电量' + average + '%',
            value: average,
            itemStyle: {
              color: '#26b99a',
            },
          },
          {
            value: total - average,
            itemStyle: {
              color: 'transparent',
            },
          },
        ],
      },
    ],
  };

  const lineOption: LineEChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['14:39:39', '14:40:40', '14:41:41', '14:42:42', '14:43:43'],
    },
    yAxis: {
      type: 'value',
      axisLine: { show: true },
      axisTick: { show: true },
      min: 0,
      max: 100,
      splitNumber: 10,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['温度', '湿度'],
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    series: [
      {
        name: '温度',
        type: 'line',
        data: [30, 30, 30, 30, 30],
      },
      {
        name: '湿度',
        type: 'line',
        data: [70, 70, 70, 70, 70],
      },
    ],
  };
  const data = [
    {
      key: 1,
      icon: <UserOutlined />,
      title: '产品ID',
      desc: '254pwnKQsvK',
    },
    {
      key: 2,
      icon: <DashboardOutlined />,
      title: '设备类型',
      desc: '温湿度传感器',
    },
    {
      key: 3,
      icon: <UserOutlined />,
      title: '通道数',
      desc: 2,
    },
    {
      key: 4,
      icon: <UserOutlined />,
      title: '采集类型',
      desc: '温度/湿度',
    },
    {
      key: 5,
      icon: <UserOutlined />,
      title: '工作类型',
      desc: '周期采集',
    },
    {
      key: 6,
      icon: <UserOutlined />,
      title: '状态',
      desc: 'ONLINE',
    },
  ];

  const deviceData = [
    {
      key: 1,
      icon: <UserOutlined />,
      title: '湿度',
      desc: '71%RH',
      color: 'blue',
    },
    {
      key: 2,
      icon: <UserOutlined />,
      title: (
        <div className="alarm-status">
          <UserOutlined />
          温度
        </div>
      ),
      desc: '29.7℃',
      color: 'green',
    },
    {
      key: 3,
      icon: <UserOutlined />,
      title: (
        <div className="alarm-status">
          <UserOutlined />
          信号强度
        </div>
      ),
      desc: '194dBm',
      color: 'blue',
    },
    {
      key: 4,
      icon: <UserOutlined />,
      title: (
        <div className="alarm-status">
          <UserOutlined />
          电池电量
        </div>
      ),
      desc: (
        <ReactEChartsCore
          echarts={echarts}
          option={pieOption}
          lazyUpdate={true}
          style={{ height: '100px' }}
        />
      ),
      color: 'green',
    },
  ];

  const alarmList = [
    {
      name: 'H',
      status: 1,
    },
    {
      name: 'T',
      status: 2,
    },
    {
      name: 'R',
      status: 1,
    },
  ];
  return (
    <div className="demo-wrapper">
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <List
          grid={{ column: 6 }}
          dataSource={data}
          renderItem={(item, index) => (
            <div style={index < 5 ? { borderRight: '1px solid black' } : {}}>
              <List.Item>
                <Statistic
                  title={
                    <>
                      <>{item.icon}</>
                      <>{item.title}</>
                    </>
                  }
                  value={item.desc}
                />
              </List.Item>
            </div>
          )}
        />
        <Card title="设备数据">
          <List
            grid={{ column: 4 }}
            dataSource={deviceData}
            renderItem={(item) => (
              <List.Item>
                <Row>
                  <Col flex={1}>
                    <div>{item.title}</div>
                  </Col>
                  <Col flex={3} />
                </Row>
                <Row>
                  <Col flex={2} />
                  <Col flex={2}>
                    <div style={{ color: item.color, lineHeight: '80px', fontSize: '40px' }}>
                      {item.desc}
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
        <Row>
          <Col span={16}>
            <Card title="实时数据曲线" extra={<a>保存</a>}>
              <ReactEChartsCore
                echarts={echarts}
                option={lineOption}
                lazyUpdate={true}
                style={{ height: '30vh' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="实时告警">
              <div style={{ height: '30vh' }}>
                {alarmList.map((item) => (
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ display: 'flex' }}
                    key={item.name}
                  >
                    <Row>
                      <Col span={6}>
                        <div className="alarm-status">
                          <Badge color={item.status == 1 ? '#26b99a' : 'red'} text={item.name} />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="alarm-status">状态</div>
                      </Col>
                      <Col span={12}>
                        <div
                          style={{
                            color: item.status == 1 ? '#26b99a' : 'red',
                            textAlign: 'right',
                          }}
                          className="alarm-status"
                        >
                          {item.status == 1 ? '正常' : '告警'}
                        </div>
                      </Col>
                    </Row>
                  </Space>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default DeviceDemo;
