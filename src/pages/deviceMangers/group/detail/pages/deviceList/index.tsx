/* eslint-disable @typescript-eslint/no-unused-expressions */
import useTableCreate from '@/hooks/useTableCreate';
import { postApiV1ThingsGroupDeviceMultiCreate } from '@/services/iThingsapi/shebeifenzu';
import { selectConfirm } from '@/utils/utils';
import { DrawerForm } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { useParams } from '@umijs/max';
import React, { useEffect, useRef, useState } from 'react';
import GroupDeviceList from '../../../components/GroupDeviceList';
import type { activeKeyProps, GroupDeviceCreateProps, GroupDeviceItem } from '../../../types';

const DeviceList: React.FC<{ activeKey: activeKeyProps }> = ({ activeKey }) => {
  const { createHandler } = useTableCreate();
  const param = useParams() as { id: string };
  const groupID = param.id ?? '';
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState<GroupDeviceItem[]>([]);

  const actionListRef = useRef<ActionType>();
  const actionCreateRef = useRef<ActionType>();

  type CreateProp = typeof postApiV1ThingsGroupDeviceMultiCreate;

  const addDevice = () => setDrawerVisible(true);

  const selectedRowsHandler = (value: GroupDeviceItem[]) => setSelectedRows(value);

  const formSubmit = async () => {
    const list = selectConfirm(selectedRowsState);
    const body = {
      groupID,
      list,
    };
    await createHandler<CreateProp, GroupDeviceCreateProps>(
      postApiV1ThingsGroupDeviceMultiCreate,
      actionCreateRef,
      body,
    );
    selectedRowsHandler([]);
    return true;
  };

  useEffect(() => {
    if (activeKey === '2') actionListRef.current?.reload();
  }, [drawerVisible, activeKey]);

  return (
    <>
      <GroupDeviceList
        flag="list"
        onAdd={addDevice}
        actionRef={actionListRef}
        selectedRowsHandler={selectedRowsHandler}
        activeKey={activeKey}
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
        onFinish={formSubmit}
      >
        {drawerVisible && (
          <GroupDeviceList
            flag="create"
            actionRef={actionCreateRef}
            selectedRowsHandler={selectedRowsHandler}
            activeKey={activeKey}
          />
        )}
      </DrawerForm>
    </>
  );
};

export default DeviceList;
