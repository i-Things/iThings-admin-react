import { EditForm } from '@/pages/product/detail/pages/productInfo/editForm';
import {
  autoRegisterValue,
  dataProtoValue,
  deviceTypeValue,
  netTypeValue,
  ProductInfo,
} from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { Descriptions } from 'antd';
import React from 'react';
interface Props {
  productInfo: ProductInfo;
  onChange: () => void;
}

const ProductInfoPage: React.FC<Props> = ({ productInfo, onChange }) => {
  return (
    <Descriptions
      title="产品信息"
      extra={<EditForm productInfo={productInfo} onChange={onChange} />}
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="产品名称">{productInfo.productName}</Descriptions.Item>
      <Descriptions.Item label="设备类型">
        {deviceTypeValue[productInfo?.deviceType ?? 1].text}
      </Descriptions.Item>
      <Descriptions.Item label="通讯方式">
        {netTypeValue[productInfo?.netType ?? 1].text}
      </Descriptions.Item>
      <Descriptions.Item label="数据协议">
        {dataProtoValue[productInfo?.dataProto ?? 1].text}
      </Descriptions.Item>
      <Descriptions.Item label="动态注册">
        {autoRegisterValue[productInfo?.autoRegister ?? 1].text}
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">
        {timestampToDateStr(Number(productInfo.createdTime))}
      </Descriptions.Item>
      <Descriptions.Item label="描述">{productInfo.description}</Descriptions.Item>
    </Descriptions>
  );
};

export default ProductInfoPage;
