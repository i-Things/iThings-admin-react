import type { DEVICE_INFO } from '@/utils/const';

export interface DeviceListProps extends DEVICE_INFO {
  longitude: number;
  latitude: number;
  deviceAddress: string;
  productName: string;
  value?: number[];
}
