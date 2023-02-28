import { Col, Row, Typography } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import type { DeviceStatic } from '../../data';
import getChartsOption from './getChartsOption';
import styles from './index.less';

const { Title } = Typography;
interface DeviceChartProps {
  data?: DeviceStatic;
}

const DeviceChart: React.FC<DeviceChartProps> = ({ data }) => {
  const deviceTypeOptions = useMemo(() => {
    const deviceTypeData = [
      {
        name: '设备类型',
        value: data?.deviceTypeCount.device || 0,
      },
      {
        name: '网关类型',
        value: data?.deviceTypeCount.gateway || 0,
      },
      {
        name: '子设备类型数量',
        value: data?.deviceTypeCount.subset || 0,
      },
    ];
    return getChartsOption(deviceTypeData, [
      'rgba(0, 136, 255, 0.8)',
      'rgba(0, 179, 84, 0.8)',
      'rgba(255, 183, 0, 0.8)',
    ]);
  }, [data?.deviceTypeCount]);

  const deviceOnlineOptions = useMemo(() => {
    const deviceOnlineData = [
      {
        name: '在线设备',
        value: data?.deviceCount.online || 0,
      },
      {
        name: '离线设备',
        value: data?.deviceCount.offline || 0,
      },
    ];
    return getChartsOption(deviceOnlineData, ['#33C35E', '#AAB3B3']);
  }, [data?.deviceCount]);

  return (
    <Row gutter={20}>
      <Col span={12}>
        <div className={styles['charts-wrapper']}>
          <Title level={4} ellipsis>
            设备接入类型
          </Title>
          <div style={{ height: '100%' }}>
            {data && <ReactECharts option={deviceTypeOptions} style={{ height: '100%' }} />}
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className={styles['charts-wrapper']}>
          <Title level={4} ellipsis>
            设备在线率
          </Title>
          <div style={{ height: '100%' }}>
            {data && <ReactECharts option={deviceOnlineOptions} style={{ height: '100%' }} />}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DeviceChart;
