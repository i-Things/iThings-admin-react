import React, { useEffect } from "react";
import { useRouteMatch } from "umi";

const IndexPage: React.FC = () => {
  const match = useRouteMatch();
  const { id, name } = match.params;

  useEffect(() => {}, []);

  return (
    <>
      <h1>{id}</h1>
      <h1>{name}</h1>
    </>
  );
};

export default IndexPage;
