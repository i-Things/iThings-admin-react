import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from '@umijs/max';
import { Card, Tabs } from 'antd';
import React, { useState } from 'react';
import GroupDescriptons from '../components/GroupDescriptons';
import GroupListPage from '../components/GroupList';
import type { activeKeyProps } from '../types';
import DeviceListPage from './pages/deviceList';

const { TabPane } = Tabs;

const IndexPage: React.FC = () => {
  const params = useParams() as { id: string };
  const parentID = params.id ?? '';

  const [activeKey, setActiveKey] = useState<activeKeyProps>('1');

  const onChange = (key: string) => setActiveKey(key as activeKeyProps);

  const activeKeyChange = () => onChange('1');

  return (
    <PageContainer onBack={() => history.back()}>
      <Card>
        <GroupDescriptons borderFlag={false} activeKeyChange={activeKeyChange} flag="groupInfo" />
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Tabs activeKey={activeKey} onChange={onChange}>
          <TabPane tab="分组信息" key="1">
            <GroupDescriptons
              borderFlag={true}
              activeKeyChange={activeKeyChange}
              flag="groupInfo"
            />
            <div style={{ marginBottom: '20px' }} />
            <GroupDescriptons borderFlag={false} activeKeyChange={activeKeyChange} flag="tagInfo" />
          </TabPane>
          <TabPane tab="设备列表" key="2">
            <DeviceListPage activeKey={activeKey} />
          </TabPane>
          <TabPane tab="子分组列表" key="3">
            <GroupListPage flag="son" parentID={parentID} activeKey={activeKey} />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
