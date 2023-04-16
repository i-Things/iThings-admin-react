import CardItem from '@/pages/ruleEngine/scene/components/CardItem';
import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { postApiV1ThingsRuleAlarmSceneMultiUpdate } from '@/services/iThingsapi/changjingliandongguanlian';
import { ResponseCode } from '@/utils/base';
import { CheckOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Col, Empty, Input, message, Modal, Pagination, Row, Select, Spin } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import styles from '../../index.less';

interface AddSceneAboutProps {
  open: boolean;
  onCancel: () => void;
  refreshBingScene: () => void;
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

const stateOptions = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 2,
  },
];

const AddSceneAboutModal: React.FC<AddSceneAboutProps> = (props) => {
  const { open, onCancel, refreshBingScene } = props;

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  const [activeSceneIDs, setActiveSceneIDs] = useState<number[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  /** 获取所有已关联的场景列表-做回填使用 */
  useRequest(postApiV1ThingsRuleSceneInfoIndex, {
    defaultParams: [
      {
        alarmID: Number(id),
      },
    ],
    onSuccess: (res) => {
      setActiveSceneIDs(() => res?.data?.list?.map((item) => item.id || 0) || []);
    },
    onError: (error) => {
      message.error('获取场景规则错误:' + error.message);
    },
  });

  /** 分页获取场景列表 */
  const {
    data: ruleSceneList,
    loading,
    refresh,
  } = useRequest(postApiV1ThingsRuleSceneInfoIndex, {
    defaultParams: [
      {
        page: pageInfo,
        [searchType]: searchValue,
      },
    ],
    refreshDeps: [pageInfo],
    onError: (error) => {
      message.error('获取场景规则错误:' + error.message);
    },
  });

  /** 选择场景规则 */
  const handleCheckScene = (sceneId: number) => {
    setActiveSceneIDs((val) => {
      if (val?.includes(sceneId)) {
        return val.filter((item) => item !== sceneId);
      } else {
        return [...val, sceneId];
      }
    });
  };

  const handleCancel = () => {
    setActiveSceneIDs([]);
    onCancel();
  };

  /** 确认新增 */
  const handleOk = async () => {
    try {
      if (activeSceneIDs.length === 0) {
        message.warning('至少选择一个场景规则');
        return;
      }
      setConfirmLoading(true);
      const res = await postApiV1ThingsRuleAlarmSceneMultiUpdate({
        alarmID: Number(id),
        sceneIDs: activeSceneIDs,
      });
      setConfirmLoading(false);
      if (res.code === ResponseCode.SUCCESS) {
        message.success('新增成功');
        handleCancel();
        refreshBingScene();
      }
    } catch (error) {
      setConfirmLoading(false);
      message.error((error as Error).message);
    }
  };

  return (
    <Modal
      title="新增场景联动关联"
      open={open}
      width={900}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
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
            <Input placeholder="请输入名称" onChange={(e) => setSearchValue(e.target.value)} />
          </Col>
        )}
        {searchType === 'triggerType' && (
          <Col span={8}>
            <Select
              style={{ width: '100%' }}
              options={triggerTypeOptions}
              onChange={(val) => setSearchValue(val)}
            />
          </Col>
        )}
        {searchType === 'state' && (
          <Col span={8}>
            <Select
              style={{ width: '100%' }}
              options={stateOptions}
              onChange={(val) => setSearchValue(val)}
            />
          </Col>
        )}
        <Col>
          <div className={styles['btn-container']}>
            <Button type="primary" icon={<SearchOutlined />} onClick={refresh}>
              搜索
            </Button>
            <Button type="primary" icon={<ReloadOutlined />}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <div className={styles['scene-container']}>
          {ruleSceneList?.data?.list?.map((item) => (
            <div
              key={item.id}
              className={classNames(styles['scene-item'], {
                [styles.active]: activeSceneIDs?.includes(item.id || 0),
              })}
              onClick={() => handleCheckScene(item.id || 0)}
            >
              <CardItem data={item} isJump={false} />
              {activeSceneIDs?.includes(item.id || 0) && (
                <div className={styles['active-icon']}>
                  <div>
                    <CheckOutlined />
                  </div>
                </div>
              )}
            </div>
          ))}
          {ruleSceneList?.data?.list?.length === 0 && <Empty />}
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
        </div>
      </Spin>
    </Modal>
  );
};

export default AddSceneAboutModal;
