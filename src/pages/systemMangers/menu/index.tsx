import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemMenuIndex,
  postSystemMenu__openAPI__delete,
} from '@/services/iThingsapi/caidanguanli';
import { FlagStatus, ResponseCode } from '@/utils/base';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import type { ParamsType } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useRef, useState } from 'react';
import CreateOrUpdateMenu from './components/CreateOrUpdateMenu';
import type { MenuListItem } from './types';

const MenuList: React.FC = () => {
  const { queryPage, flatOptions } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const [cascaderOptions, setCascaderOptions] = useState<MenuListItem[]>([]);
  const actionRef = useRef<ActionType>();
  type QueryProp = typeof postSystemMenuIndex;

  // 删除操作
  const showDeleteConfirm = (record: MenuListItem) => {
    const body = {
      id: record?.id,
    };
    deleteHandler(
      {
        title: '是否删除当前菜单',
        content: `所选菜单: ${record?.name ?? '未知菜单'},  删除后无法恢复，请确认`,
      },
      async () => {
        let res;
        try {
          res = await postSystemMenu__openAPI__delete(body);
          if (res.code === ResponseCode.SUCCESS) {
            actionRef.current?.reload();
            message.success('删除成功');
          }
        } catch (error) {
          message.error((error as Error)?.message);
        }
        return res;
      },
      () => {
        console.log('Cancel');
      },
    );
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
            flag={FlagStatus.ADD}
            record={record}
            actionRef={actionRef}
            flatOptions={flatOptions}
          />

          <Divider type="vertical" />
          <CreateOrUpdateMenu
            flag={FlagStatus.UPDATE}
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

  const recursion = (pre: MenuListItem[]) => {
    pre.map((item) => {
      if (item.children) recursion(item?.children);
      item.key = item?.id + '';
      item.label = item?.name;
      item.value = item?.id;
    });
    return pre;
  };

  const queryPageHandler = async (
    params: ParamsType & {
      pageSize?: number | undefined;
      current?: number | undefined;
      keyword?: string | undefined;
    },
  ) => {
    const treeList = await queryPage<QueryProp, MenuListItem>(postSystemMenuIndex, params);
    const tree = cloneDeep(recursion(treeList?.data));
    tree.unshift({
      id: 0,
      label: '根节点',
      parentID: 1,
      value: 1,
      name: '',
      icon: '',
      path: '',
      order: 0,
      component: '',
      createdTime: '',
      hideInMenu: '',
      key: '',
    });
    setCascaderOptions(tree);
    return treeList;
  };

  return (
    // TODO: 菜单目前只支持单条搜索结果
    <PageContainer>
      <ProTable<MenuListItem>
        headerTitle="菜单管理"
        actionRef={actionRef}
        rowKey="id"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateMenu
            flag={FlagStatus.CREATE}
            actionRef={actionRef}
            key="createRole"
            flatOptions={flatOptions}
          />,
        ]}
        request={(params) => queryPageHandler(params)}
        columns={columns}
        pagination={false}
        size={'middle'}
      />
    </PageContainer>
  );
};

export default MenuList;
