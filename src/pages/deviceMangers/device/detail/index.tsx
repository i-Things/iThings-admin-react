import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import React from 'react';
import { useParams } from 'umi';

import DeviceInfoPage from './pages/deviceInfo/index';

import CloudLogPage from './pages/cloudLog/index';
import DeviceCloudLogPage from './pages/deviceCloudLog/index';
import DeviceLocalLogPage from './pages/deviceLocalLog/index';

import ProDescriptions from '@ant-design/pro-descriptions';
import type { DeviceInfo } from '../data';
import styles from './index.less';
import GroupPage from './pages/group/index';
import OnlineDebugPage from './pages/onlineDebug';

const { TabPane } = Tabs;

const columns = [
  {
    title: '设备名称',
    key: 'name',
    dataIndex: 'name',
    copyable: true,
  },
  {
    title: '产品ID',
    key: 'id',
    dataIndex: 'id',
    copyable: true,
  },
];

const Content: React.FC<DeviceInfo> = (props) => {
  const { productID, deviceName } = props;

  return (
    <ProDescriptions
      className={styles.descriptions}
      title=""
      dataSource={{ name: deviceName, id: productID }}
      colon={false}
      columns={columns}
    />
  );
};

const IndexPage: React.FC = () => {
  const params = useParams() as { id: string; name: string };
  const { id = '', name = '' } = params;

  return (
    <PageContainer title=" " content={<Content productID={id} deviceName={name} />}>
      <Card style={{ marginTop: 10 }}>
        <Tabs defaultActiveKey="1" destroyInactiveTabPane>
          <TabPane tab="设备信息" key="1">
            <DeviceInfoPage />
          </TabPane>
          <TabPane tab="云端诊断日志" key="2">
            <CloudLogPage productID={id} deviceName={name} />
          </TabPane>
          <TabPane tab="设备云端日志" key="3">
            <DeviceCloudLogPage productID={id} deviceName={name} />
          </TabPane>
          <TabPane tab="设备本地日志" key="4">
            <DeviceLocalLogPage productID={id} deviceName={name} />
          </TabPane>
          {/* <TabPane tab="设备影子" key="5">
            <DeviceShadowPage />
          </TabPane> */}
          <TabPane tab="在线调试" key="6">
            <OnlineDebugPage productID={id} deviceName={name} />
          </TabPane>
          {/* <TabPane tab="子设备管理" key="7">
            <SubDevicePage />
          </TabPane> */}
          <TabPane tab="分组" key="8">
            <GroupPage />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
