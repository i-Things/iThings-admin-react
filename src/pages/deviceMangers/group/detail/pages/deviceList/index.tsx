/* eslint-disable @typescript-eslint/no-unused-expressions */
import useTableCreate from '@/hooks/useTableCreate';
import { postThingsGroupDeviceCreate } from '@/services/iThingsapi/shebeifenzu';
import { selectConfirm } from '@/utils/utils';
import { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { useParams } from 'umi';
import GroupDeviceList from '../../../components/GroupDeviceList';
import type { GroupDeviceItem } from '../../../types';

const DeviceList: React.FC = () => {
  const { createHandler } = useTableCreate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);

  const param = useParams() as { id: string };
  const groupID = param.id ?? '';

  const actionRef = useRef<ActionType>();

  type CreateProp = typeof postThingsGroupDeviceCreate;

  const addDevice = () => setDrawerVisible(true);

  return (
    <>
      <GroupDeviceList
        flag="list"
        onAdd={addDevice}
        selectedRowsState={selectedRowsState}
        setSelectedRows={setSelectedRows}
        actionRef={actionRef}
      />
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
          const list = selectConfirm(selectedRowsState);
          const body = {
            groupID,
            list,
          };
          await createHandler<CreateProp, GroupDeviceItem>(
            postThingsGroupDeviceCreate,
            actionRef,
            body,
          );
          setSelectedRows([]);
          return true;
        }}
      >
        <GroupDeviceList
          flag="create"
          selectedRowsState={selectedRowsState}
          setSelectedRows={setSelectedRows}
          actionRef={actionRef}
        />
      </DrawerForm>
    </>
  );
};

export default DeviceList;
