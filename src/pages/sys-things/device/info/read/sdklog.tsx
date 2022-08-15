import { Card } from "antd";
import React from "react";
import ProTable from "@ant-design/pro-table";

import { postV1ThingsDataSdkLogIndex } from "@/services/fmcsapi/shebeishuju";

export type SdkLogProps = {
  productID: string;
  deviceName: string;
};

const querySdkLogList = async (params: {
  pageSize: number;
  current: number;
  productID: string;
  timeStart: string;
  timeEnd: string;
  deviceName: string;
}) => {
  let start = new Date(params.timeStart);
  let end = new Date(params.timeEnd);

  let q = {
    page: {
      page: params.current,
      size: params.pageSize,
    },

    productID: params.productID,
    timeStart: start.getTime() + "",
    timeEnd: end.getTime() + "",
    deviceName: params.deviceName,
  };

  let r = {
    data: [],
    success: false,
    total: 0,
  };

  await postV1ThingsDataSdkLogIndex({}, q).then((res) => {
    r = {
      data: res?.data?.list,
      success: true,
      total: res?.data?.total,
    };
  });
  return r;
};

const SdkLog: React.FC<SdkLogProps> = (props) => {
  console.log("productID:", props.productID);
  console.log("deviceName:", props.deviceName);

  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

  const columns = [
    {
      title: "productID",
      dataIndex: "productID",
      key: "productID",
      hideInTable: true,
      search: false,
      initialValue: props.productID,
    },
    {
      title: "deviceName",
      dataIndex: "deviceName",
      key: "deviceName",
      hideInTable: true,
      search: false,
      initialValue: props.deviceName,
    },

    {
      title: "时间",
      dataIndex: "dateTimeRange",
      key: "dateTimeRange",
      hideInTable: true,
      valueType: "dateTimeRange",
      initialValue: [start.toString(), end.toString()],

      search: {
        transform: (value: any) => ({ timeStart: value[0], timeEnd: value[1] }),
      },
    },
    {
      title: "timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      search: false,
    },
    {
      title: "loglevel",
      dataIndex: "loglevel",
      key: "loglevel",
      search: false,
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
      search: false,
    },
  ];

  console.log("clounms:", columns);

  return (
    <Card>
      <ProTable
        headerTitle=""
        search={{
          labelWidth: 120,
        }}
        columns={columns}
        request={async (params) => {
          let r = await querySdkLogList({
            productID: props.productID,
            deviceName: props.deviceName,
            ...params,
          });
          return r;
        }}
      />
    </Card>
  );
};

export default SdkLog;
