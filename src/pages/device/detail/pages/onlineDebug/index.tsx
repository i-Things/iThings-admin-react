import { debugType } from '@/pages/device/detail/pages/onlineDebug/data';
import SendMsg from '@/pages/device/detail/pages/onlineDebug/sendMsg';
import { postThingsDeviceMsgHubLogIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { DefaultPage } from '@/utils/base';
import { milliTdToDate } from '@/utils/date';
import { useRequest } from 'ahooks';
import { Card, Col, message, Row, Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

const DevicePage: React.FC = () => {
  const { TabPane } = Tabs;
  const [contentData, setContentData] = useState<debugType[]>([]);
  // 获取内容日志
  const param = {
    productID: '24GFTgusn1C',
    deviceName: 'test5',
    page: DefaultPage,
  };
  const { run } = useRequest(postThingsDeviceMsgHubLogIndex, {
    defaultParams: [param],
    onSuccess: (result) => {
      setContentData(result?.data?.list ?? []);
    },
    onError: (error) => {
      message.error('获取产品信息错误:' + error.message);
    },
  });

  // useEffect方法的第一个参数是一个函数，函数可以return一个方法，这个方法就是在组件销毁的时候会被调用
  useEffect(() => {
    const timer = setInterval(() => {
      run(param);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
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
              <SendMsg productID="24GFTgusn1C" deviceName="test5" />
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

export default DevicePage;
