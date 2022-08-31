import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemRoleIndex,
  postSystemRole__openAPI__delete,
} from '@/services/iThingsapi/jiaoseguanli';
import { timestampToDateStr } from '@/utils/date';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Drawer, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import CreateOrUpdateRole from './components/CreateOrUpdateRole';
import MenuForm from './components/MenuForm';
import type { RoleListItem } from './types';

const { TabPane } = Tabs;

const RoleList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHanlder } = useTableDelete();
  const actionRef = useRef<ActionType>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [roleMenuID, setRoleMenuID] = useState([]);

  // 删除操作
  const showDeleteConfirm = (record: { uid: string; name: string }) => {
    // const body = {
    //   id: record?.uid,
    // };
    deleteHanlder(postSystemRole__openAPI__delete, actionRef, record);
  };

  // const queryList = (params) => {
  //   queryPage(postSystemRoleIndex, params).then((res) => setRoleMenuID(res?.roleMenuID));
  // };

  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '编号',
      dataIndex: 'uid',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '备注为必填项',
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '启用', status: 'Success' },
        2: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInSearch: true,
      renderText: (text) => timestampToDateStr(text),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setDrawerVisible(true);
              setRoleMenuID(record?.roleMenuID);
            }}
          >
            设置权限
          </Button>
          <Divider type="vertical" />
          <CreateOrUpdateRole flag="update" record={record} actionRef={actionRef} />
          <Divider type="vertical" />
          <Button
            type="primary"
            danger
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<RoleListItem>
        headerTitle="角色管理"
        actionRef={actionRef}
        rowKey="uid"
        search={{
          labelWidth: 100,
        }}
        toolBarRender={() => [
          <CreateOrUpdateRole flag="create" actionRef={actionRef} key="createRole" />,
        ]}
        request={(params) => queryPage(postSystemRoleIndex, params)}
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
      />

      <Drawer
        width={600}
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
        }}
        closable={false}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="角色菜单" key="1">
            <MenuForm drawerVisible={drawerVisible} roleMenuID={roleMenuID} />
          </TabPane>
          <TabPane tab="角色api" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="资源权限" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Drawer>
    </PageContainer>
  );
};

export default RoleList;
