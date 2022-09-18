import DeviceList from '@/pages/device/info';
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
