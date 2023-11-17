import useGetSelectOptions from '@/hooks/useGetSelectOption';
import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import { postApiV1SystemRoleIndex } from '@/services/iThingsapi/jiaoseguanli';
import {
  postApiV1SystemUserIndex,
  postApiV1SystemUser__openAPI__delete,
} from '@/services/iThingsapi/yonghuguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { arrTransferObj } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import CreateOrUpdateUser from './components/CreateOrUpdateUser';
import type { UserListItem } from './types';

const UserList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const { querySelectOptions, selectOptions } = useGetSelectOptions();
  const actionRef = useRef<ActionType>();
  const ROLE_VALUE_ENUM = arrTransferObj(selectOptions, 'value', 'label');

  type QueryProp = typeof postApiV1SystemUserIndex;
  type QueryRoleProp = typeof postApiV1SystemRoleIndex;

  // 删除操作
  const showDeleteConfirm = (record: { userID: string; userName: string }) => {
    const body = {
      userID: record?.userID ?? '',
    };
    deleteHandler<{ userID: string }>(postApiV1SystemUser__openAPI__delete, actionRef, {
      title: '是否删除当前用户',
      content: `所选用户: ${record?.userName ?? '未知用户'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const columns: ProColumns<UserListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    // {
    //   title: '编号',
    //   dataIndex: 'userID',
    //   search: false,
    // },
    {
      title: '用户名',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      search: false,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      search: false,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      search: false,
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createdTime',
    //   valueType: 'dateTime',
    //   search: false,
    //   renderText: (text: string) => timestampToDateStr(Number(text)),
    // },
    // {
    //   title: '注册IP',
    //   dataIndex: 'regIP',
    //   search: false,
    // },
    {
      title: '最后登录IP',
      dataIndex: 'lastIP',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'role',
      search: false,
      valueEnum: ROLE_VALUE_ENUM,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <CreateOrUpdateUser
            flag="update"
            key={record.userID}
            record={record}
            actionRef={actionRef}
            selectOptions={selectOptions}
          />
          <Button type="link" danger onClick={() => showDeleteConfirm(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    querySelectOptions<QueryRoleProp>(postApiV1SystemRoleIndex, {
      page: { page: 1, size: 99999 },
      label: 'name',
      value: 'id',
    });
  }, []);

  return (
    <PageContainer>
      <ProTable<UserListItem>
        bordered
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="userID"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateUser
            flag="create"
            actionRef={actionRef}
            key="createUser"
            selectOptions={selectOptions}
          />,
        ]}
        request={(params) =>
          queryPage<QueryProp, UserListItem>(postApiV1SystemUserIndex, { ...params })
        }
        columns={columns}
        size={'middle'}
      />
    </PageContainer>
  );
};

export default UserList;
