import { postApiV1ThingsRuleAlarmInfoIndex } from '@/services/iThingsapi/gaojingguanli';
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Button, Card, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { AlarmInfo } from './data';
import styles from './index.less';

const levelMap = new Map([
  [1, '提醒'],
  [2, '一般'],
  [3, '严重'],
  [5, '超紧急'],
]);

const IndexPage: React.FC = () => {
  const [alarmData, setAlarmData] = useState<Partial<AlarmInfo>>();

  useRequest(postApiV1ThingsRuleAlarmInfoIndex, {
    defaultParams: [{ page: { page: 1, size: 10 } }],
    onSuccess: (result) => {
      setAlarmData(result.data);
    },
    onError: (error) => {
      message.error('获取告警信息列表错误:' + error.message);
    },
  });

  return (
    <PageContainer>
      <Card bordered={false}>筛选</Card>
      <Card bordered={false} className={styles.card}>
        <Link to="/alarmMangers/alarmConfiguration/add">
          <Button type="primary">新增</Button>
        </Link>
        <div className={styles.container}>
          {alarmData?.list?.map((item) => (
            <div className={styles['alarm-item']} key={item.id}>
              <div className={styles['alarm-content']}>
                <div className={styles['alarm-head']}>
                  <div className={styles['alarm-title']}>
                    {item.name}
                    <WarningOutlined style={{ color: '#ffb700', marginLeft: '4px' }} />
                  </div>
                </div>
                <div className={styles['alarm-info']}>
                  <div>
                    <div className={styles['alarm-label']}>关联场景联动</div>
                    <div>关联1,关联2</div>
                  </div>
                  <div>
                    <div className={styles['alarm-label']}>告警级别</div>
                    <div>{levelMap.get(item.level)}</div>
                  </div>
                </div>
              </div>
              <div className={styles.operation}>
                <Button className={styles.btn} icon={<EditOutlined />}>
                  编辑
                </Button>
                <Button className={styles.btn} icon={<PlayCircleOutlined />}>
                  启用
                </Button>
                <Button
                  className={styles['delete-btn']}
                  icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
