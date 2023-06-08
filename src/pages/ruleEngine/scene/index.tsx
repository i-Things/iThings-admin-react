import {
  postApiV1ThingsRuleSceneInfoIndex,
  postApiV1ThingsRuleSceneInfoUpdate,
  postApiV1ThingsRuleSceneInfo__openAPI__delete,
} from '@/services/iThingsapi/changjingliandong';
import { setLocalStorage } from '@/utils/utils';
import { PageContainer, ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Card, Col, Form, Input, message, Modal, Popconfirm, Row, Spin } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { history } from 'umi';
import CardItem from './components/CardItem';
import './components/style.less';
import TriggerType from './components/TriggerType';
import styles from './style.less';

export type CardItemType = {
  list: API.scene[];
};

export const MESSAGE_TIP_INFO = () => {
  message.info('目前只支持定时触发，其他模式开发中，敬请期待');
};

const defaultPageParams = {
  page: {
    page: 1,
    size: 9999,
  },
};

type queryParamsType = {
  page?: { page?: number; size?: number };
  name?: string;
  /** 1启用 2禁用 */
  status?: number;
  /** device: 设备触发 timer: 定时触发 manual:手动触发 */
  triggerType?: string;
  alarmID?: number;
};

const IndexPage = () => {
  const [queryParams, setQueryParams] = useState<queryParamsType>({
    ...defaultPageParams,
  });

  const {
    data: ruleSceneList,
    loading,
    run,
  } = useRequest(
    async () => {
      const res = await postApiV1ThingsRuleSceneInfoIndex({
        page: { page: 1, size: 9999 },
        ...queryParams,
      });
      return res;
    },
    {
      refreshDeps: [queryParams],
      onError: (error) => {
        message.error('获取规则错误:' + error.message);
      },
    },
  );

  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);

  const handleStatus = async (record: API.scene) => {
    const res = await postApiV1ThingsRuleSceneInfoUpdate({
      ...record,
      status: record.status === 1 ? 2 : 1,
    });

    if (res instanceof Response) {
      return;
    }
    run();
  };

  const deleteConfirm = async (record: API.scene) => {
    const res = await postApiV1ThingsRuleSceneInfo__openAPI__delete({
      id: record.id,
    });

    if (res instanceof Response) {
      return;
    }
    run();
  };

  const Tools: React.FC<{ record: API.scene }> = ({ record }) => {
    return (
      <div className="card-item-bottom-wrap">
        <div className="bottom-item-wrap">
          <Button
            className={classNames('btn-flex', 'btn', 'mr-8')}
            type="link"
            onClick={() => console.log('record', record)}
          >
            编辑
          </Button>
          <Button
            className={classNames('btn-flex', 'btn', 'mr-8')}
            type="link"
            onClick={() => handleStatus(record)}
          >
            {record.status === 1 ? '禁用' : '启用'}
          </Button>

          <Popconfirm
            placement="top"
            title="你确定要删除吗？"
            description={'删除这条场景联动记录'}
            onConfirm={() => deleteConfirm(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button className={classNames('btn-side', 'btn')} type="link">
              删除
            </Button>
          </Popconfirm>
        </div>
      </div>
    );
  };

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    if (values.trigetType !== 'timer') {
      MESSAGE_TIP_INFO();
      return;
    }
    setModalOpen(false);
    setLocalStorage('createScene', values);
    history.push('/ruleEngine/scene/detail');
  };

  const onCancel = () => {
    form.resetFields();
    setModalOpen(false);
  };

  const addModal = (
    <Modal
      open={open}
      title="新增"
      okText="确定"
      width={888}
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="addModal" initialValues={{ modifier: 'public' }}>
        <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="trigetType"
          label="触发方式"
          rules={[{ required: true, message: '请选择触发模式' }]}
        >
          <TriggerType />
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <PageContainer>
      <div className={styles['search-wrap']}>
        <Card>
          <QueryFilter
            defaultCollapsed
            split
            onFinish={async (value) => {
              console.log('value', value);
              setQueryParams(value);
            }}
          >
            <ProFormText
              colProps={{ xl: 8, md: 12 }}
              name="name"
              label="场景名"
              placeholder="请输入场景名"
            />
            <ProFormText
              colProps={{ xl: 8, md: 12 }}
              name="alarmID"
              label="告警ID"
              placeholder="请输入告警ID"
            />
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              label="触发类型"
              name="triggerType"
              valueEnum={{
                device: '设备触发',
                timer: '定时触发',
                manual: '手动触发',
              }}
            />
            <ProFormSelect
              colProps={{ xl: 8, md: 12 }}
              label="状态"
              name="state"
              valueEnum={{
                1: '启用',
                2: '禁用',
              }}
            />
          </QueryFilter>
        </Card>
      </div>

      <Card>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            style={{ marginTop: 5, marginBottom: 5, marginRight: 10 }}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            新增
          </Button>
        </div>
        <Spin spinning={loading}>
          <Row>
            {ruleSceneList?.data?.list?.map((item) => (
              <Col key={item.id} span={8} className={styles['card-item']}>
                <CardItem data={item} />
                <Tools record={item} />
              </Col>
            ))}
          </Row>
        </Spin>
      </Card>
      {addModal}
    </PageContainer>
  );
};

export default IndexPage;
