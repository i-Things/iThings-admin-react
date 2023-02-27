import { postApiV1ThingsDeviceInfoCount } from '@/services/iThingsapi/shebeiguanli';
import { useRequest } from 'ahooks';
import { Col, message, Row } from 'antd';
import { useMemo } from 'react';
import DeviceChart from './pages/deviceChart/index';
import DeviceCount from './pages/deviceCount/index';
import DeviceMap from './pages/deviceMap/index';

const IndexPage = () => {
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
    <div style={{ background: '#fff', padding: 24 }}>
      <Row gutter={20}>
        <Col span={15}>
          <DeviceMap />
        </Col>
        <Col span={9}>
          <div style={{ height: '70vh', boxSizing: 'border-box' }}>
            <DeviceCount data={data?.data} deviceTotal={deviceTotal} />
            <DeviceChart data={data?.data} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IndexPage;
