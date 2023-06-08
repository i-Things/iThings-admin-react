import { postApiV1ThingsProductInfoCreate } from '@/services/iThingsapi/chanpinguanli';
import { ResponseCode } from '@/utils/base';
import type { PRODUCT_INFO } from '@/utils/const';
import {
  AUTH_MODE_FORM,
  AUTO_REGISTER_FORM,
  DATA_PROTO_FORM,
  DEVICE_TYPE_FORM,
  NET_TYPE_FORM,
} from '@/utils/const';
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, message, Switch } from 'antd';
import React, { useState } from 'react';

interface Props {
  onCommit: () => void;
}

export const CreateForm: React.FC<Props> = ({ onCommit }) => {
  const [createVisible, setCreateVisible] = useState(false);
  const [inputProductID, setInputProductID] = useState(false);
  const openCreateModal = async () => {
    setCreateVisible(true);
  };
  const formCommit = async (values: PRODUCT_INFO) => {
    const body = values;
    return postApiV1ThingsProductInfoCreate(body)
      .then((res) => {
        console.log('res', res);
        setCreateVisible(false);
        if (res.code === ResponseCode.SUCCESS) {
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
    <ModalForm<PRODUCT_INFO>
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
      <Switch
        checked={inputProductID}
        checkedChildren="自定义产品id"
        unCheckedChildren="产品id自动生成"
        onChange={() => {
          setInputProductID(!inputProductID);
        }}
      />
      {inputProductID ? (
        <ProFormText
          name="productID"
          width="md"
          label="产品id"
          tooltip="长度必须为11个字符,且只能包含数字及大小写字母"
          placeholder="请输入产品id"
          rules={[
            {
              required: true,
              message: '必填项！',
            },
            {
              min: 11,
              message: '不能少于11个字符',
            },
            {
              max: 11,
              message: '不能超过11个字符',
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: '只能有数字和字母',
            },
          ]}
        />
      ) : (
        ''
      )}

      <ProFormRadio.Group
        width="md"
        name="deviceType"
        label="设备类型"
        request={async () => DEVICE_TYPE_FORM}
      />
      <ProFormSelect
        width="md"
        name="authMode"
        label="认证方式"
        request={async () => AUTH_MODE_FORM}
      />
      <ProFormSelect
        width="md"
        name="dataProto"
        label="数据协议"
        request={async () => DATA_PROTO_FORM}
      />
      <ProFormSelect
        width="md"
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
