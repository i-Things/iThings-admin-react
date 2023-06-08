/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { ActionWayType } from "./ActionType";

type ActionCardProps = {
    handleActionCardCallBack: (values: any) => void;
    index: number;
    value?: any;
    onChange?: any;
}

function ActionCard(props: ActionCardProps) {
    console.log('props', props);
    const { value, index } = props
    const { onChange, handleActionCardCallBack } = props;
    const { type, property } = value

    const [content, setContent] = useState<React.ReactNode>()

    // 设备输出
    const handleDeviceOutput = () => {
        throw new Error("还没写呢");
    }
    // 延迟执行
    const handleDeferredExecution = () => {
        const { delay } = property
        if (!delay) {
            setContent('暂不支持的类型')
            return
        }
        const _content = `${delay.time}${delay.unit}后，执行后续动作`
        setContent(_content)
    }

    // 触发告警
    const handleTriggerAlarm = () => {
        throw new Error("还没写呢");
    }

    // 解除告警
    const handleClearAlarm = () => {
        throw new Error("还没写呢");
    }

    // 策略模式
    const strategy = {
        [ActionWayType.DEVICE_OUTPUT]: handleDeviceOutput,
        [ActionWayType.DEFERRED_EXECUTION]: handleDeferredExecution,
        [ActionWayType.TRIGGER_ALARM]: handleTriggerAlarm,
        [ActionWayType.CLEAR_ALARM]: handleClearAlarm,
    };

    useEffect(() => {
        strategy[type]()
        // if (type === ActionWayType.DEFERRED_EXECUTION) {
        //     const { delay } = property
        //     const _content = `${delay.time}${delay.unit}后，执行后续动作`
        //     setContent(_content)
        // }
    }, [props.value])


    // ActionWayType {
    //     DEVICE_OUTPUT = '设备输出',
    //     DEFERRED_EXECUTION = '延迟执行',
    //     TRIGGER_ALARM = '触发告警',
    //     CLEAR_ALARM = '解除告警',
    // }
    // 不同的类型不同的处理方式
    // type = 设备输出
    // type = 延迟执行
    // type = 触发告警
    // type = 解除告警

    // 需要接受的参数
    {
        // type: ActionWayType, 触发的类型
        // property: any 元素自身的属性

    }
    // 组件自身的属性 
    // {
    //     content  根据 type 和 property 自行组装
    // }

    return <div>
        {/* <label htmlFor=""> {index + 1} </label> */}
        <Button style={{ minWidth: 200 }} onClick={() => {
            // onChange({ type: 'sss', name: '2222' })
            handleActionCardCallBack({
                type,
                index,
                property
            })
        }}>
            {content}
        </Button>
    </div>
}

export default React.memo(ActionCard)