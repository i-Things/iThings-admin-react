import UploadFile from '@/components/UploadFile';
import { postApiV1SystemTimedTaskGroupUpdate } from '@/services/iThingsapi/renwu';
import {
  AUTH_MODE_FORM,
  AUTO_REGISTER_FORM,
  DATA_PROTO_FORM,
  DEVICE_TYPE_FORM,
  NET_TYPE_FORM,
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
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  taskGroup: API.taskGroup;
  onChange: () => void;
}

export const EditForm: React.FC<Props> = ({ taskGroup, onChange }) => {
  console.log('EditForm:', taskGroup);
  const [createVisible, setCreateVisible] = useState(false);
  const formRef = useRef<ProFormInstance<API.taskGroup>>();
  const openCreateModal = async () => {
    setCreateVisible(true);
  };
  useEffect(() => {
    formRef.current?.setFieldsValue(taskGroup);
  }, [taskGroup, createVisible]);

  const uploadFileDataRef = useRef({
    productImg: '',
    isUpdateProductImg: false,
  });
  const getUploadFileData = (path: string) => {
    uploadFileDataRef.current.productImg = path;
    uploadFileDataRef.current.isUpdateProductImg = true;
  };

  const formCommit = async (value: API.taskGroup) => {
    const body = {
      ...uploadFileDataRef.current,
      ...value,
      code: taskGroup?.code ?? '',
    };
    console.log('formCommit:', body);
    return postApiV1SystemTimedTaskGroupUpdate(body)
      .then((res) => {
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

  return (
    <ModalForm<API.taskGroup>
      {...formItemLayout}
      title="编辑任务组信息"
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
            formRef.current?.setFieldsValue(taskGroup);
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
      <UploadFile
        label="产品图片"
        accept="image/*"
        filePathPrefix="123"
        scene="productImg"
        business="productManage"
        getUploadFileData={getUploadFileData}
      ></UploadFile>
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
      <ProFormTextArea name="desc" width="md" label="产品描述" placeholder="请输入产品描述" />
    </ModalForm>
  );
};
