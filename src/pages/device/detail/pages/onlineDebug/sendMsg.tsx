import { DeviceInfo } from '@/pages/device/data';
import { postThingsDeviceInteractSendMsg } from '@/services/iThingsapi/shebeijiaohu';
import { Button, Form, Input, message } from 'antd';
import React from 'react';

type sendMsgReq = {
  topic: string;
  payload: string;
};

const SendMsg: React.FC<DeviceInfo> = () => {
  const onFinish = (values: sendMsgReq) => {
    const body = {
      ...values,
    };
    return postThingsDeviceInteractSendMsg(body)
      .then((res) => {
        console.log('res', res);
        if (res.code === 200) {
          message.success('发送成功');
        }
        return true;
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  return (
    <Form<sendMsgReq>
      name="basic"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="topic"
        name="topic"
        rules={[{ required: true, message: '请输入需要发送的主题' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="payload"
        name="payload"
        rules={[{ required: true, message: '请输入需要发送的内容' }]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type="primary" htmlType="submit">
          发送
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendMsg;
