import { postApiV1ThingsDeviceInteractSendMsg } from '@/services/iThingsapi/shebeijiaohu';
import { ResponseCode } from '@/utils/base';
import { Button, Form, Input, message } from 'antd';
import React from 'react';

type sendMsgReq = {
  topic: string;
  payload: string;
};

const SendMsg: React.FC = () => {
  const onFinish = (values: sendMsgReq) => {
    const body = {
      ...values,
    };
    return postApiV1ThingsDeviceInteractSendMsg(body)
      .then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          message.success('发送成功');
        }
        return true;
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };
  const sendButtonConfig = {
    wrapperCol: { offset: 2, span: 16 },
  };
  const topicConfig = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
    initialValues: { remember: true },
    autoComplete: 'off',
  };
  const payloadConfig = {
    rows: 8,
  };
  return (
    <Form<sendMsgReq> name="basic" {...topicConfig} onFinish={onFinish}>
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
        <Input.TextArea {...payloadConfig} />
      </Form.Item>

      <Form.Item {...sendButtonConfig}>
        <Button type="primary" htmlType="submit">
          发送
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendMsg;
