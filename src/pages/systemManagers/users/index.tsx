import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemUserIndex,
  postSystemUser__openAPI__delete,
} from '@/services/iThingsapi/yonghuguanli';
import { PROTABLE_OPTIONS, ROLE_VALUE_ENUM, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import React, { useRef } from 'react';
import CreateOrUpdateUser from './components/CreateOrUpdateUser';
import type { UserListItem } from './types';
const UserList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const actionRef = useRef<ActionType>();
  type QueryProp = typeof postSystemUserIndex;
  // type returnQueryProps = ReturnType<queryProps>
  // type returnQueryPropsItem = returnQueryProps.data.list

  // 获取数字验证码
  // const fetchCaptcha = async () => {
  //   const prams = apiParamsGUID();
  //   const body = {
  //     type: 'image',
  //     data: '',
  //     use: 'login',
  //   };
  //   postSystemUserCaptcha(prams, body).then((res) => {
  //     setCodeID(res?.data?.codeID ?? '');
  //     setCaptchaURL(res?.data?.url ?? '');
  //   });
  // };

  // 删除操作
  const showDeleteConfirm = (record: { uid: string; userName: string }) => {
    const body = {
      uid: record?.uid ?? '',
    };
    deleteHandler<{ uid: string }>(postSystemUser__openAPI__delete, actionRef, {
      title: '是否删除当前用户',
      content: `所选用户: ${record?.userName ?? '未知用户'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '编号',
      dataIndex: 'uid',
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
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
    {
      title: '微信',
      dataIndex: 'wechat',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      search: false,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '注册IP',
      dataIndex: 'regIP',
      search: false,
    },
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
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   search: false,
    //   valueEnum: {
    //     1: { text: '已注册', status: 'Success' },
    //     2: { text: '未注册', status: 'Error' },
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <CreateOrUpdateUser flag="update" record={record} actionRef={actionRef} />
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
      <ProTable<UserListItem>
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="uid"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateUser flag="create" actionRef={actionRef} key="createUser" />,
        ]}
        request={(params) => queryPage<QueryProp, UserListItem>(postSystemUserIndex, { ...params })}
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
      />
    </PageContainer>
  );
};

export default UserList;
