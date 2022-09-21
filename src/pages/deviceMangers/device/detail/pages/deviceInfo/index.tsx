import { postThingsDeviceInfoRead } from '@/services/iThingsapi/shebeiguanli';
import { useRequest } from 'ahooks';
import { Card, message } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'umi';
import type { DeviceInfo } from './data';
import BasicInfoPage from './pages/basicInfo';
import LocalLogPage from './pages/localLog';
import TagsInfoPage from './pages/tagsInfo';

const DeviceInfoPage: React.FC = () => {
  const params = useParams() as { id: string; name: string };
  const { id = '', name = '' } = params;

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(null!);

  const { refresh } = useRequest(postThingsDeviceInfoRead, {
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
      <BasicInfoPage deviceInfo={deviceInfo} />
      <TagsInfoPage deviceInfo={deviceInfo} refresh={refresh} />
      <LocalLogPage deviceInfo={deviceInfo} refresh={refresh} />
    </Card>
  );
};

export default DeviceInfoPage;
