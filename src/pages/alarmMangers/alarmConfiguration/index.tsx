import {
  postApiV1ThingsRuleAlarmInfoIndex,
  postApiV1ThingsRuleAlarmInfoUpdate,
  postApiV1ThingsRuleAlarmInfo__openAPI__delete,
} from '@/services/iThingsapi/gaojingguanli';
import { ResponseCode } from '@/utils/base';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
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
  Pagination,
  Popconfirm,
  Row,
  Spin,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import alarmImg from '../img/alarm.png';
import type { AlarmItem } from './data';
import styles from './index.less';

export const levelMap = new Map([
  [5, { text: '超紧急', bgColor: 'rgb(229, 0, 18)' }],
  [4, { text: '紧急', bgColor: 'rgb(255, 148, 87)' }],
  [3, { text: '严重', bgColor: 'rgb(250, 189, 71)' }],
  [2, { text: '一般', bgColor: '#999' }],
  [1, { text: '提醒', bgColor: '#bfbfbf' }],
]);

const IndexPage: React.FC = () => {
  const [hoverKey, setHoverKey] = useState<number>();
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const navigate = useNavigate();

  const {
    loading,
    refresh,
    data: alarmData,
  } = useRequest(postApiV1ThingsRuleAlarmInfoIndex, {
    defaultParams: [{ page: pageInfo }],
    refreshDeps: [pageInfo],
    onError: (error) => {
      message.error('获取告警信息列表错误:' + error.message);
    },
  });

  /** 启用告警 */
  const handleStartUse = (value: AlarmItem) => {
    setConfirmLoading(true);
    postApiV1ThingsRuleAlarmInfoUpdate({ ...value, state: value.state === 1 ? 2 : 1 })
      .then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          message.success(`${value.state === 1 ? '禁用' : '启用'}成功`);
          refresh();
        }
      })
      .catch((error) => {
        message.error(error.msg);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  /** 删除告警 */
  const handleDelete = async (id: number) => {
    setConfirmLoading(true);
    postApiV1ThingsRuleAlarmInfo__openAPI__delete({ id })
      .then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          message.success('删除成功');
          refresh();
        }
      })
      .catch((error) => {
        message.error(error.msg);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <PageContainer>
      <Card bordered={false} className={styles.card}>
        <Link to="/alarmMangers/alarmConfiguration/save">
          <Button type="primary">新增</Button>
        </Link>
        <Spin spinning={loading}>
          <div className={styles.container}>
            <Row gutter={[24, 24]}>
              {alarmData?.data?.list?.map((item) => (
                <Col key={item.id} sm={24} md={12} xl={12} xxl={6}>
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
                      <Row gutter={24}>
                        <Col>
                          <img src={alarmImg} width={88} height={88} />
                        </Col>
                        <Col>
                          <div className={styles['alarm-title']}>{item.name}</div>
                          <div className={styles['alarm-info']}>
                            <div className={styles['alarm-label']}>告警级别</div>
                            <div>{levelMap.get(item.level)?.text}</div>
                          </div>
                        </Col>
                      </Row>
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
                      <Popconfirm
                        title={`确定${item.state === 1 ? '禁用' : '启用'}?`}
                        onConfirm={() => handleStartUse(item)}
                        okButtonProps={{ loading: confirmLoading }}
                      >
                        <Button
                          className={styles.btn}
                          icon={item.state === 1 ? <CloseCircleOutlined /> : <PlayCircleOutlined />}
                        >
                          {item.state === 1 ? '禁用' : '启用'}
                        </Button>
                      </Popconfirm>
                      <Popconfirm
                        title="确认删除?"
                        onConfirm={() => handleDelete(item.id || 0)}
                        okButtonProps={{ loading: confirmLoading }}
                      >
                        <Tooltip title={item.state === 1 && '请先禁用该警告，再删除'}>
                          <Button
                            disabled={item.state === 1}
                            className={styles['delete-btn']}
                            icon={
                              <DeleteOutlined
                                style={{ color: item.state === 1 ? 'rgba(0,0,0,.25)' : '#ff4d4f' }}
                              />
                            }
                          />
                        </Tooltip>
                      </Popconfirm>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            {alarmData?.data?.list?.length === 0 && <Empty />}
          </div>
          <div className={styles.pagination}>
            <Pagination
              total={alarmData?.data?.total}
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
