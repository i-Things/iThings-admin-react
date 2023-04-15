import CardItem from '@/pages/ruleEngine/scene/components/CardItem';
import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';

const AboutScene = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

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
        alarmID: Number(id),
      },
    ],
    onError: (error) => {
      message.error('获取场景规则错误:' + error.message);
    },
  });
  return (
    <div>
      <Button>新增</Button>
      <CardItem toolRender={() => <div>解绑</div>} list={ruleSceneList?.data?.list} />
    </div>
  );
};

export default AboutScene;
