import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Tabs } from 'antd';
import React from 'react';
import { useParams } from 'umi';

import DeviceInfoPage from '../deviceInfo/index';

import CloudLogPage from '../cloudLog/index';
import DeviceCloudLogPage from '../deviceCloudLog/index';
import DeviceLocalLogPage from '../deviceLocalLog/index';

import DeviceShadowPage from '../deviceShadow/index';
import GroupPage from '../group/index';
import { default as OnlineDebugPage, default as SubDevicePage } from '../onlineDebug/index';
const { TabPane } = Tabs;
const IndexPage: React.FC = () => {
  const params = useParams() as { id: string };
  const PID = params.id ?? '';
  const content = '设备ID: ' + PID;
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <PageContainer content={content}>
      <Card>
        <Descriptions title="设备信息">
          <Descriptions.Item label="ProductKey">1982992</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="设备信息" key="1">
            <DeviceInfoPage />
          </TabPane>
          <TabPane tab="云端诊断日志" key="2">
            <CloudLogPage />
          </TabPane>
          <TabPane tab="设备云端日志" key="3">
            <DeviceCloudLogPage />
          </TabPane>
          <TabPane tab="设备本地日志" key="4">
            <DeviceLocalLogPage />
          </TabPane>
          <TabPane tab="设备影子" key="5">
            <DeviceShadowPage />
          </TabPane>
          <TabPane tab="在线调试" key="6">
            <OnlineDebugPage />
          </TabPane>
          <TabPane tab="子设备管理" key="7">
            <SubDevicePage />
          </TabPane>
          <TabPane tab="分组" key="8">
            <GroupPage />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
