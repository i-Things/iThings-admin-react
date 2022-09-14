import useGetTableList from '@/hooks/useGetTableList';
import { postDeviceGroupInfo } from '@/services/iThingsapi/group';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Spin, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'umi';
import DeviceListPage from './pages/deviceList';
import GroupInfoPage from './pages/groupInfo';
const { TabPane } = Tabs;

const IndexPage: React.FC = () => {
  const { queryPage, dataList } = useGetTableList();
  const params = useParams() as { id: string };
  const groupID = params.id ?? '';
  const onChange = (/*key: string*/) => {};
  useEffect(() => {
    const param = { groupID };
    queryPage(postDeviceGroupInfo, param);
  }, []);

  return (
    <PageContainer>
      <Card>
        <Descriptions title="分组信息">
          {dataList.length > 0 ? (
            <>
              <Descriptions.Item label="分组层级">{dataList[0]?.groupLevel}</Descriptions.Item>
              <Descriptions.Item label="分组ID">{dataList[0]?.groupID}</Descriptions.Item>
              <Descriptions.Item label="设备总数">{dataList[0]?.totalDevice}</Descriptions.Item>
              <Descriptions.Item label="激活设备">{dataList[0]?.activateDevice}</Descriptions.Item>
              <Descriptions.Item label="当前在线">{dataList[0]?.currentOnline}</Descriptions.Item>
            </>
          ) : (
            <Descriptions.Item>
              <Spin />
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="分组信息" key="1">
            <GroupInfoPage />
          </TabPane>
          <TabPane tab="设备列表" key="2">
            <DeviceListPage />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
