import { postApiV1ThingsRuleAlarmInfoCreate } from '@/services/iThingsapi/gaojingguanli';
import { Button, Form, Input, Radio } from 'antd';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const levelOptions = [
  {
    value: 1,
    label: '提醒',
  },
  {
    value: 2,
    label: '一般',
  },
  {
    value: 3,
    label: '严重',
  },
  {
    value: 4,
    label: '紧急',
  },
  {
    value: 5,
    label: '超紧急',
  },
];

const BasicPage = () => {
  const onFinish = (val: any) => {
    console.log(val);
    try {
      postApiV1ThingsRuleAlarmInfoCreate(val);
    } catch (error) {}
  };

  return (
    <div>
      <Form {...layout} onFinish={onFinish}>
        <Form.Item label="名称" rules={[{ required: true }]} name="name">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="级别" rules={[{ required: true }]} name="level">
          <Radio.Group options={levelOptions} optionType="button" />
        </Form.Item>
        <Form.Item label="说明" name="desc">
          <Input.TextArea placeholder="请输入说明" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicPage;
