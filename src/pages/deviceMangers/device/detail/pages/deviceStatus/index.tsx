import { Card } from 'antd';
import DeviceActPage from './pages/deviceAct';
import DevicePropsPage from './pages/deviceProps';

import '../../index.less';

const DeviceStatusPage: React.FC<{ productID: string; deviceName: string }> = ({
  productID,
  deviceName,
}) => {
  return (
    <Card className="status-card">
      <DevicePropsPage productID={productID} deviceName={deviceName} />
      <DeviceActPage productID={productID} deviceName={deviceName} />
    </Card>
  );
};
export default DeviceStatusPage;
