import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Card, Col, Form, Input, Modal, Row, message } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import CardItem from './components/CardItem';
import TriggerType from './components/TriggerType';
import './components/style.less';
import styles from './style.less';

export type CardItemType = {
  list: API.scene[];
};

const IndexPage = () => {
  const { data: ruleSceneList } = useRequest(postApiV1ThingsRuleSceneInfoIndex, {
    defaultParams: [
      {
        page: {
          page: 1,
          size: 20,
        },
        name: '',
        state: 1,
        triggerType: '',
      },
    ],
    onError: (error) => {
      message.error('获取规则错误:' + error.message);
    },
  });

  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false)


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
          <Button className={classNames('btn-flex', 'btn', 'mr-8')} type="link">
            启用
          </Button>
          <Button className={classNames('btn-side', 'btn')} type="link">
            删除
          </Button>
        </div>
      </div>
    );
  };

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setModalOpen(false);
  };

  const onCancel = () => {
    form.resetFields();
    setModalOpen(false);
  }

  const onCheck = (key: string) => {
    console.log('key', key)
  }


  const addModal = <Modal
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
    <Form
      form={form}
      layout="vertical"
      name="addModal"
      initialValues={{ modifier: 'public' }}
    >
      <Form.Item
        name="name"
        label="名称"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="trigetType"
        label="触发方式"
        rules={[{ required: true, message: '请选择触发模式' }]}
      >
        <TriggerType onCheck={onCheck}> </TriggerType>
      </Form.Item>
    </Form>
  </Modal>

  return (
    <PageContainer>
      <div className={styles['search-wrap']}>
        搜索框
      </div>

      <Card>
        <Button type="primary" style={{ marginTop: 25, marginBottom: 25 }} onClick={() => {
          setModalOpen(true)
        }}>
          新增
        </Button>
        <Row>
          {ruleSceneList?.data?.list?.map((item) => (
            <Col key={item.id} span={24} className={styles['card-item']}>
              <CardItem data={item} />
              <Tools record={item} />
            </Col>
          ))}
        </Row>
      </Card>
      {addModal}
    </PageContainer>
  );
};

export default IndexPage;
