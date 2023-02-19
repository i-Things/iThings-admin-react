import {
  postApiV1SystemApiCreate,
  postApiV1SystemApiUpdate,
} from '@/services/iThingsapi/jiekouguanli';
import {
  BUSINESS_TYPE_VALUE,
  FORMITEM_LAYOUT,
  LAYOUT_TYPE_HORIZONTAL,
  METHOD_VALUE,
} from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

import type { ProFormInstance } from '@ant-design/pro-form';
import type { ApiListType } from '..';

const CreateOrUpdateApi: React.FC<{
  flag: string;
  record?: ApiListType;
}> = ({ flag, record }) => {
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);

  const editFormRef = useRef<ProFormInstance>();

  const initValue = {
    ...record,
    method: METHOD_VALUE[record?.method as number]?.text,
    businessType: BUSINESS_TYPE_VALUE[record?.businessType as number]?.text,
  };

  const { run: runUpdateApi } = useRequest(postApiV1SystemApiUpdate, {
    manual: true, // 手动触发请求
    onError: (error) => {
      message.error('更新接口失败:' + error.message);
    },
    onSuccess: (data) => {
      message.success('更新接口成功:' + data.msg);
    },
  });

  const { run: runCreateApi } = useRequest(postApiV1SystemApiCreate, {
    manual: true, // 手动触发请求
    onError: (error) => {
      message.error('新建接口失败:' + error.message);
    },
    onSuccess: (data) => {
      message.success('新建接口成功:' + data.msg);
    },
  });

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values: ApiListType) => {
    const body = {
      ...values,
      id: record?.id as number,
      businessType: Number(values.businessType),
      method: Number(values.method),
    };
    if (flag === 'update') runUpdateApi(body);
    else runCreateApi(body);
    onClose();
    editFormRef.current?.resetFields();
  };

  useEffect(() => {
    editFormRef.current?.setFieldsValue(initValue);
  }, [editFlag, initValue]);
  return (
    <ModalForm<ApiListType>
      width={550}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑Api' : '新建Api'}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? (
            '编辑'
          ) : (
            <>
              <PlusOutlined /> 新建接口
            </>
          )}
        </Button>
      }
      visible={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: onClose,
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={formSubmit}
    >
      <ProFormText
        name="route"
        width="md"
        label="接口路由"
        placeholder="请输入接口路由"
        rules={[
          {
            required: true,
            message: '接口路由是必填项！',
          },
        ]}
      />
      <ProFormSelect
        name="method"
        width="md"
        label="请求方式"
        rules={[
          {
            required: true,
            message: '请求方式为必填项！',
          },
        ]}
        valueEnum={METHOD_VALUE}
      />
      <ProFormText
        name="group"
        width="md"
        label="接口分组"
        placeholder="请输入角色名称"
        rules={[
          {
            required: true,
            message: '路径是必填项！',
          },
        ]}
      />
      <ProFormText
        name="name"
        width="md"
        label="接口名称"
        placeholder="请输入接口名称"
        rules={[
          {
            required: true,
            message: '接口名称是必填项！',
          },
        ]}
      />
      <ProFormSelect
        name="businessType"
        width="md"
        label="业务类型"
        rules={[
          {
            required: true,
            message: '请求方式为必填项！',
          },
        ]}
        valueEnum={BUSINESS_TYPE_VALUE}
      />
    </ModalForm>
  );
};

export default CreateOrUpdateApi;
