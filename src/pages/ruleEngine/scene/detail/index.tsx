import { isCorn } from '@/utils/utils';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Collapse, Form, Input, InputNumber, Modal, Select, Space } from 'antd';
import { useCallback, useRef, useState } from 'react';
import ActionCard from '../components/ActionCard';
import ActionType, { ActionWayType } from '../components/ActionType';
import WhenItem from '../components/WhenItem';
import './style.less';
import style from './style.less';
const { Panel } = Collapse;
const { Option } = Select;
export type BoxItemType = {
    list: API.scene[]
}

const DetailPage = () => {
    const [timeTrigetModalOpen, setTimeTrigetModalOpen] = useState(false)
    const [actionModalOpen, setActionModalOpen] = useState(false)
    const [cron, setCron] = useState('')
    const [form] = Form.useForm()
    // 消息延迟
    const [delayForm] = Form.useForm()
    const [delayModalOpen, setDelayModalOpen] = useState(false)

    // 类型弹窗
    const [typeForm] = Form.useForm()

    const [actionForm] = Form.useForm();

    // 打开弹窗
    const handleTimeClick = () => {
        if (cron) {
            form.setFieldValue('cron', cron)
        }
        setTimeTrigetModalOpen(true)
    }

    // 定时弹窗点击确定
    const onCreate = (values: { cron: string }) => {
        setCron(values.cron)
        form.resetFields();
        setTimeTrigetModalOpen(false)
    }

    const currentRecord = useRef<{
        index: number,
        type: string,
    } | null>(null)


    // 定时触发-触发规则-弹窗
    const timeTrigetModal = <Modal
        open={timeTrigetModalOpen}
        title="触发规则"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
            setTimeTrigetModalOpen(false)
            form.resetFields()
        }}
        onOk={() => {
            form
                .validateFields()
                .then((values) => {
                    onCreate(values);
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        }}
    >
        <Form
            form={form}
            layout="horizontal"
            name="form_in_modal"
            initialValues={{ cron: cron }}
        >
            <Form.Item
                name="cron"
                label="cron"
                validateTrigger={['onBlur']}
                rules={[{
                    validateTrigger: 'onBlur',
                    validator: (rule, value) => {
                        return isCorn(value)
                    },
                }]}
            >
                <Input placeholder='cron表达式' />
            </Form.Item>
        </Form>
    </Modal>

    // ActionCard 组件的点击事件回调
    const handleActionCardCallBack = useCallback((values) => {
        console.log('values', values);
        const { type, index, property } = values

        // 根据 type 执行后续动作
        if (type === ActionWayType.DEFERRED_EXECUTION) {
            currentRecord.current = {
                index: index,
                type: type
            }
            delayForm.setFieldValue('delay', property.delay)
            setDelayModalOpen(true)
        }
    }, [currentRecord?.current?.index])


    const handleOnClose = () => {
        // 关闭弹窗
        setActionModalOpen(false)
        setDelayModalOpen(false)
    }

    const handleDelayOK = () => {
        delayForm
            .validateFields()
            .then((values) => {
                const value = typeForm.getFieldsValue()
                // 取出原来的 
                const originFieldValue = actionForm.getFieldValue('users') ?? []
                const info = {
                    type: value.actionType ?? currentRecord?.current?.type,
                    property: {
                        delay: values.delay
                    }
                }
                console.log('originFieldValue', originFieldValue);

                console.log('info', info);


                // 修改
                if (currentRecord?.current?.index || currentRecord?.current?.index === 0) {

                    originFieldValue[currentRecord?.current?.index] = { first: info }
                } else {
                    // TODO：新增一条数据
                    originFieldValue.push({ first: info })
                }
                actionForm.setFieldValue('users', [...originFieldValue])

                console.log('originFieldValue', originFieldValue);

                handleOnClose()
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    // 添加执行动作-弹窗
    const actionConditionModal = <Modal
        open={actionModalOpen}
        title="类型"
        width={900}
        okText="确定"
        cancelText="取消"
        onCancel={() => {
            setActionModalOpen(false)
            typeForm.resetFields()
        }}
        onOk={() => {
            typeForm
                .validateFields()
                .then((values) => {
                    console.log('values11', values);
                    if (values.actionType === ActionWayType.DEFERRED_EXECUTION) {
                        setDelayModalOpen(true)
                    }
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        }}
    >
        <Form
            form={typeForm}
            layout="vertical"
            name="form_in_modal"
            initialValues={{}}
        >
            <Form.Item
                name="actionType"
                label="类型"
                rules={[{ required: true, message: '请选择类型' }]}
            >
                <ActionType />
            </Form.Item>
        </Form>
    </Modal>

    // 消息延迟-弹窗
    const delayModal = <Modal
        open={delayModalOpen}
        title="延迟执行"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
            setDelayModalOpen(false)
            delayForm.resetFields()
        }}
        onOk={handleDelayOK}
    >
        <Form
            form={delayForm}
            layout="horizontal"
            name="form_in_modal"
            initialValues={{
                delay: {
                    time: 0.00,
                    unit: 's'
                }
            }}
        >

            <Form.Item label="定时">
                <Space.Compact>
                    <Form.Item
                        name={['delay', 'time']}
                        noStyle
                    >
                        <InputNumber defaultValue={0.00} />
                    </Form.Item>
                    <Form.Item
                        name={['delay', 'unit']}
                        noStyle
                    >
                        <Select style={{ width: 80 }} defaultValue={'s'}>
                            <Option value="s">秒</Option>
                            <Option value="m">分</Option>
                            <Option value="h">小时</Option>
                        </Select>
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
        </Form>
    </Modal>

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const handleOpenAddTypeModal = () => {
        currentRecord.current = null
        setActionModalOpen(true)
    }

    return (
        <PageContainer>
            <Card>
                <div className={style['scene-header']}>
                    <div className={style.title}>定时触发</div>
                    <div className={style['triget-type']}>
                        定时触发
                    </div>
                </div>
                {/* 触发规则 */}
                <div className={style['title-content']}>触发规则</div>
                <div className={style['content-wrap']}>
                    <div className={style['rule-button-warp']}>
                        <Button onClick={handleTimeClick}>
                            {
                                cron ? cron : '点击配置定时触发规则'
                            }
                        </Button>
                    </div>
                </div>
                {/* 当 */}
                <div className={style['content-wrap']}>
                    <div className={style['actions-terms-warp']}>
                        <div className={style['actions-terms-title']}>
                            当
                        </div>
                        <div className={style['actions-terms-options-wrap']}>

                            <div className={style['actions-terms-options']}>
                                <WhenItem />
                            </div>

                            <div className={style['actions-terms-options']}>
                                <Collapse defaultActiveKey={['1']} onChange={onChange} style={{ width: '100%' }}>
                                    <Panel header="串行(按顺序依次执行动作，适用于基于动作输出参数，判断是否执行后续动作的场景)" key="1">
                                        <Form
                                            name="dynamic_form_nest_item"
                                            onFinish={(values) => {
                                                console.log('values', values);
                                            }}
                                            form={actionForm}
                                            style={{ maxWidth: 600 }}
                                            autoComplete="off"
                                        >
                                            <Form.List name="users">
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map((item: any, index: number, ...restField) => (
                                                            <Space key={item.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[item.name, `first`]}
                                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                                >
                                                                    <ActionCard key={item.name} handleActionCardCallBack={handleActionCardCallBack} index={index} />
                                                                </Form.Item>
                                                                <MinusCircleOutlined onClick={() => remove(item.name)} />
                                                            </Space>
                                                        ))}
                                                        <Form.Item>
                                                            <Button type="dashed" onClick={() => {
                                                                handleOpenAddTypeModal()
                                                                // add()
                                                            }
                                                            } block icon={<PlusOutlined />}>
                                                                Add field
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={style['title-content']}>说明</div>
                <div className={style['content-wrap']}>
                    <Input.TextArea />
                </div>

                <div>
                    <Button type='primary'>
                        保存
                    </Button>
                </div>
            </Card>
            {timeTrigetModal}
            {actionConditionModal}
            {delayModal}
        </PageContainer>
    );
};

export default DetailPage;
