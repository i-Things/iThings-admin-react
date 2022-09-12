import Schema from '@/pages/product/detail/pages/topic/schema';
import { Card, Tabs } from 'antd';
import React from 'react';

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
