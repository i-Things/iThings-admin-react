import type { DeviceStatic } from '../../data';
import styles from './index.less';

interface DeviceCountProps {
  data?: DeviceStatic;
  deviceTotal: number;
}

/** 设备数量统计 */
const DeviceCount: React.FC<DeviceCountProps> = ({ data, deviceTotal }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div
        className={styles['static-item']}
        style={{ borderTop: '4px solid #08f', background: 'rgba(0, 136, 255, 0.1)' }}
      >
        <div>设备总数</div>
        <div className={styles.num} style={{ color: '#08f' }}>
          {deviceTotal}
        </div>
      </div>
      <div
        className={styles['static-item']}
        style={{ borderTop: '4px solid #FF401A', background: 'rgba(255, 64, 26, 0.1)' }}
      >
        <div>未激活设备</div>
        <div className={styles.num} style={{ color: '#ff401a' }}>
          {data?.deviceCount.inactive}
        </div>
      </div>
      <div
        className={styles['static-item']}
        style={{ borderTop: '4px solid #00B354', background: 'rgba(0, 179, 84, 0.1)' }}
      >
        <div>在线设备</div>
        <div className={styles.num} style={{ color: '#00b354' }}>
          {data?.deviceCount.online}
        </div>
      </div>
      <div
        className={styles['static-item']}
        style={{ borderTop: '4px solid #FFB700', background: 'rgba(255, 183, 0, 0.1)' }}
      >
        <div>离线设备</div>
        <div className={styles.num} style={{ color: '#FFB700' }}>
          {data?.deviceCount.offline}
        </div>
      </div>
    </div>
  );
};

export default DeviceCount;
