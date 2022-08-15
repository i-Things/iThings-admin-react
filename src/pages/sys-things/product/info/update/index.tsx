import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import { Card, message } from "antd";
import React, { useState, useEffect } from "react";
import {
  postV1ThingsProductInfoRead,
  postV1ThingsProductInfoUpdate,
} from "@/services/fmcsapi/chanpinguanli";

const onFinish = async (values: API.chanpinhexinziduan) => {
  console.log("productId:", values.productID);

  await postV1ThingsProductInfoUpdate({}, values).then((res) => {
    if (res.code == 200) {
      message.info("更新成功");
    } else {
      message.error("更新失败:" + res.msg);
    }
  });
};

const ProductCreatePage: React.FC = (props: any) => {
  const [product, setProduct] = useState<API.chanpinhexinziduan>({});
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    console.log(props.match.params.id);
    let id = props.match.params.id;
    await postV1ThingsProductInfoRead({}, { productID: id }).then((res) => {
      console.log("res:", res);
      setProduct(() => {
        return res.data;
      });

      setLoading(true);
    });
  }, []);

  return (
    <PageContainer content="">
      {loading && (
        <Card bordered={false}>
          <ProForm
            initialValues={product}
            onFinish={(values) => {
              values.productID = product.productID;
              onFinish(values);
            }}
          >
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
                { label: "其它", value: 1 },
                { label: "wi-fi", value: 2 },
                { label: "2G/3G/4G", value: 3 },
                { label: "5G", value: 4 },
                { label: "BLE", value: 6 },
                { label: "LoRaWAN", value: 6 },
              ]}
              placeholder="请选择通讯方式"
              rules={[{ required: true, message: "请选择通讯方式" }]}
            />

            <ProFormRadio.Group
              options={[
                {
                  value: 1,
                  label: "自定义",
                },
                {
                  value: 2,
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
                  value: 1,
                  label: "设备",
                },
                {
                  value: 2,
                  label: "网关",
                },
                {
                  value: 3,
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
                  value: 1,
                  label: "账密认证",
                },
                {
                  value: 2,
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

            {/* <ProFormText
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
          /> */}

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
      )}
    </PageContainer>
  );
};

export default ProductCreatePage;
