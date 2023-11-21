import { postApiV1SystemTimedTaskGroupRead } from '@/services/iThingsapi/renwu';
import { ColumnConfig } from '@/utils/base';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Card, Descriptions, message, Tabs } from 'antd';
import React, { useState } from 'react';
import TaskGroupPage from './pages/taskGroup/index';

const { TabPane } = Tabs;

const IndexPage: React.FC = () => {
  const [taskGroup, setTaskGroup] = useState<API.taskGroup>({ code: '' });
  const params = useParams() as { id: string };
  const code = params.id ?? '';
  const onChange = (/*key: string*/) => {};
  const { run } = useRequest(postApiV1SystemTimedTaskGroupRead, {
    defaultParams: [{ code: code }],
    onSuccess: (result) => {
      setTaskGroup(result.data);
    },
    onError: (error) => {
      message.error('获取产品信息错误:' + error.message);
    },
  });
  return (
    <PageContainer>
      <Card>
        <Descriptions title="任务分组信息" bordered column={ColumnConfig}>
          <Descriptions.Item label="分组名称">{taskGroup.name}</Descriptions.Item>
          <Descriptions.Item label="分组编码">{taskGroup.code}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="产品信息" key="1">
            <TaskGroupPage taskGroup={taskGroup} onChange={() => run({ code: code })} />
          </TabPane>
          {/*<TabPane tab="Topic 类列表" key="2">*/}
          {/*  <TopicPage />*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="消息解析" key="3">*/}
          {/*  <MessageAnalysisPage productID={code} />*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="物模型" key="4">*/}
          {/*  <ModelPage />*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="设备列表" key="5">*/}
          {/*  <DevicePage productInfo={taskGroup} />*/}
          {/*</TabPane>*/}
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
