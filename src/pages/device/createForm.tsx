import { postThingsDeviceInfoCreate } from '@/services/iThingsapi/shebeiguanli';
import { ResponseCode } from '@/utils/base';
import { DEVICE_LOG_LEVEL_FORM, PRODUCT_INFO } from '@/utils/const';
import { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';

interface Props {
  productInfos?: PRODUCT_INFO[];
  onCommit: () => void;
}

type deviceInfo = {
  productName: string;
  /** 不可修改 */
  productID: string;
  /** 不可修改 */
  deviceName?: string;
  /** 1)关闭 2)错误 3)告警 4)信息 5)调试  */
  logLevel: number;
  tags?: { key?: string; value?: string }[];
};
export const CreateForm: React.FC<Props> = ({ onCommit, productInfos }) => {
  const [createVisible, setCreateVisible] = useState(false);

  const formCommit = async (values: deviceInfo) => {
    const body = values;
    return postThingsDeviceInfoCreate(body)
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

  const formRef = useRef<ProFormInstance>();
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 32 },
    formRef: formRef,
  };
  const openCreateModal = async () => {
    if (productInfos === undefined || productInfos.length == 0) {
      message.error('请先创建产品');
      return;
    }
    console.log(productInfos);
    formRef.current?.setFieldsValue({
      productName: productInfos[0].productName,
      productID: productInfos[0].productID,
      logLevel: 1,
    });
    setCreateVisible(true);
  };
  return (
    <ModalForm<deviceInfo>
      {...formItemLayout}
      title="创建设备"
      layout="horizontal"
      visible={createVisible}
      width={480}
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
        placeholder="请选择产品"
        rules={[
          {
            required: true,
            message: '必填项！',
          },
        ]}
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
      <ProFormRadio.Group
        width="md"
        name="logLevel"
        label="日志级别"
        request={async () => DEVICE_LOG_LEVEL_FORM}
      />
    </ModalForm>
  );
};
