import { history } from 'umi';
import styles from './style.less';
const img = require('../img/scene-device.png');

type ruleSceneProps = {
  data: API.scene;
  /** 是否需要跳转到详情页 */
  isJump?: boolean;
};

export enum TriggerWayType {
  manual = '手动触发',
  timer = '定时触发',
  device = '设备触发',
}

const CardItem: React.FC<ruleSceneProps> = (props) => {
  const { data, isJump = true } = props;
  return (
    <div className={styles['box-wrap']}>
      <div
        className={styles['top-wrap']}
        onClick={() => {
          if (isJump) history.push(`/ruleEngine/scene/detail?id=${data.id}`);
        }}
      >
        <div className={styles['top-icon-wrap']}>
          <div className={styles['top-icon']}>{TriggerWayType[data.trigger]}</div>
        </div>

        <div className={styles['box-content']}>
          <div className={styles['box-img']}>
            <img width={88} height={88} src={img} />
          </div>
          <div className={styles['text-content']}>
            <div className={styles.title}>{data.name}</div>
            <div className={styles.desc}>{data.desc}</div>
          </div>
        </div>
        <div className={styles['right-status-wrap']}>
          <div className={styles['right-status']}>{data?.status === 1 ? '启用' : '禁用'}</div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
