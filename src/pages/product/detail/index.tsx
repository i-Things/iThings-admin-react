import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Tabs } from 'antd';
import React from 'react';
import { useParams } from 'umi';
import DevicePage from './pages/device/index';
import ModelPage from './pages/model/index';
import ProductInfoPage from './pages/productInfo/index';
import TopicPage from './pages/topic/index';

const { TabPane } = Tabs;
const IndexPage: React.FC = () => {
  const params = useParams() as { id: string };
  const PID = params.id ?? '';
  const content = '产品ID: ' + PID;

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <PageContainer content={content}>
      <Card>
        <Descriptions title="产品信息">
          <Descriptions.Item label="ProductKey">1982992</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="产品信息" key="1">
            <ProductInfoPage />
          </TabPane>
          <TabPane tab="Topic 类列表" key="2">
            <TopicPage />
          </TabPane>
          <TabPane tab="物模型" key="3">
            <ModelPage />
          </TabPane>
          <TabPane tab="设备列表" key="4">
            <DevicePage />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
