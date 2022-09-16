import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import useTableUpdate from '@/hooks/useTableUpdate';
import {
  postSystemRoleIndex,
  postSystemRoleRoleMenuUpdate,
  postSystemRole__openAPI__delete,
} from '@/services/iThingsapi/jiaoseguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE, STATUS_VALUE_ENUM } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Drawer, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import CreateOrUpdateRole from './components/CreateOrUpdateRole';
import MenuForm from './components/MenuForm';
import type { FormSubmitValueProp, RoleListItem } from './types';

const { TabPane } = Tabs;

const RoleList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const { updateHandler } = useTableUpdate();
  const actionRef = useRef<ActionType>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentData, setCurrentData] = useState<RoleListItem>();
  type QueryProp = typeof postSystemRoleIndex;
  type UpdateProp = typeof postSystemRoleRoleMenuUpdate;
  // 删除操作
  const showDeleteConfirm = (record: { id: string; name: string }) => {
    const body = {
      id: record?.id,
    };
    deleteHandler<{ id: string }>(postSystemRole__openAPI__delete, actionRef, {
      title: '是否删除当前角色',
      content: `所选角色: ${record?.name ?? '未知角色'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const formSubmit = async (values: FormSubmitValueProp) => {
    await updateHandler<UpdateProp, FormSubmitValueProp>(
      postSystemRoleRoleMenuUpdate,
      actionRef,
      values,
    );
    setDrawerVisible(false);
  };

  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
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
      valueEnum: STATUS_VALUE_ENUM,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInSearch: true,
      renderText: (text: string) => timestampToDateStr(Number(text)),
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
              setCurrentData(record);
            }}
          >
            设置权限
          </Button>
          <Divider type="vertical" />
          <CreateOrUpdateRole flag="update" record={record} actionRef={actionRef} />
          <Divider type="vertical" />
          <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>
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
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateRole flag="create" actionRef={actionRef} key="createRole" />,
        ]}
        request={(params) =>
          queryPage<QueryProp, RoleListItem>(postSystemRoleIndex, {
            ...params,
            status: Number(params.status),
          })
        }
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
            <MenuForm
              drawerVisible={drawerVisible}
              currentData={currentData as RoleListItem}
              onSubmit={formSubmit}
            />
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
