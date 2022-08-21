import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, Card, Col, message, Modal, Row, Tabs } from "antd";
import React, { useRef, useState } from "react";
import { history } from "umi";
import styles from "./style.less";

import {
  postV1ThingsDeviceCreate, postV1ThingsDeviceIndex, postV1ThingsDeviceUpdate, postV1ThingsDevice__openAPI__delete
} from "@/services/fmcsapi/shebeiguanli";
import DeviceOp from "./deviceop";

const { TabPane } = Tabs;
const { confirm } = Modal;

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

const updateDevice = async (values: API.shebeixinxihexinziduan) => {
  let r = {
    code: 0,
  };
  await postV1ThingsDeviceUpdate({}, values).then((res) => {
    if (res.code == 200) {
      message.info("更新成功");
    } else {
      message.error("更新失败:" + res.msg);
    }
    r = {
      code: res.code,
    };
  });
  return r;
};

const handleRemove = async (productID: string, deviceName: string) => {
  let r = {
    code: 0,
  };
  await postV1ThingsDevice__openAPI__delete(
    {},
    { productID: productID, deviceName: deviceName }
  ).then((res) => {
    if (res.code == 200) {
      message.info("删除成功");
    } else {
      message.error("删除失败:" + res.msg);
    }
    r = { code: res.code };
  });
  return r;
};

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
    let data = res.data.list?.map((item) => {
      item["modelid"] = item.productID + "-" + item.deviceName;
      return item;
    });
    r = {
      data: data,
      success: true,
      total: res?.data?.total,
    };
  });
  return r;
};

// const SchemaInfo: React.FC = () => {
//   return <h1>SchemaInfo</h1>;
// };

const IndexPage: React.FC = (props: any) => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [deviceItem, setDeviceItem] = useState({});

  const showDeleteConfirm = (name: string, productID: string) => {
    confirm({
      title: "你确定要删除设备:" + name + "?",
      icon: <ExclamationCircleOutlined />,
      content: "产品ID:" + productID,
      onOk() {
        handleRemove(productID, name);
        actionRef.current?.reloadAndRest?.();
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<API.shebeixinxihexinziduan>[] = [
    {
      title: "产品ID",
      dataIndex: "productID",
      key: "productID",
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
      key: "deviceName",
      search: false,
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
      valueType: "select",
      fieldProps: {
        options: [
          {
            label: "关闭",
            value: 1,
          },
          {
            label: "错误",
            value: 2,
          },
          {
            label: "告警",
            value: 3,
          },
          {
            label: "信息",
            value: 4,
          },
          {
            label: "调试",
            value: 5,
          },
        ],
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
          key={"info-" + record?.modelid}
          onClick={() => {
            history.push({
              pathname:
                "/sys-things/device/info/read/" +
                record.productID +
                "/" +
                record.deviceName,
            });
          }}
        >
          查看
        </a>,

        <a
          key={"info-" + record?.modelid}
          onClick={() => {
            setDeviceItem(record);
            setVisibleEdit(true);
          }}
        >
          修改
        </a>,
        <a
          key={"delete-" + record.productID + record.deviceName}
          onClick={() => {
            showDeleteConfirm(record?.deviceName, record.productID);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <Card>
       <Row>
        <Col span={24}>
          <div className={styles.global_fontTitle}>
            <span>设备列表</span>
          </div>
        </Col>
      </Row>
      <ProTable<API.shebeixinxihexinziduan>
        actionRef={actionRef}
        columns={columns}
        rowKey="modelid"
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
        request={queryDeviceList}
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
        values={{}}
      />

      <DeviceOp
        type="edit"
        onSubmit={async (values) => {
          console.log("edit values:", values);
          let r = await updateDevice(values);
          if (r.code == 200) {
            setVisibleEdit(false);
            actionRef.current?.reloadAndRest?.();
          }
          // let r = await createDevice(values);
          // if (r.code == 200) {
          //   setVisible(false);
          //   actionRef.current?.reloadAndRest?.();
          // }
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
