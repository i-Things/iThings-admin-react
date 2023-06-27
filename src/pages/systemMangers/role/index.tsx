import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import useTableUpdate from '@/hooks/useTableUpdate';
import {
  postApiV1SystemRoleIndex,
  postApiV1SystemRole__openAPI__delete,
} from '@/services/iThingsapi/jiaoseguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Drawer, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import ApiForm from './components/ApiForm';
import CreateOrUpdateRole from './components/CreateOrUpdateRole';
import MenuForm from './components/MenuForm';
import type { RoleListItem } from './types';

const { TabPane } = Tabs;

const RoleList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const { updateHandler } = useTableUpdate();
  const actionRef = useRef<ActionType>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentData, setCurrentData] = useState<RoleListItem>();
  const [roleID, setRoleID] = useState(0);
  type QueryProp = typeof postApiV1SystemRoleIndex;

  // 删除操作
  const showDeleteConfirm = (record: { id: string; name: string }) => {
    const body = {
      id: record?.id,
    };
    deleteHandler<{ id: string }>(postApiV1SystemRole__openAPI__delete, actionRef, {
      title: '是否删除当前角色',
      content: `所选角色: ${record?.name ?? '未知角色'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const formSubmit = async <T extends Function, K>(api: T, body: K) => {
    await updateHandler(api, actionRef, { ...body, roleID });
    setDrawerVisible(false);
  };

  const columns: ProColumns<RoleListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      copyable: true,
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
            type="link"
            onClick={() => {
              setDrawerVisible(true);
              setCurrentData(record);
              setRoleID(Number(record?.id));
            }}
          >
            设置权限
          </Button>
          <CreateOrUpdateRole flag="update" record={record} actionRef={actionRef} />
          <Button type="link" danger onClick={() => showDeleteConfirm(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<RoleListItem>
        bordered
        headerTitle="角色管理"
        actionRef={actionRef}
        rowKey="userID"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateRole flag="create" actionRef={actionRef} key="createRole" />,
        ]}
        request={(params) =>
          queryPage<QueryProp, RoleListItem>(postApiV1SystemRoleIndex, {
            ...params,
            status: Number(params.status),
          })
        }
        columns={columns}
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
            <ApiForm drawerVisible={drawerVisible} onSubmit={formSubmit} roleID={roleID} />
          </TabPane>
          {/* <TabPane tab="资源权限" key="3">
            Content of Tab Pane 3
          </TabPane> */}
        </Tabs>
      </Drawer>
    </PageContainer>
  );
};

export default RoleList;
