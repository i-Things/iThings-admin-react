import { postApiV1ThingsDeviceInfoRead } from '@/services/iThingsapi/shebeiguanli';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Card, message } from 'antd';
import React, { useState } from 'react';
import type { DeviceInfo } from './data';
import BasicInfoPage from './pages/basicInfo';
import DevicePositionPage from './pages/devicePosition';
import LocalLogPage from './pages/localLog';
import TagsInfoPage from './pages/tagsInfo';

const DeviceInfoPage: React.FC = () => {
  const params = useParams() as { id: string; name: string };
  const { id = '', name = '' } = params;

  const [deviceInfo, setDeviceInfo] = useState<Partial<DeviceInfo>>(null!);

  const { refresh } = useRequest(postApiV1ThingsDeviceInfoRead, {
    defaultParams: [
      {
        productID: id,
        deviceName: name,
      },
    ],
    onSuccess: (result) => {
      setDeviceInfo(result.data);
    },
    onError: (error) => {
      message.error('获取设备信息错误:' + error.message);
    },
  });

  return (
    <Card>
      <BasicInfoPage deviceInfo={deviceInfo} refresh={refresh} />
      <TagsInfoPage deviceInfo={deviceInfo} refresh={refresh} />
      <LocalLogPage deviceInfo={deviceInfo} refresh={refresh} />
      <DevicePositionPage deviceInfo={deviceInfo} refresh={refresh} />
    </Card>
  );
};

export default DeviceInfoPage;
