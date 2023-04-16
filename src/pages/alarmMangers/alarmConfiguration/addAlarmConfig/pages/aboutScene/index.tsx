import CardItem from '@/pages/ruleEngine/scene/components/CardItem';
import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Empty, message, Spin } from 'antd';
import { useState } from 'react';
import AddSceneAboutModal from './components/addSceneAboutModal';
import styles from './index.less';

const AboutScene = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [open, setOpen] = useState(false);

  const { data: ruleSceneList, loading } = useRequest(postApiV1ThingsRuleSceneInfoIndex, {
    defaultParams: [
      {
        page: {
          page: 1,
          size: 20,
        },
        alarmID: Number(id),
      },
    ],
    onError: (error) => {
      message.error('获取场景规则错误:' + error.message);
    },
  });

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        新增
      </Button>
      <Spin spinning={loading}>
        <div className={styles['scene-container']}>
          {ruleSceneList?.data?.list?.map((item) => (
            <div key={item.id}>
              <CardItem data={item} />
            </div>
          ))}
          {ruleSceneList?.data?.list?.length === 0 && <Empty />}
        </div>
      </Spin>
      <AddSceneAboutModal open={open} />
    </div>
  );
};

export default AboutScene;
