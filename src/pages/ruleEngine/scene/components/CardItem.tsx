
import { isFunction } from 'lodash';
import { history } from 'umi';
import type { ruleSceneList } from '../data';
import styles from './style.less';
const img = require('../img/scene-device.png')


type ruleSceneProps = {
    toolRender?: (data: API.scene) => JSX.Element | React.ReactNode;
}

export enum TriggerWayType {
    manual = '手动触发',
    timer = '定时触发',
    device = '设备触发',
}


const CardItem: React.FC<ruleSceneList & ruleSceneProps> = (props) => {

    const { list = [], toolRender } = props;
    return (
        <div className={styles['card-item-wrap']}>
            {list.map((item) => {
                return <div className={styles['box-wrap']} key={item.id}>
                    <div className={styles['top-wrap']} onClick={() => {
                        history.push('/ruleEngine/scene/detail')
                    }}>
                        <div className={styles['top-icon-wrap']}>
                            <div className={styles['top-icon']}>
                                {TriggerWayType[item.triggerType]}
                            </div>
                        </div>

                        <div className={styles['box-content']}>
                            <div className={styles['box-img']}>
                                <img width={88} height={88} src={img} />
                            </div>
                            <div className={styles['text-content']}>
                                <div className={styles.title}>
                                    {item.name}
                                </div>
                                <div className={styles.desc}>
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                        <div className={styles['right-status-wrap']}>
                            <div className={styles['right-status']}>
                                {item?.state === 1 ? '启用' : '禁用'}
                            </div>
                        </div>
                    </div>
                    {toolRender && isFunction(toolRender) ? (toolRender(item)) : null}
                </div>
            })
            }
        </div>
    )
}

export default CardItem;
