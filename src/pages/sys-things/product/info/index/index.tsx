import {
  postV1ThingsProductInfoCreate,
  postV1ThingsProductInfoIndex,
  postV1ThingsProductInfoUpdate,
  postV1ThingsProductInfo__openAPI__delete,
} from "@/services/fmcsapi/chanpinguanli";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, Card, message, Modal } from "antd";
import React, { useRef, useState } from "react";
import { history } from "umi";
import ProductOp from "./ProductOp";
import type { ProductType } from "./ProductOp";

const queryProductList = async (params: {
  pageSize: number;
  current: number;
  deviceType: number;
  productName: string;
}) => {
  let q = {
    page: {
      page: params.current,
      size: params.pageSize,
    },
    deviceType: params.deviceType,
    productName: params.productName,
  };

  let r = {
    data: [],
    success: false,
    total: 0,
  };

  await postV1ThingsProductInfoIndex({}, q).then((res) => {
    r = {
      data: res?.data?.list,
      success: true,
      total: res?.data?.total,
    };
  });
  return r;
};

const handleRemove = async (productID: string) => {
  await postV1ThingsProductInfo__openAPI__delete(
    {},
    { productID: productID }
  ).then((res) => {
    if (res.code == 200) {
      message.info("删除成功");
    } else {
      message.error("删除失败:" + res.msg);
    }
  });
};

const updateProduct = async (values: API.chanpinhexinziduan) => {
  let r = { code: 0 };
  await postV1ThingsProductInfoUpdate({}, values).then((res) => {
    if (res.code == 200) {
      message.info("更新成功");
    } else {
      message.error("更新失败:" + res.msg);
    }
    r = { code: res.code };
  });
  return r;
};

const createProduct = async (values: ProductType) => {
  values.categoryID = 1;

  let r = { code: 0 };
  await postV1ThingsProductInfoCreate({}, values).then((res) => {
    if (res.code == 200) {
      message.info("添加成功");
    } else {
      message.error("添加失败:" + res.msg);
    }
    r = { code: res.code };
  });
  return r;
};

const onFormSubmit = (values: any) => {
  console.log(values);
};

const { confirm } = Modal;

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [productItem, setProductItem] = useState<API.chanpinhexinziduan>({});

  const showDeleteConfirm = (name: string, productID: string) => {
    confirm({
      title: "你确定要删除产品:" + name + "?",
      icon: <ExclamationCircleOutlined />,
      content: "产品ID:" + productID,
      onOk() {
        handleRemove(productID);
        actionRef.current?.reloadAndRest?.();
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<API.chanpinhexinziduan>[] = [
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName",
      render: (_, record) => [
        <a
          key={"info-" + record.productID}
          onClick={() => {
            history.push({
              pathname: "/sys-things/product/info/read/" + record.productID,
            });
          }}
        >
          {record.productName}
        </a>,
      ],
    },
    {
      title: "通讯方式",
      dataIndex: "netType",
      key: "netType",
      search: false,
      valueType: "select",
      fieldProps: {
        options: [
          {
            label: "其它",
            value: 1,
          },
          {
            label: "WIFI",
            value: 2,
          },
          {
            label: "2G/3G/4G",
            value: 3,
          },
          {
            label: "5G",
            value: 4,
          },
          {
            label: "BLE",
            value: 5,
          },
          {
            label: "LoRaWAN",
            value: 6,
          },
        ],
      },
    },
    {
      title: "数据协议",
      dataIndex: "dataProto",
      key: "dataProto",
      search: false,
      valueType: "select",
      fieldProps: {
        options: [
          {
            label: "自定义",
            value: 1,
          },
          {
            label: "数据模板",
            value: 2,
          },
        ],
      },
    },
    {
      title: "设备类型",
      dataIndex: "deviceType",
      key: "deviceType",
      valueType: "select",
      fieldProps: {
        options: [
          {
            label: "设备",
            value: 1,
          },
          {
            label: "网关",
            value: 2,
          },
          {
            label: "子设备",
            value: 3,
          },
        ],
      },
    },
    {
      title: "认证方式",
      dataIndex: "authMode",
      key: "authMode",
      search: false,
      valueType: "select",
      fieldProps: {
        options: [
          {
            value: 1,
            label: "账密认证",
          },
          {
            value: 2,
            label: "秘钥认证",
          },
        ],
      },
    },
    {
      title: "动态注册",
      dataIndex: "autoRegister",
      key: "autoRegister",
      search: false,
      valueType: "select",
      fieldProps: {
        options: [
          {
            value: 1,
            label: "关闭",
          },
          {
            value: 2,
            label: "打开",
          },
          {
            value: 3,
            label: "打开并自动创建设备",
          },
        ],
      },
    },
    {
      title: "产品品类",
      dataIndex: "categoryID",
      key: "categoryID",
      search: false,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
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
            setProductItem(record);
            setVisibleEdit(true);
          }}
        >
          修改
        </a>,
        <a
          key={"delete-" + record.productID}
          onClick={() => {
            showDeleteConfirm(record?.productName, record.productID);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <Card>
      <ProTable<API.chanpinhexinziduan>
        headerTitle="产品列表"
        actionRef={actionRef}
        rowKey="productID"
        initValues={{
          productName: "ss",
          netType: "ss",
        }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisibleAdd(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        request={queryProductList}
      />

      <ProductOp
        type="add"
        onSubmit={async (values) => {
          console.log("values:", values);
          let r = await createProduct(values);
          if (r.code == 200) {
            setVisibleAdd(false);
            actionRef.current?.reloadAndRest?.();
          }
        }}
        onCancel={() => {
          setVisibleAdd(false);
        }}
        modalVisible={visibleAdd}
        values={{}}
      />

      <ProductOp
        type="edit"
        onSubmit={async (values) => {
          console.log("edit values:", values);
          let r = await updateProduct(values);
          if (r.code == 200) {
            setVisibleEdit(false);
            actionRef.current?.reloadAndRest?.();
          }
        }}
        onCancel={() => {
          setVisibleEdit(false);
        }}
        modalVisible={visibleEdit}
        values={productItem}
      />
    </Card>
  );
};

export default IndexPage;
