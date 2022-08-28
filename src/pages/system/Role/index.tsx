import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postSystemRoleIndex,
  postSystemRole__openAPI__delete,
} from '@/services/iThingsapi/jiaoseguanli';
import { apiParamsGUID } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Drawer, Input, Tabs, Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import CreateOrUpdate from './components/createOrUpdate';
import type { RoleListItem } from './types';

const { TabPane } = Tabs;

const RoleList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHanlder } = useTableDelete();
  const actionRef = useRef<ActionType>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [, setSelectedKey] = useState<number[]>([]);

  // 删除操作
  const showDeleteConfirm = (record: { uid: string }) => {
    const params = apiParamsGUID();
    const body = {
      uid: record?.uid,
    };
    deleteHanlder(postSystemRole__openAPI__delete, actionRef, params, body);
  };

  // 树组件onCheck
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onCheck = (checkedKeys: React.Key[]) => {
    setCheckedKeys(checkedKeys);
    setSelectedKey(checkedKeys.map((i) => Number(i)));
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
      valueEnum: {
        1: { text: '启用', status: 'Success' },
        0: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
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
            }}
          >
            设置权限
          </Button>
          <Divider type="vertical" />
          {/* <ModalForm<{
            userName: string;
            nickName: string;
            sex: number;
            token: string;
            uid: string;
          }>
            width={550}
            initialValues={record}
            key={Math.random()}
            formRef={editFormRef}
            title="编辑用户信息"
            trigger={
              <Button type="primary" onClick={() => setEditVisible(true)}>
                编辑
              </Button>
            }
            visible={editVisible}
            autoFocusFirstInput
            modalProps={{
              onCancel: () => setEditVisible(false),
            }}
            submitTimeout={2000}
            {...formItemLayout}
            layout={LAYOUT_TYPE_HORIZONTAL}
            onFinish={async (values) => {
              // 请求编辑用户基本信息的接口
              const params = apiParams();
              const body = values;
              body.token = firstStepFormData.accessToken;
              body.uid = firstStepFormData.uid;
              return updateHanlder<RoleListItem>(
                postSystemRoleRoleMenuUpdate,
                actionRef,
                params,
                body,
              );
            }}
          >
            <ProFormText
              name="name"
              width="md"
              label="角色名称"
              placeholder="请输入角色名称"
              rules={[
                {
                  required: true,
                  message: '角色名称是必填项！',
                },
              ]}
            />
            <ProFormTextArea name="remark" width="md" label="备注" placeholder="请输入备注" />
            <ProFormSelect
              width="md"
              name="status"
              label="状态"
              request={async () => [
                { label: '启用', value: 1 },
                { label: '禁用', value: 2 },
              ]}
            />
          </ModalForm> */}
          <CreateOrUpdate flag="create" record={record} actionRef={actionRef} />,
          <Divider type="vertical" />
          <Button
            type="primary"
            danger
            onClick={() => {
              showDeleteConfirm(record.id);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (drawerVisible) {
      setSelectedKey([]);
      setCheckedKeys([]);
      // queryMenuByRoleId({ id: currentData.id }).then((res) => {
      //   let tr = toTree(res.allData, 0, 'parentId');
      //   // @ts-ignore
      //   setTreeData(tr);

      //   if (res.userData) {
      //     // @ts-ignore
      //     let map = res.userData.map(r => r+'');
      //     setSelectedKey(map);
      //     setCheckedKeys(map);

      //     console.log(tr);
      //   }
      // });
    }
  }, [drawerVisible]);

  return (
    <PageContainer>
      <ProTable<RoleListItem>
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="uid"
        search={{
          labelWidth: 100,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => setCreateVisible(true)}>
          //   <PlusOutlined /> 新建角色
          // </Button>,
          <CreateOrUpdate flag="create" actionRef={actionRef} />,
        ]}
        request={(params) => queryPage(postSystemRoleIndex, params)}
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
            <Tree
              checkable
              defaultExpandAll={true}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              // treeData={treeData}
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
