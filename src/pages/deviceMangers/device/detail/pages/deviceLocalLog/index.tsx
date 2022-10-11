import TimeFilter from '@/components/TimeFilter';
import { postThingsDeviceMsgSdkLogIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { DefaultPage, initialTime } from '@/utils/base';
import { DEVICE_LOG_LEVEL_VALUE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { useAntdTable } from 'ahooks';
import { Card, Table } from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import React, { useState } from 'react';
import { useParams } from 'umi';
import type { PageInfo } from '../../../data';

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

const DevicePage: React.FC = () => {
  const params = useParams() as { id: string; name: string };
  const { id = '', name = '' } = params;

  const [timeRange, setTimeRange] = useState<RangePickerProps['value']>(initialTime);

  /** 获取本地日志 */
  const localLogTable = async ({ current, pageSize }: PageInfo) => {
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      productID: id,
      deviceName: name,
      timeStart: timeRange?.[0]?.valueOf().toString() ?? '',
      timeEnd: timeRange?.[1]?.valueOf().toString() ?? '',
      page,
    };

    const res = await postThingsDeviceMsgSdkLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取本地日志
  const { tableProps } = useAntdTable(localLogTable, {
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRange],
  });

  return (
    <Card>
      <TimeFilter onChange={(val) => setTimeRange(val)} />
      <div style={{ marginTop: 20 }}>
        <Table size="middle" rowKey="timestamp" columns={localLogColumns} {...tableProps} />
      </div>
    </Card>
  );
};

export default DevicePage;
