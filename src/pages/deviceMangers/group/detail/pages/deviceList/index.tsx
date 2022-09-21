/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DrawerForm } from '@ant-design/pro-form';
import React, { useState } from 'react';
import GroupDeviceList from '../../../components/GroupDeviceList';

const DeviceList: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const addDevice = () => {
    setDrawerVisible(true);
  };
  return (
    <>
      <GroupDeviceList flag="list" onAdd={addDevice} />
      <DrawerForm
        title="添加设备到分组"
        width={800}
        visible={drawerVisible}
        onVisibleChange={setDrawerVisible}
        drawerProps={{
          destroyOnClose: true,
        }}
        submitTimeout={2000}
        onFinish={async () => {
          console.log('111');
          // 不返回不会关闭弹框
          return true;
        }}
      >
        <GroupDeviceList flag="create" />
      </DrawerForm>
    </>
  );
};

export default DeviceList;
