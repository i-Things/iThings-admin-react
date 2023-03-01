import { postApiV1ThingsDeviceInfoCount } from '@/services/iThingsapi/shebeiguanli';
import { useRequest } from 'ahooks';
import { Card, Col, message, Row } from 'antd';
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
    <Card>
      <Row gutter={26}>
        <Col span={14}>
          <DeviceMap />
        </Col>
        <Col span={10}>
          <div style={{ height: '70vh' }}>
            <DeviceCount data={data?.data} deviceTotal={deviceTotal} />
            <DeviceChart data={data?.data} />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default IndexPage;
