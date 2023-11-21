import { FlagStatus } from '@/utils/base';
import { Descriptions } from 'antd';
import React from 'react';
import ProductTagsModal from './components/deviceTagsModal';
import { EditForm } from './components/editForm';
import styles from './index.less';

interface Props {
  taskGroup: API.taskGroup;
  onChange: () => void;
}

const TaskGroupPage: React.FC<Props> = ({ taskGroup, onChange }) => {
  return (
    <Descriptions
      extra={<EditForm taskGroup={taskGroup} onChange={onChange} />}
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="分组类型" span={3}>
        {taskGroup.type}
      </Descriptions.Item>
      <Descriptions.Item label="分组子类型" span={3}>
        {taskGroup.subType}
      </Descriptions.Item>
      <Descriptions.Item label="优先级" span={3}>
        {taskGroup.priority}
      </Descriptions.Item>
      <Descriptions.Item label="环境变量" span={3}>
        <div className={styles['tags-wrapper']}>
          <div className={styles['tags-content']}>
            {Object.entries(taskGroup?.env || {}).length > 0 ? (
              Object.entries(taskGroup.env).map(([key, value]) => (
                <span className={styles.tags} key={key}>
                  {`${key}:${value}`}
                </span>
              ))
            ) : (
              <span>无环境变量信息</span>
            )}
          </div>
          <ProductTagsModal
            flag={FlagStatus.UPDATE}
            refresh={onChange}
            key="link"
            productInfo={taskGroup}
          />
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="配置">{taskGroup.config}</Descriptions.Item>
    </Descriptions>
  );
};

export default TaskGroupPage;
