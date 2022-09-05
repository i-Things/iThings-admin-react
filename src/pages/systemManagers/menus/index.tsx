import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemMenuIndex,
  postSystemMenu__openAPI__delete,
} from '@/services/iThingsapi/caidanguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';

import { spanTree } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import React, { useRef } from 'react';
import CreateOrUpdateMenu from './components/CreateOrUpdateMenu';
import type { menuListItem } from './types';
export enum flagStatus {
  ADD = 'add',
  CREATE = 'create',
  UPDATE = 'update',
}
const MenuList: React.FC = () => {
  const { queryPage, cascaderOptions, flatOptions, setCascaderOptions } = useGetTableList();
  const { deleteHanlder } = useTableDelete();
  const actionRef = useRef<ActionType>();

  // 删除操作
  const showDeleteConfirm = (record: menuListItem) => {
    const body = {
      id: record?.id,
    };
    deleteHanlder(postSystemMenu__openAPI__delete, actionRef, {
      title: '是否删除当前菜单',
      content: `所选菜单: ${record?.name ?? '未知菜单'},  删除后无法恢复，请确认`,
      body,
    });
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
          <CreateOrUpdateMenu
            flag={flagStatus.ADD}
            record={record}
            actionRef={actionRef}
            flatOptions={flatOptions}
          />

          <Divider type="vertical" />
          <CreateOrUpdateMenu
            flag={flagStatus.UPDATE}
            record={record}
            actionRef={actionRef}
            cascaderOptions={cascaderOptions}
            flatOptions={flatOptions}
            setCascaderOptions={setCascaderOptions}
          />
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
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateMenu
            flag={flagStatus.CREATE}
            actionRef={actionRef}
            key="createRole"
            flatOptions={flatOptions}
          />,
        ]}
        request={(params) => queryPage(postSystemMenuIndex, params)}
        columns={columns}
        pagination={{ pageSize: 999999 }}
        size={'middle'}
        postData={(data) => spanTree(data, 1, 'parentID')}
      />
    </PageContainer>
  );
};

export default MenuList;
