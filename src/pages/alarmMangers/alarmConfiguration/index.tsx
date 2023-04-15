import {
  postApiV1ThingsRuleAlarmInfoIndex,
  postApiV1ThingsRuleAlarmInfoUpdate,
  postApiV1ThingsRuleAlarmInfo__openAPI__delete,
} from '@/services/iThingsapi/gaojingguanli';
import { ResponseCode } from '@/utils/base';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useNavigate } from '@umijs/max';
import { useRequest } from 'ahooks';
import {
  Badge,
  Button,
  Card,
  Col,
  Empty,
  message,
  Modal,
  Pagination,
  Row,
  Spin,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { AlarmInfo, AlarmItem } from './data';
import styles from './index.less';

export const levelMap = new Map([
  [5, { text: '超紧急', bgColor: 'rgb(229, 0, 18)' }],
  [4, { text: '紧急', bgColor: 'rgb(255, 148, 87)' }],
  [3, { text: '严重', bgColor: 'rgb(250, 189, 71)' }],
  [2, { text: '一般', bgColor: '#999' }],
  [1, { text: '提醒', bgColor: '#bfbfbf' }],
]);

const { confirm } = Modal;

const IndexPage: React.FC = () => {
  const [alarmData, setAlarmData] = useState<Partial<AlarmInfo>>();
  const [hoverKey, setHoverKey] = useState<number>();
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });

  const navigate = useNavigate();

  const { loading, refresh } = useRequest(postApiV1ThingsRuleAlarmInfoIndex, {
    defaultParams: [{ page: pageInfo }],
    refreshDeps: [pageInfo],
    onSuccess: (result) => {
      setAlarmData(result.data);
    },
    onError: (error) => {
      message.error('获取告警信息列表错误:' + error.message);
    },
  });

  /** 启用告警 */
  const handleStartUse = (value: AlarmItem) => {
    confirm({
      title: `你确定要${value.state === 1 ? '禁用' : '启用'}该告警配置吗?`,
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        return postApiV1ThingsRuleAlarmInfoUpdate({ ...value, state: value.state === 1 ? 2 : 1 })
          .then((res) => {
            if (res.code === ResponseCode.SUCCESS) {
              message.success(`${value.state === 1 ? '禁用' : '启用'}成功`);
              refresh();
            }
          })
          .catch((error) => {
            message.error(error.msg);
          });
      },
    });
  };

  /** 删除告警 */
  const handleDelete = async (id: number) => {
    confirm({
      title: '你确定要删除该告警配置吗?',
      icon: <ExclamationCircleOutlined />,
      content: `该告警删除后无法恢复`,
      onOk() {
        return postApiV1ThingsRuleAlarmInfo__openAPI__delete({ id })
          .then((res) => {
            if (res.code === ResponseCode.SUCCESS) {
              message.success('删除成功');
              refresh();
            }
          })
          .catch((error) => {
            message.error(error.msg);
          });
      },
    });
  };

  return (
    <PageContainer>
      {/* <Card bordered={false}>筛选</Card> */}
      <Card bordered={false} className={styles.card}>
        <Link to="/alarmMangers/alarmConfiguration/save">
          <Button type="primary">新增</Button>
        </Link>
        <Spin spinning={loading}>
          <div className={styles.container}>
            <Row gutter={[24, 24]}>
              {alarmData?.list?.map((item) => (
                <Col key={item.id} sm={24} md={12} xl={8} xxl={6}>
                  <div
                    className={classNames(styles['alarm-item'], {
                      [styles.hover]: hoverKey === item.id,
                    })}
                  >
                    <div
                      className={styles['alarm-content']}
                      onMouseEnter={() => setHoverKey(item.id)}
                      onMouseLeave={() => setHoverKey(undefined)}
                    >
                      <div className={styles['alarm-head']}>
                        <div className={styles['alarm-title']}>
                          {item.name}
                          <WarningOutlined style={{ color: '#ffb700', marginLeft: '4px' }} />
                        </div>
                        <div
                          className={classNames(styles.status, {
                            [styles['start-use']]: item.state === 1,
                          })}
                        >
                          <div style={{ transform: 'skewX(-45deg)' }}>
                            {item.state === 1 ? (
                              <Badge status="success" text="正常" />
                            ) : (
                              <Badge status="error" text="禁用" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles['alarm-info']}>
                        <div>
                          <div className={styles['alarm-label']}>关联场景联动</div>
                          <div>关联1,关联2</div>
                        </div>
                        <div>
                          <div className={styles['alarm-label']}>告警级别</div>
                          <div>{levelMap.get(item.level)?.text}</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.operation}>
                      <Button
                        className={styles.btn}
                        icon={<EditOutlined />}
                        onClick={() => {
                          navigate(
                            `/alarmMangers/alarmConfiguration/save?id=${
                              item.id
                            }&name=${encodeURIComponent(item.name)}`,
                          );
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        className={styles.btn}
                        icon={<PlayCircleOutlined />}
                        onClick={() => handleStartUse(item)}
                      >
                        {item.state === 1 ? '禁用' : '启用'}
                      </Button>
                      <Tooltip title={item.state === 1 && '请先禁用该警告，再删除'}>
                        <Button
                          disabled={item.state === 1}
                          className={styles['delete-btn']}
                          icon={
                            <DeleteOutlined
                              style={{ color: item.state === 1 ? 'rgba(0,0,0,.25)' : '#ff4d4f' }}
                            />
                          }
                          onClick={() => handleDelete(item.id || 0)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            {alarmData?.list?.length === 0 && <Empty />}
          </div>
          <div className={styles.pagination}>
            <Pagination
              total={alarmData?.total}
              showTotal={(total, range) => `第${range[0]}-${range[1]} 条/总共 ${total} 条`}
              pageSize={pageInfo.size}
              current={pageInfo.page}
              onChange={(page, size) => setPageInfo({ page, size })}
              size="small"
              showSizeChanger
              hideOnSinglePage={true}
            />
          </div>
        </Spin>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
