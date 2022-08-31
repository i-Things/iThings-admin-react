import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemUserCoreIndex,
  postSystemUserInfo__openAPI__delete,
} from '@/services/iThingsapi/yonghuguanli';
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
  const { deleteHanlder } = useTableDelete();
  const actionRef = useRef<ActionType>();

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
  const showDeleteConfirm = (record: { uid: string }) => {
    const body = {
      uid: record?.uid,
    };
    deleteHanlder(postSystemUserInfo__openAPI__delete, actionRef, body);
  };

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '编号',
      dataIndex: 'uid',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
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
    {
      title: '角色',
      dataIndex: 'role',
      valueEnum: {
        1: 'admin',
        2: '供应商',
        3: 'user',
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
          <CreateOrUpdateUser flag="update" record={record} actionRef={actionRef} />
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
      <ProTable<UserListItem>
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="uid"
        search={{
          labelWidth: 100,
        }}
        toolBarRender={() => [
          <CreateOrUpdateUser flag="create" actionRef={actionRef} key="createUser" />,
        ]}
        request={(params) => queryPage(postSystemUserCoreIndex, params)}
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
      />
    </PageContainer>
  );
};

export default UserList;
