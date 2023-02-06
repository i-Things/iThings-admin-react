import DeviceList from '@/pages/deviceMangers/device/components/deviceList';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import DeviceStatic from './components/deviceStatic';

const IndexPage: React.FC = () => {
  return (
    <PageContainer title={<DeviceStatic />}>
      <DeviceList />
    </PageContainer>
  );
};

export default IndexPage;
