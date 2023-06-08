import { postApiV1ThingsDeviceInfoCreate } from '@/services/iThingsapi/shebeiguanli';
import { ResponseCode } from '@/utils/base';
import type { DEVICE_INFO, PRODUCT_INFO } from '@/utils/const';
import { DEVICE_LOG_LEVEL_FORM } from '@/utils/const';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  productValues?: PRODUCT_INFO[];
  onCommit: () => void;
}

export const CreateForm: React.FC<Props> = ({ onCommit, productValues }) => {
  const [createVisible, setCreateVisible] = useState(false);
  const [productForm, setProductForm] = useState<{ label: string; value: string }[]>();

  const formCommit = async (values: DEVICE_INFO) => {
    const body = values;
    return postApiV1ThingsDeviceInfoCreate(body)
      .then((res: API.SuccRet) => {
        setCreateVisible(false);
        if (res.code === ResponseCode.SUCCESS) {
          message.success('提交成功');
        }
        onCommit();
        return true;
      })
      .catch((error) => {
        message.error('创建失败:' + error);
      });
  };

  const formRef = useRef<ProFormInstance<DEVICE_INFO>>();

  const initForm = () => {
    if (productValues === undefined || productValues.length == 0) {
      return;
    }
    const ret: { label: string; value: string }[] = [];
    productValues?.map((item) => {
      if (item.productID != undefined) {
        ret.push({ label: item?.productName ?? '-', value: item?.productID ?? '-' });
      }
    });
    setProductForm(ret);
    formRef.current?.setFieldsValue({
      productID: productValues[0].productID,
      logLevel: 1,
    });
  };
  const openCreateModal = async () => {
    if (productValues === undefined || productValues.length == 0) {
      message.error('请先创建产品');
      return;
    }
    initForm();
    setCreateVisible(true);
  };
  useEffect(() => {
    initForm();
  }, [productValues, createVisible]);
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 32 },
    visible: createVisible,
    formRef: formRef,
    width: 480,
  };
  return (
    <>
      <ModalForm<DEVICE_INFO>
        {...formItemLayout}
        title="创建设备"
        layout="horizontal"
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
        <ProFormSelect
          name="productID"
          width="md"
          label="产品名称"
          disabled={productValues?.length == 1}
          rules={[
            {
              required: true,
              message: '必填项！',
            },
          ]}
          request={async () => (productForm == undefined ? [] : productForm)}
        />
        <ProFormText
          width="md"
          name="deviceName"
          label="设备名"
          placeholder="请选择输入设备名"
          rules={[
            {
              required: true,
              message: '必填项！',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="deviceAlias"
          label="设备别名"
          placeholder="请选择输入设备别名"
        />
        <ProFormSelect
          width="md"
          name="logLevel"
          label="日志级别"
          request={async () => DEVICE_LOG_LEVEL_FORM}
        />
      </ModalForm>
    </>
  );
};
