/* eslint-disable @typescript-eslint/no-unused-expressions */
import useTableCreate from '@/hooks/useTableCreate';
import { postThingsGroupDeviceCreate } from '@/services/iThingsapi/shebeifenzu';
import { selectConfirm } from '@/utils/utils';
import { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'umi';
import GroupDeviceList from '../../../components/GroupDeviceList';
import type { GroupDeviceItem } from '../../../types';

const DeviceList: React.FC = () => {
  const { createHandler } = useTableCreate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);

  const param = useParams() as { id: string };
  const groupID = param.id ?? '';

  const actionListRef = useRef<ActionType>();
  const actionCreateRef = useRef<ActionType>();

  type CreateProp = typeof postThingsGroupDeviceCreate;

  const addDevice = () => setDrawerVisible(true);

  useEffect(() => {
    actionListRef.current?.reload();
  }, [drawerVisible]);

  return (
    <>
      <GroupDeviceList
        flag="list"
        onAdd={addDevice}
        selectedRowsState={selectedRowsState}
        setSelectedRows={setSelectedRows}
        actionRef={actionListRef}
        drawerVisible={drawerVisible}
      />
      <DrawerForm
        title="添加设备到分组"
        width={1000}
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
            actionCreateRef,
            body,
          );
          setSelectedRows([]);
          return true;
        }}
      >
        {drawerVisible && (
          <GroupDeviceList
            flag="create"
            selectedRowsState={selectedRowsState}
            setSelectedRows={setSelectedRows}
            actionRef={actionCreateRef}
            drawerVisible={drawerVisible}
          />
        )}
      </DrawerForm>
    </>
  );
};

export default DeviceList;
