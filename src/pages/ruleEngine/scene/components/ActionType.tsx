import classNames from 'classnames';
import { useState } from 'react';
import styles from './style.less';
const deviceImg = require('../img/device-trigger.png');
const manualImg = require('../img/manual-trigger.png');
const timingImg = require('../img/timing-trigger.png');

type ActionTypeProps = {
    isChecked?: string;
};

export enum ActionWayType {
    DEVICE_OUTPUT = '设备输出',
    DEFERRED_EXECUTION = '延迟执行',
    TRIGGER_ALARM = '触发告警',
    CLEAR_ALARM = '解除告警',
}

const data = [{
    title: '设备输出',
    key: ActionWayType.DEVICE_OUTPUT,
    desc: '配置设备调用功能、读取属性、设置属性规则',
    imgSrc: deviceImg
}, {
    title: '延迟执行',
    key: ActionWayType.DEFERRED_EXECUTION,
    desc: '等待一段时间后，再执行后续动作',
    imgSrc: manualImg
}, {
    title: '触发告警',
    key: ActionWayType.TRIGGER_ALARM,
    desc: '配置触发告警规则，需配合“告警配置”使用',
    imgSrc: timingImg
}, {
    title: '解除告警',
    key: ActionWayType.CLEAR_ALARM,
    desc: '配置解除告警规则，需配合“告警配置”使用',
    imgSrc: timingImg
}]

const ActionType: React.FC<ActionTypeProps> = (props) => {
    const { isChecked = ActionWayType.DEVICE_OUTPUT, onChange } = props;

    const [activeKey, setActiveKey] = useState(ActionWayType.DEVICE_OUTPUT)

    return (
        <div className={styles['trigger-type-wrap']}>
            {
                data.map((item) => {
                    return <div key={item.key}
                        className={classNames(styles['trigger-type-item-wrap'], activeKey === item.key ? styles.active : '')}
                        onClick={() => {
                            onChange(item.key)
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

export default ActionType;
