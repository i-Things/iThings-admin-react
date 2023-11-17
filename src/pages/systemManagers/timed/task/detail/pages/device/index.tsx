import DeviceList from '@/pages/deviceManagers/device/components/deviceList';
import type { PRODUCT_INFO } from '@/utils/const';
import React from 'react';

interface Props {
  productInfo: PRODUCT_INFO;
}

const DevicePage: React.FC<Props> = ({ productInfo }) => {
  return <DeviceList productInfo={productInfo} />;
};

export default DevicePage;
