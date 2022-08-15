import { Card } from "antd";
import React from "react";
import ProTable from "@ant-design/pro-table";

import { postV1ThingsDataHubLogIndex } from "@/services/fmcsapi/shebeishuju";

export type HubLogProps = {
  productID: string;
  deviceName: string;
};

const queryHubLogList = async (params: {
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

  await postV1ThingsDataHubLogIndex({}, q).then((res) => {
    r = {
      data: res?.data?.list,
      success: true,
      total: res?.data?.total,
    };
  });
  return r;
};

const HubLog: React.FC<HubLogProps> = (props) => {
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
      title: "action",
      dataIndex: "action",
      key: "action",
      search: false,
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
      title: "requestID",
      dataIndex: "requestID",
      key: "requestID",
      search: false,
    },
    {
      title: "tranceID",
      dataIndex: "tranceID",
      key: "tranceID",
      search: false,
    },
    {
      title: "topic",
      dataIndex: "topic",
      key: "topic",
      search: false,
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
      search: false,
    },
    {
      title: "resultType",
      dataIndex: "resultType",
      key: "resultType",
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
          let r = await queryHubLogList({
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

export default HubLog;
