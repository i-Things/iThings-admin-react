import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import AboutScene from './pages/aboutScene';
import AlarmRecord from './pages/alarmRecord';
import BasicPage from './pages/basicConfig';

const items = [
  { key: '1', label: '基础配置', children: <BasicPage /> },
  { key: '2', label: '关联场景联动', children: <AboutScene /> },
  { key: '3', label: '告警记录', children: <AlarmRecord /> },
];

const IndexPage: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Tabs destroyInactiveTabPane items={items} />
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
