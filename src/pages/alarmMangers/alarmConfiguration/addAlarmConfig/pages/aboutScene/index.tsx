import CardItem from '@/pages/ruleEngine/scene/components/CardItem';
import { postApiV1ThingsRuleSceneInfoIndex } from '@/services/iThingsapi/changjingliandong';
import { postApiV1ThingsRuleAlarmScene__openAPI__delete } from '@/services/iThingsapi/changjingliandongguanlian';
import { ResponseCode } from '@/utils/base';
import { DisconnectOutlined } from '@ant-design/icons';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Empty, message, Pagination, Popconfirm, Spin } from 'antd';
import { useState } from 'react';
import AddSceneAboutModal from './components/addSceneAboutModal';
import styles from './index.less';

const AboutScene = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });

  const {
    data: ruleSceneList,
    loading,
    refresh,
  } = useRequest(postApiV1ThingsRuleSceneInfoIndex, {
    defaultParams: [
      {
        page: pageInfo,
        alarmID: Number(id),
      },
    ],
    refreshDeps: [pageInfo],
    onError: (error) => {
      message.error('获取场景规则错误:' + error.message);
    },
  });

  /** 解绑 */
  const handleUnbinding = async (sceneID: number) => {
    setConfirmLoading(true);
    postApiV1ThingsRuleAlarmScene__openAPI__delete({
      alarmID: Number(id),
      sceneID,
    })
      .then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          message.success('解绑成功');
          refresh();
        }
      })
      .catch((error) => {
        message.error(error.msg);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        新增
      </Button>
      <Spin spinning={loading}>
        <div className={styles['scene-container']}>
          {ruleSceneList?.data?.list?.map((item) => (
            <div key={item.id} className={styles['scene-item']}>
              <CardItem data={item} isJump={false} />
              <Popconfirm
                title="确认解绑?"
                onConfirm={() => handleUnbinding(item.id || 0)}
                okButtonProps={{ loading: confirmLoading }}
              >
                <Button className={styles['disconnect-btn']} icon={<DisconnectOutlined />}>
                  解绑
                </Button>
              </Popconfirm>
            </div>
          ))}
          {ruleSceneList?.data?.list?.length === 0 && <Empty />}
          <div className={styles.pagination}>
            <Pagination
              total={ruleSceneList?.data?.total}
              showTotal={(total, range) => `第${range[0]}-${range[1]} 条/总共 ${total} 条`}
              pageSize={pageInfo.size}
              current={pageInfo.page}
              onChange={(page, size) => setPageInfo({ page, size })}
              size="small"
              showSizeChanger
              hideOnSinglePage={true}
            />
          </div>
        </div>
      </Spin>
      <AddSceneAboutModal open={open} onCancel={() => setOpen(false)} refreshBingScene={refresh} />
    </div>
  );
};

export default AboutScene;
