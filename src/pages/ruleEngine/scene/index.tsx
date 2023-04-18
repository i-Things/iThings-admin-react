import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Card, Col, message, Row } from 'antd';
import classNames from 'classnames';
import CardItem from './components/CardItem';
import './components/style.less';

export type CardItemType = {
  list: API.scene[];
};

const IndexPage = () => {
  const { data: ruleSceneList } = useRequest(postApiV1ThingsRuleSceneInfoIndex, {
    defaultParams: [
      {
        page: {
          page: 1,
          size: 20,
        },
        name: '',
        state: 1,
        triggerType: '',
      },
    ],
    onError: (error) => {
      message.error('获取规则错误:' + error.message);
    },
  });

  const Tools: React.FC<{ record: API.scene }> = ({ record }) => {
    return (
      <div className="card-item-bottom-wrap">
        <div className="bottom-item-wrap">
          <Button
            className={classNames('btn-flex', 'btn', 'mr-8')}
            type="link"
            onClick={() => console.log('record', record)}
          >
            编辑
          </Button>
          <Button className={classNames('btn-flex', 'btn', 'mr-8')} type="link">
            启用
          </Button>
          <Button className={classNames('btn-side', 'btn')} type="link">
            删除
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageContainer>
      <Card>
        <Row gutter={[24, 24]}>
          {ruleSceneList?.data?.list?.map((item) => (
            <Col key={item.id} span={8}>
              <CardItem data={item} />
              <Tools record={item} />
            </Col>
          ))}
        </Row>
      </Card>
    </PageContainer>
  );
};

export default IndexPage;
