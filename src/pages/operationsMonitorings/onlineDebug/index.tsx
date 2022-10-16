import OnlineDebugPage from '@/pages/deviceMangers/device/detail/pages/onlineDebug';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import Filter from './components/filter';
import type { ProductParams } from './data';

const OnlineDebug = () => {
  const [params, setParams] = useState<ProductParams>(null!);

  const changeParams = (value: ProductParams) => {
    setParams((val) => ({
      ...val,
      ...value,
    }));
  };

  return (
    <PageContainer>
      <Filter params={params} changeParams={changeParams} />
      <OnlineDebugPage productID={params?.productID || ''} deviceName={params?.deviceName || ''} />
    </PageContainer>
  );
};

export default OnlineDebug;
