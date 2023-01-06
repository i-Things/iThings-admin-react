import { PageContainer } from '@ant-design/pro-layout';
import { history, useParams } from '@umijs/max';
import { Card, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

import DeviceInfoPage from './pages/deviceInfo/index';

import CloudLogPage from './pages/cloudLog/index';
import DeviceCloudLogPage from './pages/deviceCloudLog/index';
import DeviceLocalLogPage from './pages/deviceLocalLog/index';
import SubDevicePage from './pages/SubDevice/index';

import { postThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useRequest } from 'ahooks';
import type { DeviceInfo } from '../data';
import styles from './index.less';
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
  const params = useParams() as { id: string; name: string; type: string };
  const { id = '', name = '', type = '1' } = params;

  const [activeKey, setActiveKey] = useState('1');

  useEffect(() => {
    setActiveKey(type || '1');
  }, [type]);

  /** 获取产品详情,用于判断是否展示子设备管理-只有网关类型才展示 */
  const { data } = useRequest(postThingsProductInfoIndex, {
    defaultParams: [
      {
        productIDs: [id],
      },
    ],
    onError: (error) => {
      message.error('获取产品错误:' + error.message);
    },
  });

  return (
    <PageContainer title=" " content={<Content productID={id} deviceName={name} />}>
      <Card style={{ marginTop: 10 }}>
        <Tabs
          activeKey={activeKey}
          destroyInactiveTabPane
          onChange={(key) => history.push(`/deviceMangers/device/detail/${id}/${name}/${key}`)}
        >
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
          {data?.data?.list?.[0].deviceType === 2 && (
            <TabPane tab="子设备管理" key="7">
              <SubDevicePage productID={id} deviceName={name} />
            </TabPane>
          )}
          {/* <TabPane tab="分组" key="8">
            <GroupPage />
          </TabPane> */}
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
