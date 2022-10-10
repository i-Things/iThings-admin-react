import TimeFilter from '@/components/TimeFilter';
import { postThingsDeviceMsgHubLogIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { DefaultPage, initialTime } from '@/utils/base';
import { DEVICE_LOG_LEVEL_VALUE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { SyncOutlined } from '@ant-design/icons';
import Switch from '@ant-design/pro-form/lib/components/Switch';
import { useAntdTable } from 'ahooks';
import { Card, Col, Input, Row, Table } from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import { debounce } from 'lodash';
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { useParams } from 'umi';
import type { PageInfo } from '../../../data';
import styles from './index.less';

const actions = ['connected', 'disconnected', 'property', 'event', 'action'];

const localLogColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val)),
  },
  {
    title: '类别',
    dataIndex: 'action',
    key: 'action',
    render: (val: string) => DEVICE_LOG_LEVEL_VALUE[val].text || '-',
  },
  {
    title: 'RequestID',
    dataIndex: 'requestID',
    key: 'requestID',
    render: (val: string) => val || '-',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    render: (val: string) => val || '-',
  },
  {
    title: '结果',
    dataIndex: 'resultType',
    key: 'resultType',
    render: (val: string) => val || '-',
  },
];

const DevicePage: React.FC = () => {
  const params = useParams() as { id: string; name: string };
  const { id = '', name = '' } = params;

  const [timeRange, setTimeRange] = useState<RangePickerProps['value']>(initialTime);
  const [isRefresh, setRefresh] = useState(false);
  const [filterParams, setFilterParams] = useState({ content: '', requestID: '' });

  /** 获取云端诊断日志 */
  const cloudLogTable = async ({ current, pageSize }: PageInfo) => {
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      actions,
      deviceName: name,
      productID: id,
      timeStart: timeRange?.[0]?.valueOf().toString() ?? '',
      timeEnd: timeRange?.[1]?.valueOf().toString() ?? '',
      ...filterParams,
      page,
    };

    const res = await postThingsDeviceMsgHubLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取云端诊断日志
  const { tableProps, refresh } = useAntdTable(cloudLogTable, {
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRange, isRefresh, filterParams],
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
          <TimeFilter onChange={(val) => setTimeRange(val)} />
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
        <Table size="middle" rowKey="requestID" columns={localLogColumns} {...tableProps} />
      </div>
    </Card>
  );
};

export default DevicePage;
