import OnlineDebugPage from '@/pages/deviceMangers/device/detail/pages/onlineDebug';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import Filter from '../components/filterProduct';
import type { ProductParams } from '../data';

const OnlineDebug = () => {
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
      <OnlineDebugPage
        productID={params?.productID || ''}
        deviceName={params?.deviceName || ''}
        deviceIsChange={deviceIsChange}
      />
    </PageContainer>
  );
};

export default OnlineDebug;
