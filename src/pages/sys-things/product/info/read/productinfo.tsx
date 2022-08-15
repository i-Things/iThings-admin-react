import { Card, Descriptions } from "antd";
import React, { useState, useEffect } from "react";
import ProTable from "@ant-design/pro-table";

import { postV1ThingsProductInfoRead } from "@/services/fmcsapi/chanpinguanli";

export type ProductInfoProps = {
  productID: string;
};

const ProductInfo: React.FC<ProductInfoProps> = (props) => {
  const [productInfo, setProductInfo] = useState<API.chanpinhexinziduan>({});
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    await postV1ThingsProductInfoRead({}, { productID: props.productID }).then(
      (res) => {
        setProductInfo(() => {
          return res.data;
        });

        setLoading(true);
      }
    );
  }, []);

  return (
    <Card>
      <Descriptions
        column={1}
        labelStyle={{ justifyContent: "flex-end", minWidth: 100 }}
      >
        <Descriptions.Item label="产品ID">
          {productInfo.productID}
        </Descriptions.Item>
        <Descriptions.Item label="产品名称">
          {productInfo.productName}
        </Descriptions.Item>
        <Descriptions.Item label="通讯方式">
          {productInfo.netType}
        </Descriptions.Item>
        <Descriptions.Item label="数据协议">
          {productInfo.dataProto}
        </Descriptions.Item>
        <Descriptions.Item label="设备类型">
          {productInfo.deviceType}
        </Descriptions.Item>
        <Descriptions.Item label="认证方式">
          {productInfo.authMode}
        </Descriptions.Item>
        <Descriptions.Item label="动态注册">
          {productInfo.autoRegister}
        </Descriptions.Item>
        <Descriptions.Item label="产品品类">
          {productInfo.categoryID}
        </Descriptions.Item>
        <Descriptions.Item label="描述">
          {productInfo.description}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {productInfo.createdTime}
        </Descriptions.Item>
        <Descriptions.Item label="产品状态">
          {productInfo.devStatus}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProductInfo;
