import { Button, message, Card, Tabs, Modal } from "antd";
import React, { useRef, useState, useEffect } from "react";

import SchemaInfo from "./SchameInfo";
import DeviceInfo from "./DeviceInfo";
import ProductInfo from "./productinfo";

const { TabPane } = Tabs;

const IndexPage: React.FC = (props: any) => {
  const productId: string = props.match.params.id;

  console.log("productID:", productId);

  const [tabKey, setTabKey] = useState<string>("info");

  const tabchange = (key) => {
    if (key == "schema") {
      setTabKey("schema");
    }
    if (key == "info") {
      setTabKey("info");
    }
  };

  return (
    <Card>
      <Tabs defaultActiveKey="info" onChange={tabchange}>
        <TabPane
          tab="产品详情"
          disabled={tabKey == "info"}
          key="info"
        ></TabPane>
        <TabPane
          tab="物模型"
          disabled={tabKey == "schema"}
          key="schema"
        ></TabPane>
      </Tabs>
      {tabKey == "schema" && <SchemaInfo productID={productId} />}
      {tabKey == "info" && <ProductInfo productID={productId} />}
    </Card>
  );
};

export default IndexPage;
