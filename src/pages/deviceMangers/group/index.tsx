import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import GroupList from './components/GroupList';

const Group: React.FC = () => {
  return (
    <PageContainer>
      <GroupList flag="index" parentID="1" />
    </PageContainer>
  );
};

export default Group;
