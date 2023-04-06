import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import BasicPage from './pages/basicConfig';

const items = [{ key: '1', label: '基础配置', children: <BasicPage /> }];

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
