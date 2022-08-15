import React, { useState } from "react";
import { Button, message, Card, Tabs, Modal } from "antd";

import SchameLog from "./schemalog";
import HubLog from "./hublog";
import SdkLog from "./sdklog";
import DeviceInfo from "./deviceinfo";

const { TabPane } = Tabs;

const IndexPage: React.FC = (props: any) => {
  let id = props.match.params.id;
  let name = props.match.params.name;

  console.log("1111:", id, name);
  const [tabKey, setTabKey] = useState<string>("info");

  const tabchange = (key) => {
    if (key == "schema") {
      setTabKey("schema");
    }
    if (key == "info") {
      setTabKey("info");
    }
    if (key == "schema-log") {
      setTabKey("schema-log");
    }
    if (key == "sdklog") {
      setTabKey("sdklog");
    }
    if (key == "hublog") {
      setTabKey("hublog");
    }
  };

  return (
    <Card>
      <Tabs defaultActiveKey="info" onChange={tabchange}>
        <TabPane
          tab="设备详情"
          disabled={tabKey == "info"}
          key="info"
        ></TabPane>
        <TabPane
          tab="设备物模型记录"
          disabled={tabKey == "schema-log"}
          key="schema-log"
        ></TabPane>
        <TabPane
          tab="sdk日志"
          disabled={tabKey == "sdklog"}
          key="sdklog"
        ></TabPane>
        <TabPane
          tab="云端诊断日志"
          disabled={tabKey == "hublog"}
          key="hublog"
        ></TabPane>
      </Tabs>
      {tabKey == "schema-log" && <SchameLog productID={id} deviceName={name} />}
      {tabKey == "hublog" && <HubLog productID={id} deviceName={name} />}
      {tabKey == "sdklog" && <SdkLog productID={id} deviceName={name} />}
      {tabKey == "info" && <DeviceInfo productID={id} deviceName={name} />}
    </Card>
  );
};

export default IndexPage;
