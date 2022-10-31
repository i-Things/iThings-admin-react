import { Field, FormPath, SchemaForm } from '@formily/antd';
import {
  ArrayTable as FArrayTable,
  FormItemGrid,
  FormLayout, FormMegaLayout, Input as FInput,
  NumberPicker as FNumberPicker,
  Select as FSelect,
  Switch as FSwitch
} from '@formily/antd-components';
import type { ISchemaFormAsyncActions } from '@formily/react-schema-renderer/lib/types';
import { AutoComplete, Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';

import { createAsyncFormActions, FormEffectHooks, FormSpy } from '@formily/antd';
import { useRef, useState } from 'react';

const { onFieldValueChange$ } = FormEffectHooks;

type EditFormType = {
  modalVisit: boolean;
  setModalVisit: any;
};

export const EditForm: React.FC<EditFormType> = (props) => {
  const ruleActions = useRef<ISchemaFormAsyncActions>(createAsyncFormActions());
  const [currentDataType, setCurrentDataType] = useState()
  const ruleModalFormItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const typeBtnList = [
    { label: '属性', value: 1 },
    { label: '事件', value: 2 },
    { label: '行为', value: 3 },
  ];

  const actionTypeBtnList = [
    { label: '告警', value: 1 },
    { label: '故障', value: 2 },
    { label: '信息', value: 3 },
  ]

  const shujuleixingBtnList = [
    { label: '布尔型', value: 'bool' },
    { label: '整数型', value: 'int' },
    { label: '字符串', value: 'string' },
    { label: '浮点型', value: 'float' },
    { label: '枚举整型', value: 'enum' },
    // { label: '枚举字符串', value: 'action' }, 不支持
    { label: '时间型', value: 'timestamp' },
    { label: '结构体', value: 'struct' },
    { label: '数组', value: 'array' },
  ];

  const readWrtieList = [
    { label: '读写', value: 'rw' },
    { label: '自读', value: 'r' },
  ];

  const onModalFinish = (values: any) => {
    console.log('values', values);
  };

  // 定义一个映射数组类型对应哪些 表单项显示  -- mode
  const modeFormItemMapping = {
    bool: ['shujudingyi'],
    int: ['shuzhifanwei', 'start', 'step', 'unit'],
    string: ['shujudingyiForString'],
    float: ['shuzhifanwei', 'start', 'step', 'unit'],
    enum: ['shujudingyiForMeiju'],
    timestamp: ['shujudingyiForTime'],
    struct: ['struct'],
    array: [],
  };

  // 定义一个映射数组类型对应哪些 表单项显示  -- type
  const typeFormItemMapping = {
    1: ['mode', 'duxieleixing', 'shujudingyi'],
    2: ['actionType'],
    3: ['actionType'],
  };


  const intTypeFormItem1 = (
    <Field type="object" name="shujudingyi" title="数据定义" required>
      <FormMegaLayout grid full>
        <Field
          type="object"
          name="shuzhifanwei"
          title="数值范围"
          x-props={{ visible: false }}
          required
        >
          <FormItemGrid gutter={12} cols={[3, 3]} style={{ marginBottom: -25 }}>
            <Field
              type="number"
              name="type1"
              x-component="NumberPicker"
              required
              x-props={{
                placeholder: '请选择',
              }}
            />
            -
            <Field
              type="number"
              name="type"
              x-component="NumberPicker"
              required
              x-props={{
                placeholder: '请选择',
              }}
            />
          </FormItemGrid>
        </Field>
        {/* 初始值 */}
        <Field
          type="number"
          name="start"
          title="初始值"
          required
          x-props={{
            placeholder: '请输入功能名称',
            visible: false,
          }}
          x-component="NumberPicker"
        />
        {/* 步长 */}
        <Field
          type="number"
          name="step"
          title="步长"
          required
          x-props={{
            placeholder: '请输入功能名称',
            visible: false,
          }}
          x-component="NumberPicker"
        />
        {/* 单位 */}
        <Field
          type="string"
          name="unit"
          title="单位"
          required
          maxLength={12}
          x-props={{
            placeholder: '请输入单位',
            extra: '支持0-12个字符',
            visible: false,
          }}
          x-component="Input"
        />

      </FormMegaLayout>
    </Field>
  );

  // 不能直接用现有的 boolTypeFormItem 这些 直接渲染 结构体中的 要用原生的
  // 所以需要全部复刻一遍
  const boolTypeFormItem = (
    <Field type="object" name="shujudingyi" title="数据定义" required>
      <FormItemGrid gutter={10} cols={[6, 6]} style={{ marginBottom: -25 }}>
        <Field
          type="string"
          name="type1"
          x-component="Input"
          required
          x-props={{
            placeholder: '请选择',
            addonBefore: '0',
          }}
        />
        <Field
          type="string"
          name="type"
          x-component="Input"
          required
          x-props={{
            placeholder: '请选择',
            addonBefore: 1,
          }}
        />
      </FormItemGrid>
    </Field>
  );

  const intTypeFormItem = (
    <>
      <Field
        type="object"
        name="shuzhifanwei"
        title="数值范围"
        x-props={{ visible: false }}
        required
      >
        <FormItemGrid gutter={12} cols={[3, 3]} style={{ marginBottom: -25 }}>
          <Field
            type="number"
            name="type1"
            x-component="NumberPicker"
            required
            x-props={{
              placeholder: '请选择',
            }}
          />
          -
          <Field
            type="number"
            name="type"
            x-component="NumberPicker"
            required
            x-props={{
              placeholder: '请选择',
            }}
          />
        </FormItemGrid>
      </Field>
      {/* 初始值 */}
      <Field
        type="number"
        name="start"
        title="初始值"
        required
        x-props={{
          placeholder: '请输入功能名称',
          visible: false,
        }}
        x-component="NumberPicker"
      />
      {/* 步长 */}
      <Field
        type="number"
        name="step"
        title="步长"
        required
        x-props={{
          placeholder: '请输入功能名称',
          visible: false,
        }}
        x-component="NumberPicker"
      />
      {/* 单位 */}
      <Field
        type="string"
        name="unit"
        title="单位"
        required
        maxLength={12}
        x-props={{
          placeholder: '请输入单位',
          extra: '支持0-12个字符',
          visible: false,
        }}
        x-component="Input"
      />
    </>
  );

  const stringTypeFormItem = (
    <>
      {' '}
      <Field
        type="number"
        name="shujudingyiForString"
        title="数据定义"
        required
        x-props={{
          placeholder: '请输入数据定义',
          visible: false,
          addonBefore: '字节',
        }}
        x-component="NumberPicker"
      />
    </>
  );

  const enumTypeFormItem = (
    <>
      <FormLayout
        className="rule_for_Table"
        wrapperCol={{
          span: 24,
        }}
      >
        <Field
          type="array"
          name="shujudingyiForMeiju"
          title="数据定义"
          x-component="ArrayTable"
          required
          x-component-props={{
            operationsWidth: 80,
            operations: {
              title: '',
            },
            renderMoveDown: () => null,
            renderMoveUp: () => null,
            renderRemove: (idx: number) => {
              const mutators = ruleActions.current.createMutators('shujudingyiForMeiju');
              return (
                <FormSpy selector={[['onFieldValueChange', `userList.${idx}.username`]]}>
                  {({ }) => {
                    return (
                      <a
                        style={{
                          width: '60px',
                        }}
                        onClick={async () => {
                          (await mutators).remove(idx);
                        }}
                      >
                        删除
                      </a>
                    );
                  }}
                </FormSpy>
              );
            },
          }}
        >
          <Field type="object">
            <Field
              type="string"
              name="label"
              x-component="NumberPicker"
              title="枚举键值"
              required
            />
            <Field type="string" name="value" x-component="Input" title="枚举项描述" />
          </Field>
        </Field>
      </FormLayout>
    </>
  );

  const timeTypeFormItem = (
    <>
      <Field type="object" name="shujudingyiForTime" title="数据定义" required>
        <Field
          type="string"
          name="type1"
          x-component="Input"
          required
          default="INT类型的UTC时间戳（秒）"
          readOnly
        />
      </Field>
    </>
  );

  // 定义一个映射数组类型对应 哪些 组件显示到 数据定义栏目
  const modeFormComponentMapping = {
    'bool': boolTypeFormItem,
    'int': intTypeFormItem,
    'string': stringTypeFormItem,
    'float': stringTypeFormItem,
    'enum': enumTypeFormItem,
    'timestamp': timeTypeFormItem,
  }


  const structTypeFormItem = (
    <>
      <FormLayout
        className="rule_for_Table"
        wrapperCol={{
          span: 24,
        }}
      >
        <Field
          type="array"
          name="struct"
          title="数据定义"
          x-component="ArrayTable"
          required
          x-component-props={{
            operationsWidth: 80,
            operations: {
              title: '',
            },
            renderMoveDown: () => null,
            renderMoveUp: () => null,
            renderRemove: (idx: number) => {
              const mutators = ruleActions.current.createMutators('struct');
              return (
                <FormSpy selector={[['onFieldValueChange', `userList.${idx}.username`]]}>
                  {({ }) => {
                    return (
                      <a
                        style={{
                          width: '60px',
                        }}
                        onClick={async () => {
                          (await mutators).remove(idx);
                        }}
                      >
                        删除
                      </a>
                    );
                  }}
                </FormSpy>
              );
            },
          }}
        >
          <Field type="object">
            <Field type="string" name="label" x-component="Input" title="参数名称" required />
            <Field type="string" name="label1" x-component="Input" title="参数标识符" required />
            <Field
              type="string"
              name="value"
              x-component="Select"
              title="数据类型"
              enum={shujuleixingBtnList}
            />
            {/* 动态渲染 */}
            <Field
              type="array"
              name="value11"
              x-component="customFormItem"
              title="数据定义"
            />

          </Field>
        </Field>
      </FormLayout>
    </>
  );





  const formItemVisibleConfig = (formItems: string[], flag: boolean) => {
    if (formItems.length === 0) {
      console.error('只有一条')
      return
    }
    formItems.map((item: string) => {
      ruleActions.current.setFieldState(item, (sta) => {
        sta.visible = flag;
      });
    });
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      visible={props.modalVisit}
      onOk={() => {
        ruleActions.current.submit();
      }}
      onCancel={() => {
        props.setModalVisit();
      }}
      title={'新建自定义规则'}
      width={1100}
      maskClosable={false}
    >
      <SchemaForm
        {...ruleModalFormItemLayout}
        actions={ruleActions.current}
        components={{
          AutoComplete,
          Switch: FSwitch,
          Input: FInput,
          TextArea: FInput.TextArea,
          Select: FSelect,
          Radio: Radio.Group,
          ArrayTable: FArrayTable,
          NumberPicker: FNumberPicker,
          boolTypeFormItemOrign: ({ value, onChange }) => (
            <Space style={{ display: 'flex' }}>
              <Input
                addonBefore="0"
                defaultValue="开"
                onChange={(v) => {
                  onChange({
                    ...value,
                    name1: v.target.value,
                  });
                }}
                value={value ? value.name1 : undefined}
              />
              <Input
                addonBefore="1"
                defaultValue="关"
                onChange={(v) => {
                  onChange({
                    ...value,
                    name2: v.target.value,
                  });
                }}
                value={value ? value.name2 : undefined}
              />
            </Space>
          ),
          intTypeFormItemOrigin: ({ value, onChange }) => {
            return (
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onValuesChange={(changedValues, allValues) => {
                  console.log('changedValues', changedValues);
                  console.log('allValues', allValues);
                  onChange({
                    ...value,
                    ...allValues,
                  });
                }}
              >
                <Form.Item label="数值范围">
                  <Form.Item name="username1">
                    <InputNumber />
                  </Form.Item>
                  -
                  <Form.Item name="username2">
                    <InputNumber />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="初始值" name="start">
                  <InputNumber />
                </Form.Item>

                <Form.Item label="步长" name="step">
                  <InputNumber />
                </Form.Item>
                <Form.Item label="单位" name="unit">
                  <Input />
                </Form.Item>
              </Form>
            );
          },
          stringTypeFormItemOrigin: ({ value, onChange }) => {
            return (
              <InputNumber
                addonBefore="字节"
                onChange={(v) => {
                  onChange({ ...value, shujudingyiForString: v });
                }}
              />
            );
          },
          enumTypeFormItemOrigin: ({ value, onChange }) => {
            return (
              <Form
                name="dynamic_form_nest_item11"
                autoComplete="off"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onValuesChange={(changedValues, allValues) => {
                  console.log('changedValues', changedValues);
                  console.log('allValues', allValues);
                  onChange({
                    ...value,
                    ...allValues,
                  });
                }}
              >
                <Form.List name="sights">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.area !== curValues.area ||
                              prevValues.sights !== curValues.sights
                            }
                          >
                            {() => (
                              <Form.Item
                                {...field}
                                label="Sight"
                                name={[field.name, 'sight']}
                                rules={[{ required: true, message: 'Missing sight' }]}
                              >
                                <InputNumber />
                              </Form.Item>
                            )}
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Price"
                            name={[field.name, 'price']}
                            rules={[{ required: true, message: 'Missing price' }]}
                          >
                            <Input />
                          </Form.Item>

                          <Button type="link" onClick={() => add()}>
                            添加
                          </Button>
                          <Button type="link" onClick={() => remove(field.name)}>
                            删除
                          </Button>
                        </Space>
                      ))}
                    </>
                  )}
                </Form.List>
              </Form>
            );
          },
          customFormItem: () => <Field
            type="string"
            name="value"
            x-component="Select"
            title="数据类型"
            enum={shujuleixingBtnList}
          />
        }}
        initialValues={{
          type: 1,
          mode: 'bool',
          duxieleixing: 'rw',
        }}
        onSubmit={onModalFinish}
        effects={() => {
          // 监听 mode 表单项显示 数据类型
          onFieldValueChange$('mode').subscribe((state) => {
            const value = state.value;
            console.log('value', value);
            if (!value) {
              return
            }

            let allFormItem: string[] = [];

            Object.keys(modeFormItemMapping).map((item) => {
              allFormItem = allFormItem.concat(modeFormItemMapping[item]);
            });

            // 先把所有的 设置为 false
            formItemVisibleConfig(allFormItem, false);

            console.log('allFormItem', allFormItem);

            const showFormItem = modeFormItemMapping[value];

            // 再把对应的表单项展示出来
            formItemVisibleConfig(showFormItem, true);

            // 设置不同的 props
            if (value === 'int') {
              showFormItem.map((item: string) => {
                ruleActions.current.setFieldState(item, (sta) => {
                  sta.props['x-rules'] = {
                    pattern: /^[1-9]\d*$/,
                    message: '请输入整数',
                  };
                  console.log('sta.props]', sta.props['x-component-props']);
                });
              });
            }
          });
          // 监听 type 表单项显示 功能类型
          onFieldValueChange$('type').subscribe((state) => {
            const value = state.value
            console.log('valuetype', value);

            let allFormItem: string[] = [];

            Object.keys(typeFormItemMapping).map((item) => {
              allFormItem = allFormItem.concat(typeFormItemMapping[item]);
            });

            // 先把所有的 设置为 false
            formItemVisibleConfig(allFormItem, false);

            console.log('allFormItem', allFormItem);

            const showFormItem = typeFormItemMapping[value];

            console.log('showFormItem1', showFormItem);
            if (!showFormItem) {
              return
            }


            // 再把对应的表单项展示出来
            formItemVisibleConfig(showFormItem, true);
          })

          // 监听数据定义中的数据类型不一样，数据定义展示不一样的值
          onFieldValueChange$('struct.*.value').subscribe(async ({ name, value }) => {
            console.log('name1', name);
            console.log('value1', value);

            setCurrentDataType(value)

            // 根据不同的值 渲染不同的界面
            await ruleActions.current.setFieldState(
              FormPath.transform(name, /\d/, ($1) => {
                return `struct.${$1}.value11`;
              }),
              (state) => {
                // 
                console.log('执行了', modeFormComponentMapping);
                console.log('执行了', value);

                console.log('modeFormComponentMapping[value]', modeFormComponentMapping[value]);

                state.props['x-component'] = 'enumTypeFormItemOrigin';
              },
            );
          });
        }}
      >
        <Field
          type="string"
          title="功能类型"
          name="type"
          x-component="Radio"
          x-props={{
            placeholder: '请选择功能类型',
            optionType: 'button',
            options: typeBtnList,
          }}
        />
        <Field
          type="string"
          name="name"
          title="功能名称"
          required
          x-props={{
            placeholder: '请输入功能名称',
          }}
          x-component="Input"
        />

        <Field
          type="string"
          name="identifier"
          title="标识符"
          required
          x-props={{
            placeholder: '请输入标识符',
          }}
          x-component="Input"
        />

        {/* 功能类型为属性开始} */}
        <Field
          type="string"
          name="mode"
          title="数据类型"
          required
          x-props={{
            placeholder: '请选择数据类型',
            optionType: 'button',
            options: shujuleixingBtnList,
          }}
          x-component="Radio"
        />

        <Field
          type="string"
          name="duxieleixing"
          title="读写类型"
          required
          x-props={{
            placeholder: '请选择读写类型',
            optionType: 'button',
            options: readWrtieList,
          }}
          x-component="Radio"
        />
        {boolTypeFormItem}
        {intTypeFormItem}
        {stringTypeFormItem}
        {enumTypeFormItem}
        {timeTypeFormItem}
        {structTypeFormItem}
        {/* 功能类型为属性结束 */}

        {/* 功能类型为事件开始 */}
        {/* 事件类型 */}
        <Field
          type="string"
          title="事件类型11"
          name="actionType"
          x-component="Radio"
          x-props={{
            placeholder: '请选择事件类型1',
            optionType: 'button',
            options: actionTypeBtnList,
          }}
        />
        {/* 事件参数 */}
        {/* {structTypeFormItem} */}



        {/* 功能类型为事件结束 */}



        {/* 功能类型为行为开始 */}
        {/* 功能类型为行为结束 */}
        <Field
          type="string"
          name="decs"
          title="描述"
          required
          x-props={{
            placeholder: '请输入描述',
          }}
          x-component="TextArea"
        />
      </SchemaForm>
    </Modal>
  );
};
