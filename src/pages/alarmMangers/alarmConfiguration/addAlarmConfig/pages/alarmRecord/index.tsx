import AlarmRecordItem from '@/pages/alarmMangers/components/alarmRecordItem';
import type { RecordData } from '@/pages/alarmMangers/components/alarmRecordItem/data';
import { postApiV1ThingsRuleAlarmRecordIndex } from '@/services/iThingsapi/gaojingjilu';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Col, Empty, message, Pagination, Row, Spin } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const AlarmRecord = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const alarmName = searchParams.get('name');

  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  const [recordData, setRecordData] = useState<Partial<RecordData>>();

  const { loading, refresh } = useRequest(postApiV1ThingsRuleAlarmRecordIndex, {
    defaultParams: [{ page: pageInfo, alarmID: Number(id) }],
    refreshDeps: [pageInfo],
    onSuccess: (result) => {
      setRecordData(result.data);
    },
    onError: (error) => {
      message.error('获取告警记录列表错误:' + error.message);
    },
  });

  return (
    <div>
      <Spin spinning={loading}>
        <Row gutter={[24, 24]} style={{ minHeight: '200px' }}>
          {recordData?.list?.map((item) => (
            <Col key={item.id} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <AlarmRecordItem recordData={item} alarmName={alarmName || ''} refresh={refresh} />
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
    </div>
  );
};

export default AlarmRecord;
