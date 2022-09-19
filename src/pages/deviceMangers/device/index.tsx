import DeviceList from '@/pages/deviceMangers/device/components/deviceList';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const IndexPage: React.FC = () => {
  return (
    <PageContainer>
      <DeviceList />
    </PageContainer>
  );
};

export default IndexPage;
