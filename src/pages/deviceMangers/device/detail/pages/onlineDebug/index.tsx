import { postApiV1ThingsDeviceMsgHubLogIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { DefaultPage } from '@/utils/base';
import { milliTdToDate } from '@/utils/date';
import { useRequest } from 'ahooks';
import { Card, Col, message, Row, Table, Tabs } from 'antd';
import React, { useState } from 'react';
import type { DeviceInfo } from '../../../data';
import SendMsg from './components/sendMsg';
import type { debugType } from './data';

const { TabPane } = Tabs;

const timeStart = String(Date.now());

/** 在线调试 */
const OnLineDebug: React.FC<DeviceInfo> = (props) => {
  const { productID, deviceName, deviceIsChange } = props;
  const [contentData, setContentData] = useState<debugType[]>([]);

  // 获取内容日志
  useRequest(
    async () => {
      const res = await postApiV1ThingsDeviceMsgHubLogIndex({
        timeStart,
        productID,
        deviceName,
        page: DefaultPage,
      });
      return res.data;
    },
    {
      refreshDeps: [deviceIsChange],
      pollingInterval: 5000,
      ready: !!productID,
      onSuccess: (result) => {
        setContentData(result?.list ?? []);
      },
      onError: (error) => {
        message.error('获取产品信息错误:' + error.message);
      },
    },
  );

  const contentColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (val: string) => {
        return milliTdToDate(val);
      },
    },
    {
      title: '操作类型',
      dataIndex: 'action',
      key: 'action',
      render: (val: string) => val || '-',
    },
    {
      title: '主题',
      dataIndex: 'topic',
      key: 'topic',
      render: (val: string) => val || '-',
    },
    {
      title: '详细信息',
      dataIndex: 'content',
      key: 'content',
      render: (val: string) => val || '-',
    },
  ];
  const debugLogConfig = {
    scroll: { y: 650 },
  };
  return (
    <Card>
      <Row>
        <Col span={12}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="下行指令调试" key="1">
              <SendMsg />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={12}>
          <Table
            pagination={false}
            size="middle"
            dataSource={contentData}
            columns={contentColumns}
            {...debugLogConfig}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default OnLineDebug;
