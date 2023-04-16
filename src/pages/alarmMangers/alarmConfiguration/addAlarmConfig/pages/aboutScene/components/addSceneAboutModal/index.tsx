import CardItem from '@/pages/ruleEngine/scene/components/CardItem';
import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { useRequest } from 'ahooks';
import { Col, Empty, message, Modal, Row, Select, Spin } from 'antd';
import styles from '../../index.less';

interface AddSceneAboutProps {
  open: boolean;
}

const searchTypeOptions = [
  {
    label: '名称',
    value: 'name',
  },
  {
    label: '触发方式',
    value: 'triggerType',
  },
  {
    label: '状态',
    value: 'state',
  },
];

const AddSceneAboutModal: React.FC<AddSceneAboutProps> = (props) => {
  const { open } = props;

  const { data: ruleSceneList, loading } = useRequest(postApiV1ThingsRuleSceneInfoIndex, {
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
      message.error('获取场景规则错误:' + error.message);
    },
  });

  return (
    <Modal title="新增场景联动关联" open={open} width={900}>
      <Row gutter={24}>
        <Col span={4}>
          <Select style={{ width: '100%' }} options={searchTypeOptions} defaultValue="name" />
        </Col>
        <Col span={8}>
          <Select style={{ width: '100%' }} options={searchTypeOptions} />
        </Col>
      </Row>
      <Spin spinning={loading}>
        <div className={styles['scene-container']}>
          {ruleSceneList?.data?.list?.map((item) => (
            <div key={item.id}>
              <CardItem data={item} />
            </div>
          ))}
          {ruleSceneList?.data?.list?.length === 0 && <Empty />}
        </div>
      </Spin>
    </Modal>
  );
};

export default AddSceneAboutModal;
