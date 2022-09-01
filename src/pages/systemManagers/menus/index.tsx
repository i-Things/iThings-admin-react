import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemMenuIndex,
  postSystemMenu__openAPI__delete,
} from '@/services/iThingsapi/caidanguanli';

import { spanTree } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import React, { useRef } from 'react';
import CreateOrUpdateMenu from './components/CreateOrUpdateMenu';
import type { menuListItem } from './types';

const MenuList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHanlder } = useTableDelete();
  const actionRef = useRef<ActionType>();

  // 删除操作
  const showDeleteConfirm = (record: { uid: string; name: string }) => {
    // const body = {
    //   id: record?.uid,
    // };
    deleteHanlder(postSystemMenu__openAPI__delete, actionRef, record);
  };

  const columns: ProColumns<menuListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      hideInSearch: true,
      // valueType: 'textarea',
    },
    {
      title: '路由path',
      dataIndex: 'path',
    },
    {
      title: '父节点',
      dataIndex: 'parentID',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'order',
      hideInSearch: true,
    },

    {
      title: '文件路径',
      dataIndex: 'component',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/* <Button type="primary" onClick={() => {}}>
            添加子菜单
          </Button> */}
          <CreateOrUpdateMenu flag="update" record={record} actionRef={actionRef}>
            添加子菜单
          </CreateOrUpdateMenu>
          <Divider type="vertical" />
          <CreateOrUpdateMenu flag="update" record={record} actionRef={actionRef} />
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
      <ProTable<menuListItem>
        headerTitle="菜单管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 100,
        }}
        toolBarRender={() => [
          <CreateOrUpdateMenu flag="create" actionRef={actionRef} key="createRole" />,
        ]}
        request={(params) => queryPage(postSystemMenuIndex, params)}
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
        postData={(data) => spanTree(data, 0, 'parentID')}
      />
    </PageContainer>
  );
};

export default MenuList;
