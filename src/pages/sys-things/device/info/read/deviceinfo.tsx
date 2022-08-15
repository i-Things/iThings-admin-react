import { Card, Descriptions } from "antd";
import React, { useState, useEffect } from "react";
import ProTable from "@ant-design/pro-table";

import { postV1ThingsDeviceRead } from "@/services/fmcsapi/shebeiguanli";

export type DeviceInfoProps = {
  productID: string;
  deviceName: string;
};

const DeviceInfo: React.FC<DeviceInfoProps> = (props) => {
  console.log("productID:", props.productID);
  console.log("deviceName:", props.deviceName);

  const [deviceInfo, setDeviceInfo] = useState<API.shebeixinxihexinziduan>({});
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    await postV1ThingsDeviceRead(
      {},
      { productID: props.productID, deviceName: props.deviceName }
    ).then((res) => {
      setDeviceInfo(() => {
        return res.data;
      });

      setLoading(true);
    });
  }, []);

  return (
    <Card>
      <Descriptions
        column={1}
        labelStyle={{ justifyContent: "flex-end", minWidth: 100 }}
      >
        <Descriptions.Item label="产品ID">
          {deviceInfo.productID}
        </Descriptions.Item>
        <Descriptions.Item label="设备名称">
          {deviceInfo.deviceName}
        </Descriptions.Item>
        <Descriptions.Item label="seckey">
          {deviceInfo.secret}
        </Descriptions.Item>
        <Descriptions.Item label="第一次登录">
          {deviceInfo.firstLogin}
        </Descriptions.Item>
        <Descriptions.Item label="最后登录">
          {deviceInfo.lastLogin}
        </Descriptions.Item>
        <Descriptions.Item label="日志等级">
          {deviceInfo.logLevel}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DeviceInfo;
