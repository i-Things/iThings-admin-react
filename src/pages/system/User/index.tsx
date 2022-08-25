import { postSystemUserCoreIndex } from '@/services/iThingsapi/yonghuguanli';
import { timestampToDateStr } from '@/utils/date';
import { apiParamsGUID } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import type { UserListItem } from './data.d';

const UserList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<UserListItem>();

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '编号',
      dataIndex: 'uid',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    // {
    //   title: '昵称',
    //   dataIndex: 'nickName',
    // },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '微信',
      dataIndex: 'wechat',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInSearch: true,
      renderText: (text) => timestampToDateStr(text),
    },
    {
      title: '注册IP',
      dataIndex: 'regIP',
      hideInSearch: true,
    },
    {
      title: '最后登录IP',
      dataIndex: 'lastIP',
      hideInSearch: true,
    },
    // {
    //   title: '部门',
    //   dataIndex: 'deptName',
    // },
    // {
    //   title: '职位',
    //   dataIndex: 'jobName',
    // },
    {
      title: '角色',
      dataIndex: 'role',
      valueEnum: {
        1: 'administrator',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        1: { text: '已注册', status: 'Success' },
        2: { text: '未注册', status: 'Error' },
      },
    },

    // {
    //   title: '创建人',
    //   dataIndex: 'createBy',
    //   hideInSearch: true,
    //   hideInTable: true,
    // },
    // {
    //   title: '更新人',
    //   dataIndex: 'lastUpdateBy',
    //   hideInSearch: true,
    //   hideInTable: true,
    // },
    // {
    //   title: '更新时间',
    //   dataIndex: 'lastUpdateTime',
    //   valueType: 'dateTime',
    //   hideInSearch: true,
    //   hideInTable: true,
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="primary" danger size="small">
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 100,
        }}
        toolBarRender={() => [
          <Button type="primary">
            <PlusOutlined /> 新建用户
          </Button>,
        ]}
        request={async (params) => {
          const param = apiParamsGUID();
          const body = { page: { page: params.current, size: params.pageSize } };

          const msg = await postSystemUserCoreIndex(param, body);
          return {
            data: msg?.data?.list,
            success: msg?.code === 200,
            total: msg?.data.total,
          };
        }}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions<UserListItem>
            column={2}
            title={row?.id}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;
