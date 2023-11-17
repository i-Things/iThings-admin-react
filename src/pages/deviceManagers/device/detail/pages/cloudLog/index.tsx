import TimeFilter from '@/components/TimeFilter';
import { resetTimeRange } from '@/components/TimeFilter/utils';
import { postApiV1ThingsDeviceMsgHubLogIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { DefaultPage, getInitialTime } from '@/utils/base';
import { timestampToDateStr } from '@/utils/date';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import Switch from '@ant-design/pro-form/lib/components/Switch';
import { useAntdTable } from 'ahooks';
import { Card, Col, Input, Row, Table, Tooltip } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import type { DeviceInfo, PageInfo } from '../../../data';
import styles from './index.less';

const localLogColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val), 'YYYY-MM-DD HH:mm:ss.SSS'),
    width: 200,
  },
  {
    title: '类别',
    dataIndex: 'action',
    key: 'action',
    render: (val: string) => val || '-',
  },
  {
    title: 'RequestID',
    dataIndex: 'requestID',
    key: 'requestID',
    render: (val: string) => val || '-',
    width: 200,
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    render: (val: string) => val || '-',
    width: 300,
  },
  {
    title: () => (
      <>
        <span>结果</span>
        <Tooltip title="200表示成功,其他为错误码">
          <QuestionCircleOutlined className={styles.icon} />
        </Tooltip>
      </>
    ),
    dataIndex: 'resultType',
    key: 'resultType',
    render: (val: string) => val || '-',
  },
];

const DevicePage: React.FC<DeviceInfo> = (props) => {
  const { productID, deviceName, deviceIsChange } = props;

  const initialTime = getInitialTime();

  const [timeRangeInfo, setTimeRangeInfo] = useState({ timeRange: initialTime, type: 0 });

  const [isRefresh, setRefresh] = useState(false);
  const [filterParams, setFilterParams] = useState({ content: '', requestID: '' });

  /** 获取云端诊断日志 */
  const cloudLogTable = async ({ current, pageSize }: PageInfo) => {
    let startTime, endTime;
    if (isRefresh && timeRangeInfo.type <= 4) {
      const { startTime: start, endTime: end } = resetTimeRange(timeRangeInfo.type);
      startTime = moment(start);
      endTime = timeRangeInfo.type === 3 ? moment(end) : '0';
    } else {
      startTime = timeRangeInfo.timeRange[0];
      endTime = timeRangeInfo.timeRange[1];
    }
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      actions: null!,
      deviceName,
      productID,
      timeStart: startTime?.valueOf().toString() ?? '',
      timeEnd: endTime?.valueOf().toString() ?? '',
      ...filterParams,
      page,
    };

    const res = await postApiV1ThingsDeviceMsgHubLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取云端诊断日志
  const { tableProps, refresh } = useAntdTable(cloudLogTable, {
    defaultPageSize: DefaultPage.size,
    ready: !!productID,
    refreshDeps: [timeRangeInfo, isRefresh, filterParams, deviceIsChange],
    pollingInterval: isRefresh ? 5000 : 0,
  });

  /** 是否自动刷新 */
  const refreshChange = (checked: boolean) => {
    setRefresh(checked);
  };

  /** 修改内容筛选 */
  const handleChangeContent: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterParams((val) => ({
      ...val,
      content: e.target.value,
    }));
  };

  /** 修改RequestID筛选 */
  const handleChangeRequestID: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterParams((val) => ({
      ...val,
      requestID: e.target.value,
    }));
  };

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col>
          <TimeFilter
            onChange={(val, type) => {
              setTimeRangeInfo({ timeRange: val, type });
            }}
          />
        </Col>
        <Col>
          <div className={styles.refresh}>
            <SyncOutlined className={styles['refresh-icon']} onClick={refresh} />
            <Switch fieldProps={{ onChange: refreshChange }} />
            <span style={{ paddingLeft: 10 }}>自动刷新</span>
          </div>
        </Col>
        <Col>
          <span>内容关键字：</span>
          <Input
            style={{ width: 300 }}
            placeholder="请输入内容关键字"
            onChange={debounce(handleChangeContent, 300)}
            allowClear
          />
        </Col>
        <Col>
          <span>RequestID：</span>
          <Input
            style={{ width: 300 }}
            placeholder="请输入RequestID"
            onChange={debounce(handleChangeRequestID, 300)}
            allowClear
          />
        </Col>
      </Row>
      <div style={{ marginTop: 20 }}>
        <Table size="middle" rowKey="tranceID" columns={localLogColumns} {...tableProps} />
      </div>
    </Card>
  );
};

export default DevicePage;
