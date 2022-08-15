import { postV1ThingsProductInfoIndex } from "@/services/fmcsapi/chanpinguanli";
import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button } from "antd";
import React, { useRef } from "react";
import { history } from "umi";

const queryProductList = async (params: {
  pageSize: number;
  current: number;
  deviceType: number;
}) => {
  let q = {
    page: {
      page: params.current,
      size: params.pageSize,
    },
    deviceType: params.deviceType,
  };

  let r = {
    data: [],
    success: false,
    total: 0,
  };

  await postV1ThingsProductInfoIndex(q).then((res) => {
    r = {
      data: res?.data?.list,
      success: true,
      total: res?.data?.total,
    };
  });
  return r;
};

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.chanpinhexinziduan>[] = [
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "通讯方式",
      dataIndex: "netType",
      key: "netType",
    },
    {
      title: "数据协议",
      dataIndex: "dataProto",
      key: "dataProto",
    },
    {
      title: "设备类型",
      dataIndex: "deviceType",
      key: "deviceType",
    },
    {
      title: "认证方式",
      dataIndex: "authMode",
      key: "authMode",
    },
    {
      title: "动态注册",
      dataIndex: "autoRegister",
      key: "autoRegister",
    },
    {
      title: "产品品类",
      dataIndex: "categoryID",
      key: "categoryID",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.chanpinhexinziduan>
        headerTitle="产品列表"
        actionRef={actionRef}
        rowKey="productID"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push({
                pathname: "/product-manager/thing/create",
              });
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        request={queryProductList}
      />
    </PageContainer>
  );
};

export default IndexPage;
