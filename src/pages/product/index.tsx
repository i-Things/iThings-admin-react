import {
  postThingsProductInfoCreate,
  postThingsProductInfoIndex,
  postThingsProductInfo__openAPI__delete,
} from '@/services/iThingsapi/chanpinguanli';
import { timestampToDateStr } from '@/utils/date';
import { history } from '@@/core/history';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
const { confirm } = Modal;

type productInfo = {
  productID: string;
  productName: string;
  netType: number;
  dataProto: number;
  deviceType: number;
  authMode: number;
  autoRegister: number;
  categoryID: number;
  description: string;
  createdTime: string;
  devStatus: number;
};

const columns: ProColumns<productInfo>[] = [
  {
    key: 'productName',
    title: '产品名称',
    dataIndex: 'productName',
  },
  {
    key: 'productID',
    title: '产品id',
    dataIndex: 'productID',
    search: false,
  },
  {
    key: 'deviceType',
    title: '设备类型',
    dataIndex: 'deviceType',
    //1:设备,2:网关,3:子设备
    valueEnum: {
      1: {
        text: '设备',
      },
      2: {
        text: '网关',
      },
      3: {
        text: '子设备',
      },
    },
  },
  {
    key: 'createdTime',
    title: '创建时间',
    dataIndex: 'createdTime',
    search: false,
    render: (text: any) => (text == '-' ? text : timestampToDateStr(text)),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="show"
        onClick={() => {
          history.push('/deviceManger/product/detail/' + record.productID);
        }}
      >
        查看
      </a>,
      <Button
        danger
        key="deleteProduct"
        onClick={() => {
          confirm({
            title: '你确定要删除该产品吗？',
            icon: <ExclamationCircleOutlined />,
            content: `所选产品名: ${record.productName},删除后无法恢复`,
            onOk() {
              const body = {
                productID: record.productID,
              };
              postThingsProductInfo__openAPI__delete(body).then((res) => {
                if (res.code === 200) {
                  message.success('删除成功');
                  action?.reload();
                }
              });
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }}
      >
        删除
      </Button>,
    ],
  },
];

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createVisible, setCreateVisible] = useState(false);

  const openCreateModal = async () => {
    // await fetchCaptcha();
    setCreateVisible(true);
  };

  const queryPage = async (params: any): Promise<any> => {
    console.log('queryPage:params:', params);
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      deviceType: Number(params.deviceType),
      productName: params.productName,
    };
    const res = await postThingsProductInfoIndex(body);

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

  return (
    <PageContainer>
      <ProTable<any>
        rowKey="productID"
        actionRef={actionRef}
        request={queryPage}
        search={{
          defaultCollapsed: false,
          span: 12,
          labelWidth: 'auto',
        }}
        tableAlertRender={false}
        columns={columns}
        bordered
        size={'middle'}
        toolBarRender={() => [
          <Button type="primary" onClick={openCreateModal}>
            新增
          </Button>,
        ]}
      />

      <ModalForm<productInfo>
        //formRef={editFormRef}
        title="创建产品"
        visible={createVisible}
        autoFocusFirstInput
        modalProps={{
          onCancel: () => setCreateVisible(false),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          const body = values;
          //body.uid = selectedRowKeys[0];
          return postThingsProductInfoCreate(body)
            .then((res) => {
              console.log('res', res);
              setCreateVisible(false);
              if (res.code === 200) {
                message.success('提交成功');
              }
              actionRef.current?.reload();
              return true;
            })
            .catch((error) => {
              console.log(error, 'error');
            });
        }}
      >
        <ProFormText
          name="productName"
          width="md"
          label="产品名称"
          placeholder="请输入产品名"
          rules={[
            {
              required: true,
              message: '必填项！',
            },
          ]}
        />
        <ProFormText name="description" width="md" label="产品描述" placeholder="请输入产品描述" />
        <ProFormRadio.Group
          width="md"
          name="deviceType"
          label="设备类型"
          request={async () => [
            { label: '设备', value: 1 },
            { label: '网关', value: 2 },
            { label: '子设备', value: 3 },
          ]}
        />
        <ProFormSelect
          width="md"
          name="netType"
          label="通讯方式"
          request={async () => [
            { label: '其他', value: 1 },
            { label: 'wi-fi', value: 2 },
            { label: '2G/3G/4G', value: 3 },
            { label: '5G', value: 4 },
            { label: 'BLE', value: 5 },
            { label: 'LoRaWAN', value: 6 },
          ]}
        />
        <ProFormSelect
          width="md"
          name="authMode"
          label="认证方式"
          request={async () => [
            { label: '账密认证', value: 1 },
            { label: '秘钥认证', value: 2 },
          ]}
        />
        <ProFormSelect
          width="md"
          name="autoRegister"
          label="动态注册"
          request={async () => [
            { label: '关闭', value: 1 },
            { label: '打开', value: 2 },
            { label: '打开并自动创建设备', value: 2 },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default IndexPage;
