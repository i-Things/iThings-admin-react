import TimeFilter from '@/components/TimeFilter';
import { postApiV1ThingsDeviceMsgSdkLogIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { DefaultPage, getInitialTime } from '@/utils/base';
import { DEVICE_LOG_LEVEL_FORM, DEVICE_LOG_LEVEL_VALUE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { useAntdTable } from 'ahooks';
import { Card, Col, Row, Select, Table } from 'antd';
import React, { useState } from 'react';
import type { DeviceInfo, PageInfo } from '../../../data';

const localLogColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val)),
  },
  {
    title: '日志等级',
    dataIndex: 'loglevel',
    key: 'loglevel',
    render: (val: string) => DEVICE_LOG_LEVEL_VALUE[val].text || '-',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    render: (val: string) => val || '-',
  },
];

const DevicePage: React.FC<DeviceInfo> = (props) => {
  const { productID, deviceName, deviceIsChange } = props;

  const initialTime = getInitialTime();

  const [timeRange, setTimeRange] = useState(initialTime);
  const [logLevel, setLogLevel] = useState<number>();

  /** 获取本地日志 */
  const localLogTable = async ({ current, pageSize }: PageInfo) => {
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      productID,
      deviceName,
      logLevel,
      timeStart: timeRange?.[0]?.valueOf().toString() ?? '',
      timeEnd: timeRange?.[1]?.valueOf().toString() ?? '',
      page,
    };

    const res = await postApiV1ThingsDeviceMsgSdkLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取本地日志
  const { tableProps } = useAntdTable(localLogTable, {
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRange, logLevel, deviceIsChange],
    ready: !!productID,
  });

  return (
    <Card>
      <Row gutter={[16, 0]}>
        <Col>
          <TimeFilter onChange={(val) => setTimeRange(val)} />
        </Col>
        <Col>
          <span>日志等级：</span>
          <Select
            placeholder="请选择日志等级"
            options={DEVICE_LOG_LEVEL_FORM}
            onChange={(value) => {
              setLogLevel(value);
            }}
            style={{ width: 200 }}
            allowClear
          />
        </Col>
      </Row>
      <div style={{ marginTop: 20 }}>
        <Table size="middle" rowKey="timestamp" columns={localLogColumns} {...tableProps} />
      </div>
    </Card>
  );
};

export default DevicePage;
