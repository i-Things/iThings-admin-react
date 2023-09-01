/* eslint-disable @typescript-eslint/no-shadow */
import {
  postApiV1ThingsRuleSceneInfoCreate,
  postApiV1ThingsRuleSceneInfoRead,
  postApiV1ThingsRuleSceneInfoUpdate,
} from '@/services/iThingsapi/changjingliandong';
import { getLocalStoragByKey, isCorn, setLocalStorage } from '@/utils/utils';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { useMount, useRequest } from 'ahooks';
import {
  Button,
  Card,
  Collapse,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  message,
} from 'antd';
import { useCallback, useRef, useState } from 'react';
import { history } from 'umi';
import ActionCard from '../components/ActionCard';
import ActionType, { ActionWayType } from '../components/ActionType';
import WhenItem from '../components/WhenItem';
import style from './style.less';
const { Panel } = Collapse;
const { Option } = Select;
export type BoxItemType = {
  list: API.scene[];
};

const DetailPage = () => {
  const [timeTrigetModalOpen, setTimeTrigetModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [cron, setCron] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const currentId = useRef<number | null>(null);
  const WhenItemRef = useRef<any>();

  // then 组件的 state
  const [then, setThen] = useState();

  // when 组件的 state
  const [when, setWhten] = useState();
  // 消息延迟
  const [delayForm] = Form.useForm();
  const [delayModalOpen, setDelayModalOpen] = useState(false);

  // 类型弹窗
  const [typeForm] = Form.useForm();

  const [thenForm] = Form.useForm();

  // 打开弹窗
  const handleTimeClick = () => {
    if (cron) {
      form.setFieldValue('cron', cron);
    }
    setTimeTrigetModalOpen(true);
  };

  // 定时弹窗点击确定
  const onCreate = (values: { cron: string }) => {
    setCron(values.cron);
    form.resetFields();
    setTimeTrigetModalOpen(false);
  };

  const currentRecord = useRef<{
    index: number;
    type: string;
  } | null>(null);

  // 定时触发-触发规则-弹窗
  const timeTrigetModal = (
    <Modal
      open={timeTrigetModalOpen}
      title="触发规则"
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        setTimeTrigetModalOpen(false);
        form.resetFields();
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
      <Form form={form} layout="horizontal" name="form_in_modal" initialValues={{ cron: cron }}>
        <Form.Item
          name="cron"
          label="cron"
          validateTrigger={['onBlur']}
          rules={[
            {
              validateTrigger: 'onBlur',
              validator: (rule, value) => {
                return isCorn(value);
              },
            },
          ]}
        >
          <Input placeholder="cron表达式" />
        </Form.Item>
      </Form>
    </Modal>
  );

  // ActionCard 组件的点击事件回调
  const handleActionCardCallBack = useCallback(
    (values) => {
      console.log('values', values);
      const { type, index, property } = values;

      // 根据 type 执行后续动作
      if (type === ActionWayType.DEFERRED_EXECUTION) {
        currentRecord.current = {
          index: index,
          type: type,
        };
        delayForm.setFieldValue('delay', property.delay);
        setDelayModalOpen(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [currentRecord?.current?.index],
  );

  const setStateFormValue = (values: any) => {
    console.log('设置state', values);
    setThen(values);
  };

  const convertedFormValue = (values: any) => {
    console.log('values', values);
    const params: any[] = [];
    values?.then?.map((item: any) => {
      params.push({ executor: values?.executor, delay: item?.thenInfo?.property?.delay });
    });

    return params;
  };
  const getFormValue = () => {
    const formValue = thenForm.getFieldsValue();
    console.log('formValue', formValue);
    const values = convertedFormValue(formValue);
    setStateFormValue(values);
  };

  const handleOnClose = () => {
    delayForm.resetFields();
    // 关闭弹窗
    setActionModalOpen(false);
    setDelayModalOpen(false);
    // 获取数据
    getFormValue();
  };

  const handleDelayOK = () => {
    delayForm
      .validateFields()
      .then((values) => {
        const value = typeForm.getFieldsValue();
        // 取出原来的
        const originFieldValue = thenForm.getFieldValue('then') ?? [];
        const info = {
          type: value.actionType ?? currentRecord?.current?.type ?? '延迟执行',
          property: {
            delay: values.delay,
          },
        };
        console.log('originFieldValue', originFieldValue);

        console.log('info', info);

        // 修改
        if (currentRecord?.current?.index || currentRecord?.current?.index === 0) {
          originFieldValue[currentRecord?.current?.index] = { thenInfo: info };
        } else {
          // TODO：新增一条数据
          originFieldValue.push({ thenInfo: info });
        }
        thenForm.setFieldValue('then', [...originFieldValue]);

        console.log('originFieldValue', originFieldValue);

        handleOnClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // const setWhen = (values) => {
  // when: [{
  //     columnTime: {
  //         corn: '',
  //         type: cron
  //     },
  //     columnType: 'sysTime',
  //     netCondition: 'and'
  // }]

  // }

  const covertThen = (values: any) => {
    const _then = JSON.parse(values);

    console.log('_then11', _then);

    const newThen: any = [];

    _then.map((item: any, index: number) => {
      newThen.push({
        thenInfo: { type: '延迟执行', property: item },
      });
      currentRecord.current = {
        index: index,
        type: '延迟执行',
      };
    });

    console.log('newThen', newThen);

    thenForm.setFieldValue('executor', 'delay');
    thenForm.setFieldValue('then', newThen);
  };

  const { run } = useRequest(
    async () => {
      const res = await postApiV1ThingsRuleSceneInfoRead({
        id: currentId?.current as number,
      });
      return res.data;
    },
    {
      manual: true,
      refreshDeps: [currentId?.current],
      onSuccess: (value) => {
        console.log('value', value);

        const { desc, name, id, status, then, when, trigger, triggerType } = value;

        setLocalStorage('createScene', {
          name,
          id,
          status,
          triggerType,
        });

        //
        const _cron = JSON.parse(trigger)?.timer?.cron;
        console.log('when执行完毕');

        // 转化 when
        if (WhenItemRef.current && when) {
          WhenItemRef.current.setFormValue(JSON.parse(when));
        }
        // 转化 then
        covertThen(then);
        setCron(_cron);
        setDesc(desc);
      },
      onError: (error) => {
        message.error('获取规则错误:' + error.message);
      },
    },
  );

  // 初始化时
  useMount(() => {
    const id = searchParams.get('id');
    if (id) {
      currentId.current = Number(id);
      run();
    }

    console.log('id', id);
  });

  // 添加执行动作-弹窗
  const actionConditionModal = (
    <Modal
      open={actionModalOpen}
      title="类型"
      width={900}
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        setActionModalOpen(false);
        typeForm.resetFields();
      }}
      onOk={() => {
        typeForm
          .validateFields()
          .then((values) => {
            console.log('values11', values);
            if (values.actionType !== ActionWayType.DEFERRED_EXECUTION) {
              message.info('当前只支持延迟执行，其他的正在开发');
              return;
            }
            if (values.actionType === ActionWayType.DEFERRED_EXECUTION) {
              setDelayModalOpen(true);
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={typeForm} layout="vertical" name="form_in_modal" initialValues={{}}>
        <Form.Item
          name="actionType"
          label="类型"
          rules={[{ required: true, message: '请选择类型' }]}
        >
          <ActionType />
        </Form.Item>
      </Form>
    </Modal>
  );

  // 消息延迟-弹窗
  const delayModal = (
    <Modal
      open={delayModalOpen}
      title="延迟执行"
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        setDelayModalOpen(false);
        delayForm.resetFields();
      }}
      onOk={handleDelayOK}
    >
      <Form
        form={delayForm}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{
          delay: {
            time: 0.0,
            unit: 'seconds',
          },
        }}
      >
        <Form.Item label="定时">
          <Space.Compact>
            <Form.Item name={['delay', 'time']} noStyle>
              <InputNumber defaultValue={0.0} />
            </Form.Item>
            <Form.Item name={['delay', 'unit']} noStyle>
              <Select style={{ width: 80 }} defaultValue={'s'}>
                <Option value="seconds">秒</Option>
                <Option value="minutes">分</Option>
                <Option value="hours">小时</Option>
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form>
    </Modal>
  );

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const handleOpenAddTypeModal = () => {
    currentRecord.current = null;
    setActionModalOpen(true);
  };

  const handleSubmit = async () => {
    // 获取本地缓存中的数据
    const storage = getLocalStoragByKey('createScene');
    if (storage.triggerType !== 'timer') {
      message.error('目前只支持定时触发');
    }
    let res = null;

    // 执行定时触发的逻辑
    if (storage && storage.triggerType && storage.triggerType === 'timer') {
      // 更新
      if (currentId.current) {
        const params = {
          triggerType: 'timer',
          trigger: JSON.stringify({
            timer: {
              type: 'cron',
              cron: cron,
            },
          }),
          when: JSON.stringify(when),
          then: JSON.stringify(then),
          desc: desc,
          ...storage,
        };
        res = await postApiV1ThingsRuleSceneInfoUpdate(params);
        console.log('res', res);
        console.log('params', params);
      } else {
        // 新增
        const params = {
          name: storage.name,
          triggerType: 'timer',
          trigger: JSON.stringify({
            timer: {
              type: 'cron',
              cron: cron,
            },
          }),
          when: JSON.stringify(when),
          then: JSON.stringify(then),
          desc: desc,
          status: 2,
        };
        res = await postApiV1ThingsRuleSceneInfoCreate(params);
        console.log('res', res);

        console.log('params', params);
      }

      if (res instanceof Response) {
        return;
      }
      message.success('操作成功');
      history.push('/ruleEngine/scene/index');
    }
  };

  const getFormValueFn = (values: any) => {
    console.log('得到WhenItem组件数据', values);
    setWhten(values.when);
  };

  return (
    <PageContainer>
      <Card>
        <div className={style['scene-header']}>
          <div className={style.title}>定时触发</div>
          <div className={style['triget-type']}>定时触发</div>
        </div>
        {/* 触发规则 */}
        <div className={style['title-content']}>触发规则</div>
        <div className={style['content-wrap']}>
          <div className={style['rule-button-warp']}>
            <Button onClick={handleTimeClick}>{cron ? cron : '点击配置定时触发规则'}</Button>
          </div>
        </div>
        {/* 当 */}
        <div className={style['content-wrap']}>
          <div className={style['actions-terms-warp']}>
            <div className={style['actions-terms-title']}>当</div>
            <div className={style['actions-terms-options-wrap']}>
              <div className={style['actions-terms-options']}>
                <WhenItem getFormValueFn={getFormValueFn} ref={WhenItemRef} />
              </div>

              <div className={style['actions-terms-options']}>
                <Collapse defaultActiveKey={['1']} onChange={onChange} style={{ width: '100%' }}>
                  <Panel
                    header="串行(按顺序依次执行动作，适用于基于动作输出参数，判断是否执行后续动作的场景)"
                    key="1"
                  >
                    <Form
                      name="dynamic_form_nest_item"
                      onFinish={(values) => {
                        console.log('values', values);
                      }}
                      form={thenForm}
                      initialValues={{
                        executor: 'delay',
                      }}
                      autoComplete="off"
                      onFieldsChange={(filed) => {
                        console.log('filed', filed);
                        // 获取数据
                        getFormValue();
                      }}
                    >
                      {/* executor */}
                      <Form.Item name="executor" label="executor" noStyle />
                      <Form.List name="then">
                        {(fields, { remove }) => (
                          <>
                            {fields.map((item: any, index: number, ...restField) => (
                              <Space
                                key={item.key}
                                style={{ display: 'flex', marginBottom: 8 }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[item.name, `thenInfo`]}
                                  rules={[{ required: true, message: 'Missing thenInfo name' }]}
                                >
                                  <ActionCard
                                    key={item.name}
                                    handleActionCardCallBack={handleActionCardCallBack}
                                    index={index}
                                  />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(item.name)} />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => {
                                  handleOpenAddTypeModal();
                                  // add()
                                }}
                                block
                                icon={<PlusOutlined />}
                              >
                                新增执行动作
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
        </div>

        <div className={style['title-content']}>说明</div>
        <div className={style['content-wrap']}>
          <Input.TextArea
            value={desc}
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleSubmit}>
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
