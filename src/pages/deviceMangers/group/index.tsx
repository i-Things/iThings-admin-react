import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import GroupList from './components/GroupList';

const Group: React.FC = () => {
  return (
    <PageContainer>
      <GroupList />
    </PageContainer>
  );
};

export default Group;
