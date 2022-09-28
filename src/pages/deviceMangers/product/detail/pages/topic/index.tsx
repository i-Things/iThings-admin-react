import { Card, Tabs } from 'antd';
import React from 'react';
import Schema from './components/schema';

const { TabPane } = Tabs;

const TopicPage: React.FC = () => {
  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab="物模型通讯topic" key="1">
          <Schema />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default TopicPage;
