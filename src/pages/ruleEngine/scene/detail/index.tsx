import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';

export type BoxItemType = {
  list: API.scene[];
};

const DetailPage = () => {
  return (
    <PageContainer>
      <Card>详情</Card>
    </PageContainer>
  );
};

export default DetailPage;
