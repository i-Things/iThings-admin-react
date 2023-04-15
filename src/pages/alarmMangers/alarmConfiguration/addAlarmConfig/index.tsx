import { PageContainer } from '@ant-design/pro-layout';
import { useSearchParams } from '@umijs/max';
import { Card, message, Tabs } from 'antd';
import { useState } from 'react';
import AboutScene from './pages/aboutScene';
import AlarmRecord from './pages/alarmRecord';
import BasicPage from './pages/basicConfig';

const items = [
  { key: '1', label: '基础配置', children: <BasicPage /> },
  { key: '2', label: '关联场景联动', children: <AboutScene /> },
  { key: '3', label: '告警记录', children: <AlarmRecord /> },
];

const IndexPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [activeKey, setActiveKey] = useState('1');

  const handleChange = (key: string) => {
    if (!id && (key === '2' || key === '3')) {
      message.warning('请先保存基础配置');
      return;
    }
    setActiveKey(key);
  };

  return (
    <PageContainer>
      <Card>
        <Tabs onChange={handleChange} destroyInactiveTabPane items={items} activeKey={activeKey} />
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
