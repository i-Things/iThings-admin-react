import { postThingsProductInfoCreate } from '@/services/iThingsapi/chanpinguanli';
import {
  authModeForm,
  autoRegisterForm,
  dataProtoForm,
  deviceTypeFrom,
  netTypeForm,
  ProductInfo,
} from '@/utils/const';
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, message } from 'antd';
import React, { useState } from 'react';

interface Props {
  onCommit: () => void;
}

export const CreateForm: React.FC<Props> = ({ onCommit }) => {
  const [createVisible, setCreateVisible] = useState(false);
  const openCreateModal = async () => {
    setCreateVisible(true);
  };
  const formCommit = async (values: ProductInfo) => {
    const body = values;
    return postThingsProductInfoCreate(body)
      .then((res) => {
        console.log('res', res);
        setCreateVisible(false);
        if (res.code === 200) {
          message.success('提交成功');
        }
        onCommit();
        return true;
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 32 },
  };
  return (
    <ModalForm<ProductInfo>
      {...formItemLayout}
      title="创建产品"
      layout="horizontal"
      visible={createVisible}
      width={480}
      initialValues={{
        deviceType: 1,
        authMode: 1,
        autoRegister: 1,
        dataProto: 1,
        netType: 1,
      }}
      modalProps={{
        onCancel: () => setCreateVisible(false),
      }}
      trigger={
        <Button type="primary" onClick={openCreateModal}>
          新增
        </Button>
      }
      submitTimeout={2000}
      onFinish={formCommit}
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
      <ProFormRadio.Group
        width="md"
        name="deviceType"
        label="设备类型"
        request={async () => deviceTypeFrom}
      />
      <ProFormSelect
        width="md"
        name="authMode"
        label="认证方式"
        request={async () => authModeForm}
      />
      <ProFormSelect
        width="md"
        name="dataProto"
        label="数据协议"
        request={async () => dataProtoForm}
      />
      <ProFormSelect width="md" name="netType" label="通讯方式" request={async () => netTypeForm} />
      <ProFormSelect
        width="md"
        name="autoRegister"
        label="动态注册"
        request={async () => autoRegisterForm}
      />
      <ProFormTextArea
        name="description"
        width="md"
        label="产品描述"
        placeholder="请输入产品描述"
      />
    </ModalForm>
  );
};
