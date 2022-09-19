import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import React from 'react';
import { useParams } from 'umi';
import GroupDescriptons from '../components/GroupDescriptons';
import DeviceListPage from './pages/deviceList';
const { TabPane } = Tabs;

const IndexPage: React.FC = () => {
  const params = useParams() as { id: string };
  const groupID = params.id ?? '';
  const onChange = (/*key: string*/) => {};

  return (
    <PageContainer>
      <Card>
        <GroupDescriptons borderFlag={false} groupID={groupID} />
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="分组信息" key="1">
            <GroupDescriptons borderFlag={true} groupID={groupID} />
          </TabPane>
          <TabPane tab="设备列表" key="2">
            <DeviceListPage />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
