import React, { useRef, useState, useEffect } from "react";
import { postV1ThingsProductSchemaRead } from "@/services/fmcsapi/chanpinguanli";

import {
  postV1ThingsDeviceIndex,
  postV1ThingsDeviceCreate,
} from "@/services/fmcsapi/shebeiguanli";

import { Button, message, Card, Tabs, Modal } from "antd";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import { PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import DeviceOp from "./deviceop";

interface DevicePropsType {
  productID: string;
}

const createDevice = async (values: API.shebeixinxihexinziduan) => {
  let r = {
    code: 0,
  };
  await postV1ThingsDeviceCreate({}, values).then((res) => {
    if (res.code == 200) {
      message.info("添加成功");
    } else {
      message.error("添加失败:" + res.msg);
    }
    r = {
      code: res.code,
    };
  });
  return r;
};

//   const handleRemove = async (productID: string) => {
//     await postV1ThingsProductInfo__openAPI__delete(
//       {},
//       { productID: productID }
//     ).then((res) => {
//       if (res.code == 200) {
//         message.info("删除成功");
//       } else {
//         message.error("删除失败:" + res.msg);
//       }
//     });
//   };

const queryDeviceList = async (params: {
  pageSize: number;
  current: number;
  productID: string;
}) => {
  let q = {
    page: {
      page: params.current,
      size: params.pageSize,
    },
    productID: params.productID,
  };

  let r = {
    data: [],
    success: false,
    total: 0,
  };

  await postV1ThingsDeviceIndex({}, q).then((res) => {
    r = {
      data: res?.data?.list,
      success: true,
      total: res?.data?.total,
    };
  });
  return r;
};

const IndexPage: React.FC<DevicePropsType> = (props: DevicePropsType) => {
  const { productID } = props;
  console.log(" productID: ", productID);
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [deviceItem, setDeviceItem] = useState({});
  // const [datasource, setDatasource] = useState([]);

  // useEffect(async () => {

  //   await queryDeviceList({ productID: productID }).then((res) => {
  //     setDatasource(res);
  //     //setLoading(true);
  //   });
  // }, []);

  const columns: ProColumns<API.shebeixinxihexinziduan>[] = [
    {
      title: "设备名称",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "设备密钥",
      dataIndex: "secret",
      key: "secret",
      search: false,
    },
    {
      title: "固件版本",
      dataIndex: "version",
      key: "version",
      search: false,
    },
    {
      title: "日志级别",
      dataIndex: "logLevel",
      key: "logLevel",
      search: false,
      valueEnum: {
        close: { text: "关闭", logLevel: 1 },
        error: { text: "错误", logLevel: 2 },
        warn: { text: "告警", logLevel: 3 },
        info: { text: "信息", logLevel: 4 },
        debug: { text: "调试", logLevel: 5 },
      },
    },
    {
      title: "激活时间",
      dataIndex: "firstLogin",
      key: "firstLogin",
      search: false,
    },
    {
      title: "最后上线时间",
      dataIndex: "lastLogin",
      key: "lastLogin",
      search: false,
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      key: "createdTime",
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      search: false,
      render: (_, record) => [
        <a
          key={"info-" + record.productID}
          onClick={() => {
            setDeviceItem(record);
            setVisibleEdit(true);
          }}
        >
          修改
        </a>,
        <a
          key={"delete-" + record.productID}
          onClick={() => {
            // handleRemove(record.productID);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <Card>
      <ProTable<API.shebeixinxihexinziduan>
        actionRef={actionRef}
        rowKey="productID"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        request={() => {
          return queryDeviceList({ productID: productID });
        }}
      />

      <DeviceOp
        type="add"
        onSubmit={async (values) => {
          console.log("add values:", values);
          let r = await createDevice(values);
          if (r.code == 200) {
            setVisible(false);
            actionRef.current?.reloadAndRest?.();
          }
        }}
        onCancel={() => {
          setVisible(false);
        }}
        modalVisible={visible}
        values={{ productID: productID }}
      />

      <DeviceOp
        type="edit"
        onSubmit={async (values) => {
          console.log("edit values:", values);
        }}
        onCancel={() => {
          setVisibleEdit(false);
        }}
        modalVisible={visibleEdit}
        values={deviceItem}
      />
    </Card>
  );
};

export default IndexPage;
