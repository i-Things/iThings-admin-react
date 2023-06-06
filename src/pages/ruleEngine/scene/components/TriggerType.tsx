import classNames from 'classnames';
import { useState } from 'react';
import styles from './style.less';
const deviceImg = require('../img/device-trigger.png');
const manualImg = require('../img/manual-trigger.png');
const timingImg = require('../img/timing-trigger.png');

type triggerTypeProps = {
    value?: string;
    onChange?: (key: string) => void;
};

export enum TriggerWayType {
    manual = '手动触发',
    timer = '定时触发',
    device = '设备触发',
}

const data = [{
    title: TriggerWayType.device,
    key: 'device',
    desc: '适用于设备数据或行为满足触发条件时，执行指定的动作',
    imgSrc: deviceImg
}, {
    title: TriggerWayType.manual,
    key: 'manual',
    desc: '适用于第三方平台向物联网平台下发指令控制设备.',
    imgSrc: manualImg
}, {
    title: TriggerWayType.timer,
    key: 'timer',
    desc: '适用于定期执行固定任务.',
    imgSrc: timingImg
}]

const TriggerType: React.FC<triggerTypeProps> = (props) => {
    const { value } = props;
    const { onChange } = props;

    const [activeKey, setActiveKey] = useState(value || TriggerWayType.device)
    
    return (
        <div className={styles['trigger-type-wrap']}>
            {
                data.map((item) => {
                    return <div key={item.key}
                        className={classNames(styles['trigger-type-item-wrap'], (activeKey === item.key)  ? styles.active : '')}
                        onClick={() => {
                            if (onChange) {
                                onChange(item.key)
                            }
                            setActiveKey(item.key)
                        }}>
                        <div className={styles['trigger-type-item-content']}>
                            <div className={styles['trigger-type-item-title']}>
                                {item.title}
                            </div>
                            <div className={styles['trigger-type-item-desc']}>
                                {item.desc}
                            </div>
                        </div>
                        <div className={styles['trigger-type-item-img']}>
                            <img src={item.imgSrc} width={48} />
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default TriggerType;
