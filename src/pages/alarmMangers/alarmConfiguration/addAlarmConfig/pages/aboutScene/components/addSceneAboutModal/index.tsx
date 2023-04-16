import CardItem from '@/pages/ruleEngine/scene/components/CardItem';
import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Col, Empty, Input, message, Modal, Pagination, Row, Select, Spin } from 'antd';
import { useState } from 'react';
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
const triggerTypeOptions = [
  {
    label: '手动触发',
    value: 'manual',
  },
  {
    label: '定时触发',
    value: 'timer',
  },
  {
    label: '设备触发',
    value: 'device',
  },
];

const AddSceneAboutModal: React.FC<AddSceneAboutProps> = (props) => {
  const { open } = props;

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [searchType, setSearchType] = useState('name');
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  // const [activeScene, setActiveScene] = useState<number[]>();

  /** 获取所有已关联的场景列表-做回填使用 */
  useRequest(postApiV1ThingsRuleSceneInfoIndex, {
    defaultParams: [
      {
        alarmID: Number(id),
      },
    ],
    onSuccess: () => {
      // setActiveScene(() => res.data?.list?.map((item) => item.id || 0));
    },
    onError: (error) => {
      message.error('获取场景规则错误:' + error.message);
    },
  });

  /** 分页获取场景列表 */
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
          <Select
            style={{ width: '100%' }}
            options={searchTypeOptions}
            value={searchType}
            onChange={(val: string) => setSearchType(val)}
          />
        </Col>
        {searchType === 'name' && (
          <Col span={8}>
            <Input placeholder="请输入名称" />
          </Col>
        )}
        {searchType === 'triggerType' && (
          <Col span={8}>
            <Select style={{ width: '100%' }} options={triggerTypeOptions} />
          </Col>
        )}
      </Row>
      <Spin spinning={loading}>
        <div className={styles['scene-container']}>
          {ruleSceneList?.data?.list?.map((item) => (
            <div key={item.id} className={styles.active}>
              <CardItem data={item} />
              <div className={styles['active-icon']} />
            </div>
          ))}
          {ruleSceneList?.data?.list?.length === 0 && <Empty />}
        </div>
      </Spin>
      <div className={styles.pagination}>
        <Pagination
          total={ruleSceneList?.data?.total}
          showTotal={(total, range) => `第${range[0]}-${range[1]} 条/总共 ${total} 条`}
          pageSize={pageInfo.size}
          current={pageInfo.page}
          onChange={(page, size) => setPageInfo({ page, size })}
          size="small"
          showSizeChanger
          hideOnSinglePage={true}
        />
      </div>
    </Modal>
  );
};

export default AddSceneAboutModal;
