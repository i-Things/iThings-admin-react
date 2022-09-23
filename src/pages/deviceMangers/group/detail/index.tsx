import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import GroupDescriptons from '../components/GroupDescriptons';
import GroupListPage from '../components/GroupList';
import DeviceListPage from './pages/deviceList';
const { TabPane } = Tabs;

const IndexPage: React.FC<{ parentID: number }> = ({ parentID }) => {
  const [activeKey, setActiveKey] = useState('1');
  const onChange = (key: string) => setActiveKey(key);
  const location = useLocation();
  useEffect(() => {
    setActiveKey('1');
  }, [location]);

  return (
    <PageContainer onBack={() => history.back()}>
      <Card>
        <GroupDescriptons borderFlag={false} />
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Tabs activeKey={activeKey} onChange={onChange}>
          <TabPane tab="分组信息" key="1">
            <GroupDescriptons borderFlag={true} />
          </TabPane>
          <TabPane tab="设备列表" key="2">
            <DeviceListPage />
          </TabPane>
          <TabPane tab="子分组列表" key="3">
            <GroupListPage flag="son" parentID={parentID} />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
