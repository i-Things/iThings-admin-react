import { Card } from "antd";
import React from "react";
import ProTable from "@ant-design/pro-table";

import { postV1ThingsDataSchemaLogIndex } from "@/services/fmcsapi/shebeishuju";

export type SchameLogProps = {
  productID: string;
  deviceName: string;
};

const querySchameLogList = async (params: {
  pageSize: number;
  current: number;
  productID: string;
  dataID: string;
  method: string;
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
    dataID: params.dataID,
    method: params.method,
    timeStart: start.getTime() + "",
    timeEnd: end.getTime() + "",
    deviceName: params.deviceName,
  };

  let r = {
    data: [],
    success: false,
    total: 0,
  };

  await postV1ThingsDataSchemaLogIndex({}, q).then((res) => {
    r = {
      data: res?.data?.list,
      success: true,
      total: res?.data?.total,
    };
  });
  return r;
};

const SchameLog: React.FC<SchameLogProps> = (props) => {
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
      title: "method",
      dataIndex: "method",
      key: "method",
      hideInTable: true,
      initialValue: "property",
      valueType: "select",
      fieldProps: {
        options: [
          {
            value: "property",
            label: "属性",
          },
          {
            value: "event",
            label: "事件",
          },
          {
            value: "action",
            label: "请求",
          },
        ],
      },
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
      title: "事件类型",
      dataIndex: "type",
      key: "type",
      search: false,
      valueType: "select",
      fieldProps: {
        options: [
          {
            value: "info",
            label: "信息",
          },
          {
            value: "alert",
            label: "告警",
          },
          {
            value: "fault",
            label: "故障",
          },
        ],
      },
    },
    {
      title: "数据的id",
      dataIndex: "dataID",
      key: "dataID",
    },
    {
      title: "getValue",
      dataIndex: "getValue",
      key: "getValue",
      search: false,
    },
    {
      title: "sendValue",
      dataIndex: "sendValue",
      key: "sendValue",
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
          let r = await querySchameLogList({
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

export default SchameLog;
