import React from 'react';

const BasicLayout: React.FC = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default BasicLayout;
