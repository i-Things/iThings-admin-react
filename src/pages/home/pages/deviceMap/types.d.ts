import type { DEVICE_INFO } from '@/utils/const';

export interface DeviceListProps extends DEVICE_INFO {
  position: {
    longitude: number;
    latitude: number;
  };
  address: string;
  productName: string;
  value?: number[];
}
