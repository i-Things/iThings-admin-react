import CloudLogPage from '@/pages/deviceMangers/device/detail/pages/cloudLog';
import DeviceCloudLogPage from '@/pages/deviceMangers/device/detail/pages/deviceCloudLog';
import DeviceLocalLogPage from '@/pages/deviceMangers/device/detail/pages/deviceLocalLog';

import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import { useState } from 'react';
import Filter from '../components/filterProduct';
import type { ProductParams } from '../data';

const { TabPane } = Tabs;

const LogService = () => {
  const [params, setParams] = useState<ProductParams>(null!);
  const [deviceIsChange, setDeviceIsChange] = useState(true);

  const changeParams = (value: ProductParams) => {
    setParams((val) => ({
      ...val,
      ...value,
    }));
  };

  const handleChangeDevice = () => {
    setDeviceIsChange((val) => !val);
  };

  return (
    <PageContainer>
      <Filter params={params} changeParams={changeParams} changeDevice={handleChangeDevice} />
      <Card>
        <Tabs defaultActiveKey="1" destroyInactiveTabPane>
          <TabPane tab="云端诊断日志" key="1">
            <CloudLogPage
              productID={params?.productID || ''}
              deviceName={params?.deviceName || ''}
              deviceIsChange={deviceIsChange}
            />
          </TabPane>
          <TabPane tab="设备云端日志" key="2">
            <DeviceCloudLogPage
              productID={params?.productID || ''}
              deviceName={params?.deviceName || ''}
              deviceIsChange={deviceIsChange}
            />
          </TabPane>
          <TabPane tab="设备本地日志" key="3">
            <DeviceLocalLogPage
              productID={params?.productID || ''}
              deviceName={params?.deviceName || ''}
              deviceIsChange={deviceIsChange}
            />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default LogService;
