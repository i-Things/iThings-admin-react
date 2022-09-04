import { postThingsProductInfoRead } from '@/services/iThingsapi/chanpinguanli';
import { ProductInfo } from '@/utils/const';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Card, Descriptions, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'umi';
import DevicePage from './pages/device/index';
import ModelPage from './pages/model/index';
import ProductInfoPage from './pages/productInfo/index';
import TopicPage from './pages/topic/index';

const { TabPane } = Tabs;

const IndexPage: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({ productName: '' });
  const params = useParams() as { id: string };
  const productID = params.id ?? '';
  const onChange = (key: string) => {
    console.log(key);
  };
  console.log(productInfo);
  const { run } = useRequest(postThingsProductInfoRead, {
    defaultParams: [{ productID: productID }],
    onSuccess: (result) => {
      setProductInfo(result.data);
    },
    onError: (error) => {
      message.error('获取产品信息错误:' + error.message);
    },
  });

  return (
    <PageContainer content={'产品名称:' + productInfo.productName}>
      <Card>
        <Descriptions title="产品信息">
          <Descriptions.Item label="ProductKey">1982992</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="产品信息" key="1">
            <ProductInfoPage
              productInfo={productInfo}
              onChange={() => run({ productID: productID })}
            />
          </TabPane>
          <TabPane tab="Topic 类列表" key="2">
            <TopicPage />
          </TabPane>
          <TabPane tab="物模型" key="3">
            <ModelPage />
          </TabPane>
          <TabPane tab="设备列表" key="4">
            <DevicePage />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
