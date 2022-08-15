import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import { Card } from "antd";
import React from "react";

const onFinish = async (values: Record<string, any>) => {};

const ProductCreatePage: React.FC = () => {
  return (
    <PageContainer content="">
      <Card bordered={false}>
        <ProForm onFinish={onFinish}>
          <ProFormText
            width="md"
            label="产品名称"
            name="productName"
            rules={[
              {
                required: true,
                message: "请输入产品名称",
              },
            ]}
            placeholder="产品名字"
          />

          <ProFormSelect
            width="md"
            name="netType"
            label="通讯方式"
            options={[
              { label: "其它", value: "1" },
              { label: "wi-fi", value: "2" },
              { label: "2G/3G/4G", value: "3" },
              { label: "5G", value: "4" },
              { label: "BLE", value: "6" },
              { label: "LoRaWAN", value: "6" },
            ]}
            placeholder="请选择通讯方式"
            rules={[{ required: true, message: "请选择通讯方式" }]}
          />

          <ProFormRadio.Group
            options={[
              {
                value: "1",
                label: "自定义",
              },
              {
                value: "2",
                label: "数据模板",
              },
            ]}
            rules={[
              {
                required: true,
                message: "请选择数据协议",
              },
            ]}
            label="数据协议"
            name="dataProto"
          />

          <ProFormRadio.Group
            options={[
              {
                value: "1",
                label: "设备",
              },
              {
                value: "2",
                label: "网关",
              },
              {
                value: "3",
                label: "子设备",
              },
            ]}
            rules={[
              {
                required: true,
                message: "请选择设备类型",
              },
            ]}
            label="设备类型"
            name="deviceType"
          />

          <ProFormRadio.Group
            options={[
              {
                value: "1",
                label: "账密认证",
              },
              {
                value: "2",
                label: "秘钥认证",
              },
            ]}
            rules={[
              {
                required: true,
                message: "请选择认证方式",
              },
            ]}
            label="认证方式"
            name="authMode"
          />

          <ProFormRadio.Group
            options={[
              {
                value: "1",
                label: "关闭",
              },
              {
                value: "2",
                label: "打开",
              },
              {
                value: "3",
                label: "打开并自动创建设备",
              },
            ]}
            rules={[
              {
                required: true,
                message: "请选择动态注册方式",
              },
            ]}
            label="动态注册"
            name="autoRegister"
          />

          <ProFormText
            width="md"
            label="产品品类"
            name="categoryID"
            rules={[
              {
                required: true,
                message: "请输入产品品类",
              },
            ]}
            placeholder="产品品类"
          />

          <ProFormText
            width="md"
            label="描述"
            name="description"
            rules={[
              {
                required: true,
                message: "请输入描述信息",
              },
            ]}
            placeholder="描述信息"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default ProductCreatePage;
