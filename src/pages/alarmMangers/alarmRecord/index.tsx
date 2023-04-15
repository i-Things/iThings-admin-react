import AlarmRecordItem from '@/pages/alarmMangers/components/alarmRecordItem';
import type { RecordData } from '@/pages/alarmMangers/components/alarmRecordItem/data';
import { postApiV1ThingsRuleAlarmInfoIndex } from '@/services/iThingsapi/gaojingguanli';
import { postApiV1ThingsRuleAlarmRecordIndex } from '@/services/iThingsapi/gaojingjilu';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Col, Empty, message, Pagination, Row, Spin } from 'antd';
import { useMemo, useState } from 'react';
import type { AlarmItem } from '../alarmConfiguration/data';
import styles from './index.less';

const AlarmRecord = () => {
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  const [recordData, setRecordData] = useState<Partial<RecordData>>();
  const [alarmData, setAlarmData] = useState<Partial<AlarmItem[]>>();

  /** 获取告警记录 */
  const { loading } = useRequest(postApiV1ThingsRuleAlarmRecordIndex, {
    defaultParams: [{ page: pageInfo }],
    refreshDeps: [pageInfo],
    onSuccess: (result) => {
      setRecordData(result.data);
    },
    onError: (error) => {
      message.error('获取告警记录列表错误:' + error.message);
    },
  });

  const alarmIDs = useMemo(() => {
    return Array.from(new Set(recordData?.list?.map((item) => item.alarmID || 0)));
  }, [recordData?.list]);

  /** 获取告警列表，用于匹配告警记录的告警名称 */
  const { loading: alarmLoading } = useRequest(postApiV1ThingsRuleAlarmInfoIndex, {
    defaultParams: [{ alarmIDs }],
    refreshDeps: [alarmIDs],
    ready: !!alarmIDs.length,
    onSuccess: (result) => {
      setAlarmData(result.data.list);
    },
    onError: (error) => {
      message.error('获取告警名称错误:' + error.message);
    },
  });

  /** 添加告警名称到告警记录数据中 */
  const recordList = useMemo(() => {
    return (
      (recordData &&
        alarmData &&
        recordData?.list?.map((item) => {
          let alarmName;
          alarmData?.some((list) => {
            if (list?.id === item.alarmID) {
              alarmName = list?.name;
            }
            return list?.id === item.alarmID;
          });
          return {
            ...item,
            alarmName,
          };
        })) ||
      []
    );
  }, [alarmData, recordData]);

  return (
    <PageContainer>
      <Spin spinning={loading || alarmLoading}>
        <Row gutter={[24, 24]} style={{ minHeight: '200px' }}>
          {recordList?.map((item) => (
            <Col key={item.id} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <AlarmRecordItem recordData={item} alarmName={item.alarmName || ''} />
            </Col>
          ))}
          {recordData?.list?.length === 0 && (
            <Col span={24}>
              <Empty />
            </Col>
          )}
        </Row>
        <div className={styles.pagination}>
          <Pagination
            total={recordData?.total}
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
    </PageContainer>
  );
};

export default AlarmRecord;
