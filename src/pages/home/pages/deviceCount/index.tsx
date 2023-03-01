import { Col, Row, Typography } from 'antd';

import type { DeviceStatic } from '../../data';
import styles from './index.less';

const { Title, Text } = Typography;
interface DeviceCountProps {
  data?: DeviceStatic;
  deviceTotal: number;
}

/** 设备数量统计 */
const DeviceCount: React.FC<DeviceCountProps> = ({ data, deviceTotal }) => {
  return (
    <div
      style={{
        padding: '0 20px 24px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        boxSizing: 'border-box',
      }}
    >
      <Title level={4}>设备统计</Title>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <div
            className={styles['static-item']}
            style={{
              borderTop: '4px solid #08f',
              background: 'rgba(0, 136, 255, 0.1)',
            }}
          >
            <Text ellipsis>设备总数</Text>
            <div className={styles.num} style={{ color: '#08f' }}>
              {deviceTotal}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className={styles['static-item']}
            style={{
              borderTop: '4px solid #FF401A',
              background: 'rgba(255, 64, 26, 0.1)',
            }}
          >
            <Text ellipsis>未激活设备</Text>
            <div className={styles.num} style={{ color: '#ff401a' }}>
              {data?.deviceCount.inactive}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className={styles['static-item']}
            style={{
              borderTop: '4px solid #00B354',
              background: 'rgba(0, 179, 84, 0.1)',
              borderRadius: '6px',
            }}
          >
            <Text ellipsis>在线设备</Text>
            <div className={styles.num} style={{ color: '#00b354' }}>
              {data?.deviceCount.online}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className={styles['static-item']}
            style={{
              borderTop: '4px solid #FFB700',
              background: 'rgba(255, 183, 0, 0.1)',
              borderRadius: '6px',
            }}
          >
            <Text ellipsis>离线设备</Text>
            <div className={styles.num} style={{ color: '#FFB700' }}>
              {data?.deviceCount.offline}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeviceCount;
