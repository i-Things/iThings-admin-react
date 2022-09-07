import { postThingsProductInfoUpdate } from '@/services/iThingsapi/chanpinguanli';
import {
  AUTH_MODE_FORM,
  AUTO_REGISTER_FORM,
  DATA_PROTO_FORM,
  DEVICE_TYPE_FORM,
  NET_TYPE_FORM,
  PRODUCT_INFO,
} from '@/utils/const';
import { EditOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';

interface Props {
  productInfo: PRODUCT_INFO;
  onChange: () => void;
}

export const EditForm: React.FC<Props> = ({ productInfo, onChange }) => {
  const [createVisible, setCreateVisible] = useState(false);
  const openCreateModal = async () => {
    setCreateVisible(true);
  };
  const formCommit = async (value: PRODUCT_INFO) => {
    const body = {
      ...value,
      productID: productInfo?.productID ?? '',
    };
    return postThingsProductInfoUpdate(body)
      .then((res) => {
        console.log('res', res);
        setCreateVisible(false);
        if (res.code === 200) {
          message.success('提交成功');
        }
        onChange();
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
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm<PRODUCT_INFO>
      {...formItemLayout}
      title="编辑产品信息"
      layout="horizontal"
      visible={createVisible}
      width={480}
      formRef={formRef}
      modalProps={{
        onCancel: () => setCreateVisible(false),
      }}
      trigger={
        <Button
          type="text"
          onClick={() => {
            openCreateModal();
            formRef.current?.setFieldsValue(productInfo);
          }}
          icon={<EditOutlined />}
        >
          编辑
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
        disabled
        request={async () => DEVICE_TYPE_FORM}
      />
      <ProFormSelect
        width="md"
        name="authMode"
        label="认证方式"
        disabled
        request={async () => AUTH_MODE_FORM}
      />
      <ProFormSelect
        width="md"
        name="dataProto"
        label="数据协议"
        disabled
        request={async () => DATA_PROTO_FORM}
      />
      <ProFormSelect
        width="md"
        disabled
        name="netType"
        label="通讯方式"
        request={async () => NET_TYPE_FORM}
      />
      <ProFormSelect
        width="md"
        name="autoRegister"
        label="动态注册"
        request={async () => AUTO_REGISTER_FORM}
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
