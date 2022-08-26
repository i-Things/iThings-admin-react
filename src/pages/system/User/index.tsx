import {
  postSystemUserCaptcha,
  postSystemUserCoreCreate,
  postSystemUserCoreIndex,
  postSystemUserInfoCreate,
  postSystemUserInfoUpdate,
  postSystemUserInfo__openAPI__delete,
} from '@/services/iThingsapi/yonghuguanli';
import { timestampToDateStr } from '@/utils/date';
import { apiParams, apiParamsGUID } from '@/utils/utils';
import { ExclamationCircleOutlined, FontColorsOutlined, PlusOutlined } from '@ant-design/icons';
import type { ParamsType } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormCaptcha,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
  StepsForm,
} from '@ant-design/pro-components';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Drawer, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import type { UserListItem } from './data.d';
const { confirm } = Modal;
const UserList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const editFormRef = useRef<any>();
  const [row, setRow] = useState<UserListItem>();

  const [firstStepFormData, setFirstStepFormData] = useState<any>({});
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [codeID, setCodeID] = useState<string>('');
  const [captchaURL, setCaptchaURL] = useState<string>('');

  // 页面列表查询
  const queryPage = async (
    params: ParamsType & {
      pageSize?: number | undefined;
      current?: number | undefined;
      keyword?: string | undefined;
    },
  ): Promise<any> => {
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
    };
    const res = await postSystemUserCoreIndex(apiParams(), body);

    if (res instanceof Response) {
      return {
        data: [],
        total: 0,
      };
    }

    return {
      data: res.data.list,
      total: res.data.total,
    };
  };

  // 获取数字验证码
  const fetchCaptcha = async () => {
    const prams = apiParamsGUID();
    const body = {
      type: 'image',
      data: '',
      use: 'login',
    };
    postSystemUserCaptcha(prams, body).then((res) => {
      setCodeID(res?.data?.codeID ?? '');
      setCaptchaURL(res?.data?.url ?? '');
    });
  };

  // 创建用户 modal
  const openCreateModal = async () => {
    await fetchCaptcha();
    setCreateVisible(true);
  };

  // const isPass = () => {
  //   if (selectedRowKeys.length === 0) {
  //     message.info('请选择一条数据');
  //     return false;
  //   }
  //   return true;
  // };

  // 编辑用户modal
  // const openEditModal = () => {
  //   // if (!isPass()) {
  //   //   return;
  //   // }
  //   editFormRef?.current?.setFieldsValue(selectedRows[0]);
  //   setEditVisible(true);
  // };

  // 编辑表单布局
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  // 删除操作
  const showDeleteConfirm = (uid) => {
    // if (!isPass()) {
    //   return;
    // }
    confirm({
      title: '你确定要删除该用户信息吗？',
      icon: <ExclamationCircleOutlined />,
      content: `所选用户名: ,删除后无法恢复`,
      onOk() {
        const params = apiParamsGUID();
        const body = {
          uid,
        };
        postSystemUserInfo__openAPI__delete(params, body).then((res) => {
          if (res.code === 200) {
            message.success('删除成功');
            actionRef.current?.reload();
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
          {/* <Button type="primary" size="small" onClick={() => setEditVisible(true)}>
            编辑
          </Button> */}
          <ModalForm<{
            userName: string;
            nickName: string;
            sex: number;
            token: string;
            uid: string;
          }>
            // width={500}
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
            // layout={LAYOUT_TYPE_HORIZONTAL}
            onFinish={async (values) => {
              // 请求编辑用户基本信息的接口
              const params = apiParams();
              const body = values;
              body.token = firstStepFormData.accessToken;
              body.uid = firstStepFormData.uid;
              return postSystemUserInfoUpdate(params, body)
                .then((res) => {
                  console.log('res', res);
                  setCreateVisible(false);
                  if (res.code === 200) {
                    message.success('提交成功');
                  }
                  return true;
                })
                .catch((error) => {
                  console.log(error, 'error');
                });
            }}
          >
            <ProFormText
              name="userName"
              width="md"
              label="用户名"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText name="nickName" width="md" label="昵称" placeholder="请输入昵称" />
            <ProFormSelect
              width="md"
              name="sex"
              label="性别"
              request={async () => [
                { label: '男性', value: 1 },
                { label: '女性', value: 2 },
              ]}
            />
            <ProFormText name="country" width="md" label="国家" placeholder="请输入所在国家" />
            <ProFormText name="province" width="md" label="省份" placeholder="请输入所在省份" />
            <ProFormText name="city" width="md" label="城市" placeholder="请输入所在城市" />
            <ProFormText name="language" width="md" label="语言" placeholder="请输入使用语言" />
            <ProFormUploadDragger name="drag-pic" label="头像" />
          </ModalForm>
          <Divider type="vertical" />
          <Button
            type="primary"
            danger
            onClick={() => {
              showDeleteConfirm(record?.uid);
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
          <Button type="primary" onClick={openCreateModal}>
            <PlusOutlined /> 新建用户
          </Button>,
        ]}
        request={queryPage}
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
      />
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          // 请求创建用户基本信息的接口
          const params = apiParams();
          const body = values as any;
          body.token = firstStepFormData.accessToken;
          body.uid = firstStepFormData.uid;
          return postSystemUserInfoCreate(params, body)
            .then((res) => {
              console.log('res', res);
              setCreateVisible(false);
              if (res.code === 200) {
                message.success('提交成功');
              }
              return true;
            })
            .catch((error) => {
              console.log(error, 'error');
            });
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="创建用户"
              width={800}
              onCancel={() => setCreateVisible(false)}
              visible={createVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="创建用户核心信息"
          onFinish={async (values) => {
            console.log('base', values);
            // 调用创建用户核心数据的接口
            const params = apiParams();
            const body = values as any;
            body.reqType = 'password';
            body.codeID = codeID;
            return postSystemUserCoreCreate(params, body)
              .then((res) => {
                console.log('res', res);
                setFirstStepFormData(res.data);
                return true;
              })
              .catch((error) => {
                console.log('error', error);
              });
          }}
        >
          <ProFormText
            name="identity"
            width="md"
            label="用户名"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            width="md"
            label="密码"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />
          <ProFormSelect
            width="md"
            name="role"
            label="用户角色"
            rules={[
              {
                required: true,
                message: '用户角色是必填项！',
              },
            ]}
            request={async () => [
              { label: 'admin', value: 1 },
              { label: '供应商', value: 2 },
              { label: 'user', value: 3 },
            ]}
          />
          <ProFormCaptcha
            countDown={1}
            label="验证码"
            rules={[
              {
                required: true,
                message: '验证码是必填项！',
              },
            ]}
            fieldProps={{
              size: 'large',
              prefix: <FontColorsOutlined className={'prefixIcon'} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={'请输入验证码'}
            captchaTextRender={() => {
              return <img style={{ width: 130, height: 30 }} src={captchaURL} alt="" />;
            }}
            name="code"
            onGetCaptcha={async () => {
              await fetchCaptcha();
              message.success('刷新验证码成功！');
            }}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="创建用户基本信息">
          <ProFormText
            name="userName"
            width="md"
            label="用户名"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText name="nickName" width="md" label="昵称" placeholder="请输入昵称" />
          <ProFormSelect
            width="md"
            name="sex"
            label="性别"
            request={async () => [
              { label: '男性', value: 1 },
              { label: '女性', value: 2 },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>

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
