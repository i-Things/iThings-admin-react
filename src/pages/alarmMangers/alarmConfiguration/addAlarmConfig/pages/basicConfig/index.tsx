import {
  postApiV1ThingsRuleAlarmInfoCreate,
  postApiV1ThingsRuleAlarmInfoRead,
  postApiV1ThingsRuleAlarmInfoUpdate,
} from '@/services/iThingsapi/gaojingguanli';
import { ResponseCode } from '@/utils/base';
import { useRequest, useSearchParams } from '@umijs/max';
import { Button, Form, Input, message, Radio, Spin } from 'antd';
import { useEffect, useState } from 'react';
import type { AlarmItem } from '../../../data';

const levelOptions = [
  {
    value: 5,
    label: '超紧急',
  },
  {
    value: 4,
    label: '紧急',
  },
  {
    value: 3,
    label: '严重',
  },
  {
    value: 2,
    label: '一般',
  },
  {
    value: 1,
    label: '提醒',
  },
];

const BasicPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [alarmData, setAlarmData] = useState<Partial<AlarmItem>>();

  const [form] = Form.useForm();

  /** 编辑时获取告警详情 */
  const { loading } = useRequest(postApiV1ThingsRuleAlarmInfoRead, {
    defaultParams: [{ id: Number(searchParams.get('id')) || 0 }],
    ready: !!id,
    onSuccess: (result) => {
      setAlarmData(result);
    },
    onError: (error) => {
      message.error('获取告警详情错误:' + error.message);
    },
  });

  useEffect(() => {
    if (alarmData) {
      form.setFieldsValue(alarmData);
    }
  }, [alarmData, form]);

  const onFinish = async (val: any) => {
    try {
      if (id) {
        const { code } = await postApiV1ThingsRuleAlarmInfoUpdate({
          ...val,
          id: Number(id),
          state: alarmData?.state,
        });
        if (code === ResponseCode.SUCCESS) {
          message.success('修改成功');
        }
      } else {
        const { data, code } = await postApiV1ThingsRuleAlarmInfoCreate({ ...val, state: 2 });
        if (code === ResponseCode.SUCCESS) {
          message.success('添加成功');
          if (!id) setSearchParams(`id=${data.id}`);
        }
      }
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish}>
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
      </Spin>
    </div>
  );
};

export default BasicPage;
