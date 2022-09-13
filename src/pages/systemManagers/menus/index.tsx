import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemMenuIndex,
  postSystemMenu__openAPI__delete,
} from '@/services/iThingsapi/caidanguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { spanTree } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message } from 'antd';
import React, { useRef } from 'react';
import CreateOrUpdateMenu from './components/CreateOrUpdateMenu';
import type { MenuListItem } from './types';

export enum flagStatus {
  ADD = 'add',
  CREATE = 'create',
  UPDATE = 'update',
}
const MenuList: React.FC = () => {
  const { queryPage, cascaderOptions, flatOptions } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const actionRef = useRef<ActionType>();

  type QueryProp = typeof postSystemMenuIndex;
  // 删除操作
  const showDeleteConfirm = (record: MenuListItem) => {
    const body = {
      id: record?.id,
    };
    deleteHandler<{ id: number }>(postSystemMenu__openAPI__delete, actionRef, {
      title: '是否删除当前菜单',
      content: `所选菜单: ${record?.name ?? '未知菜单'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const columns: ProColumns<MenuListItem>[] = [
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
    },
    {
      title: '路由path',
      dataIndex: 'path',
    },
    {
      title: '路由重定向',
      dataIndex: 'redirect',
      hideInSearch: true,
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
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.order - b.order,
    },

    {
      title: '文件路径',
      dataIndex: 'component',
      hideInSearch: true,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '是否隐藏',
      dataIndex: 'hideInMenu',
      search: false,
      valueEnum: {
        1: { text: '是' },
        2: { text: '否' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
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
          />
          <Divider type="vertical" />
          <Button
            type="primary"
            danger
            onClick={() => {
              if (record?.children)
                return message.error('有嵌套关系不能够删除，如有需要请先删除子节点');
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
      <ProTable<MenuListItem>
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
        request={(params) => queryPage<QueryProp, MenuListItem>(postSystemMenuIndex, params)}
        columns={columns}
        // pagination={{ pageSize: 999999 }}
        size={'middle'}
        postData={(data) => spanTree(data, 1, 'parentID')}
      />
    </PageContainer>
  );
};

export default MenuList;