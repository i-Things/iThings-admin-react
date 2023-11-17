import { postApiV1ThingsDeviceInfoCount } from '@/services/iThingsapi/shebeiguanli';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useMemo } from 'react';
import styles from '../index.less';

const DeviceStatic = () => {
  /** 获取设备统计 */
  const { data } = useRequest(postApiV1ThingsDeviceInfoCount, {
    onError: (error) => {
      message.error('获取设备统计错误:' + error.message);
    },
  });

  const deviceTotal = useMemo(() => {
    return (
      (data?.data.deviceCount.unknown || 0) +
        (data?.data.deviceCount.inactive || 0) +
        (data?.data.deviceCount.offline || 0) +
        (data?.data.deviceCount.online || 0) || 0
    );
  }, [data?.data]);

  return (
    <div className={styles['static-wrapper']}>
      <div className={styles.title}>设备</div>

      <div className={styles['static-content']}>
        <div className={styles['static-item']}>
          <div>设备总数</div>
          <div className={styles.num}>{deviceTotal}</div>
        </div>
        <div className={styles['static-item']}>
          <div>
            <span className={styles['label-circle']} style={{ background: '#ff401a' }} />
            <span>未激活设备</span>
          </div>
          <div className={styles.num}>{data?.data.deviceCount.inactive}</div>
        </div>
        <div className={styles['static-item']}>
          <div>
            <span className={styles['label-circle']} style={{ background: '#00b354' }} />
            <span>当前在线</span>
          </div>
          <div className={styles.num}>{data?.data.deviceCount.online}</div>
        </div>
        <div className={styles['static-item']}>
          <div>
            <span className={styles['label-circle']} style={{ background: '#fadb14' }} />
            <span>当前离线</span>
          </div>
          <div className={styles.num}>{data?.data.deviceCount.offline}</div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatic;
