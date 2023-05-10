/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  postApiV1ThingsProductSchemaCreate,
  postApiV1ThingsProductSchemaUpdate,
} from '@/services/iThingsapi/wumoxing';
import {
  createAsyncFormActions,
  Field,
  FormEffectHooks,
  FormMegaLayout,
  FormPath,
  FormSpy,
  SchemaForm,
} from '@formily/antd';
import {
  ArrayTable as FArrayTable,
  FormItemGrid,
  FormLayout,
  Input as FInput,
  NumberPicker as FNumberPicker,
  Select as FSelect,
  Switch as FSwitch,
} from '@formily/antd-components';
import type { ISchemaFormAsyncActions } from '@formily/react-schema-renderer/lib/types';
import { useParams } from '@umijs/max';
import { AutoComplete, Modal, Radio } from 'antd';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { EditFormType } from './const';
import {
  dataTypeList,
  eventTypeList,
  rwTypeList,
  typeBtnList,
  yuansuleixingList,
  _dataTypeList,
  _yuansuleixingList,
} from './const';

const { onFieldValueChange$ } = FormEffectHooks;

export const EditForm: React.FC<EditFormType> = forwardRef(({ ...props }, ref) => {
  useImperativeHandle(ref, () => ({
    setModelModalValue: setModelModalValue,
    clearModal: clearModal,
    createModel: createModel,
  }));

  const ruleActions = useRef<ISchemaFormAsyncActions>(createAsyncFormActions());
  const [isEdit, setIsEdit] = useState(false);
  const urlParams = useParams() as { id: string };
  const productID = urlParams.id ?? '';

  const currentFunctionType = useRef<1 | 2 | 3>(1);
  const ruleModalFormItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const onModalFinish = async (values: any) => {
    const {
      type,
      identifier,
      name,
      desc,
      mode,
      numericalRange,
      start,
      step,
      unit,
      max,
      dataDefinitionForenum,
      mapping,
      specs = [],
      input = [],
      output = [],
      params = [],
      dataType,
      eventType,
    } = values;

    let arrayInfo = {};
    //
    specs.map((item: any) => {
      item.dataType.type = item.type;
      if (item?.dataType?.numericalRange) {
        item.dataType.max = item.dataType.numericalRange.max + '';
        item.dataType.min = item.dataType.numericalRange.min + '';
        item.dataType.start = item.dataType.start + '';
        item.dataType.step = item.dataType.step + '';
        item.dataType.unit = item.dataType.unit + '';
      }

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((item: any) => {
          const key = item.label;
          const value = item.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }

      if (item.dataType.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: item.dataType.max + '',
        };
      }
    });

    input.map((item: any) => {
      item.dataType.type = item.type;
      if (item?.dataType?.numericalRange) {
        item.dataType.max = item.dataType.numericalRange.max + '';
        item.dataType.min = item.dataType.numericalRange.min + '';
        item.dataType.start = item.dataType.start + '';
        item.dataType.step = item.dataType.step + '';
        item.dataType.unit = item.dataType.unit + '';
      }

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((item: any) => {
          const key = item.label;
          const value = item.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }
      if (item.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: item.dataType.max + '',
        };
      }
      item.define = {
        ...item.dataType,
        type: item.type,
      };
    });

    output.map((item: any) => {
      item.dataType.type = item.type;
      if (item?.dataType?.numericalRange) {
        item.dataType.max = item.dataType.numericalRange.max + '';
        item.dataType.min = item.dataType.numericalRange.min + '';
        item.dataType.start = item.dataType.start + '';
        item.dataType.step = item.dataType.step + '';
        item.dataType.unit = item.dataType.unit + '';
      }

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((item: any) => {
          const key = item.label;
          const value = item.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }
      if (item.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: item.dataType.max + '',
        };
      }
      item.define = {
        ...item.dataType,
        type: item.type,
      };
    });

    params.map((item: any) => {
      if (item?.dataType?.numericalRange) {
        item.dataType.max = item.dataType.numericalRange.max + '';
        item.dataType.min = item.dataType.numericalRange.min + '';
        item.dataType.start = item.dataType.start + '';
        item.dataType.step = item.dataType.step + '';
        item.dataType.unit = item.dataType.unit + '';
      }

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((item: any) => {
          const key = item.label;
          const value = item.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }

      if (item.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: item.dataType.max + '',
        };
      }

      item.define = {
        ...item.dataType,
        type: item.type,
        max: item.dataType.max + '',
      };
    });

    const _max = numericalRange?.max + '' ?? max + '';

    if (dataType === 'array') {
      arrayInfo = {
        max: _max + '',
        min: numericalRange?.min + '',
        start: start + '',
        step: step + '',
        unit: unit + '',
      };
    }

    const _mapping = {};
    dataDefinitionForenum?.map((item: any) => {
      const key = item.label;
      const value = item.value;
      _mapping[key] = value;
    });

    const __mapping = mapping ?? _mapping;
    const affordance = {
      define: {
        arrayInfo,
        specs,
        // input,
        // output,
        dataDefinitionForenum,
        type: values?.dataType ?? eventType,
        numericalRange,
        mapping: __mapping,
        max: _max + '',
        min: numericalRange?.min + '',
        start: start + '',
        step: step + '',
        unit: unit + '',
      },
      params,
      input,
      output,
      type: eventType,
      mode,
    };

    // 过滤掉 undefined 字段
    for (const key in affordance.define) {
      if (!affordance.define[key] || affordance.define[key] === 'undefined') {
        delete affordance.define[key];
      }
    }

    const _params = {
      productID,
      type,
      tag: 1,
      identifier,
      name,
      desc,
      required: 2,
      affordance: JSON.stringify(affordance),
    };

    let res = null;

    if (isEdit) {
      res = await postApiV1ThingsProductSchemaUpdate(_params);
    } else {
      res = await postApiV1ThingsProductSchemaCreate(_params);
    }

    if (res instanceof Response) {
      return;
    }

    await ruleActions.current.reset({
      validate: false,
    });
    props?.actionRef?.current?.reload();
    props.setModalVisit(false);
  };

  async function clearModal() {
    await ruleActions.current.reset({
      validate: false,
    });
  }

  async function createModel() {
    await ruleActions.current.reset({
      validate: false,
    });
    setIsEdit(false);
    props.setModalVisit(true);
  }

  async function setModelModalValue(record: any, _isEdit: boolean) {
    setIsEdit(_isEdit);
    const { type, identifier, name, desc, affordance } = record;

    ruleActions.current.setFieldValue('name', name);
    ruleActions.current.setFieldValue('identifier', identifier);
    ruleActions.current.setFieldValue('type', type);
    ruleActions.current.setFieldValue('desc', desc);

    const _affordance = JSON.parse(affordance);
    const mode = _affordance?.mode;
    const specs = _affordance?.define?.specs;
    specs.map((item) => {
      item.type = item.dataType.type;
      const numericalRange = {
        max: item.dataType.max,
        min: item.dataType.min,
      };
      item.dataType.numericalRange = numericalRange;
    });

    const params = _affordance?.params;
    const input = _affordance?.input;
    const output = _affordance?.output;

    const dataType = _affordance?.define?.type;
    const mapping = _affordance?.define?.mapping;
    const max = _affordance?.define?.max;
    const min = _affordance?.define?.min;
    const start = _affordance?.define?.start;
    const step = _affordance?.define?.step;
    const unit = _affordance?.define?.unit;

    const dataDefinitionForenum = _affordance?.define?.dataDefinitionForenum;
    const numericalRange = _affordance?.define?.numericalRange;

    ruleActions.current.setFieldValue('mode', mode);

    ruleActions.current.setFieldValue('mapping', mapping);
    ruleActions.current.setFieldValue('max', max);
    ruleActions.current.setFieldValue('min', min);
    ruleActions.current.setFieldValue('start', start);
    ruleActions.current.setFieldValue('step', step);
    ruleActions.current.setFieldValue('unit', unit);
    ruleActions.current.setFieldValue('dataDefinitionForenum', dataDefinitionForenum);
    ruleActions.current.setFieldValue('numericalRange', numericalRange);

    ruleActions.current.setFieldValue('dataType', dataType);
    ruleActions.current.setFieldValue('params', params);

    ruleActions.current.setFieldValue('specs', specs);
    ruleActions.current.setFieldValue('input', input);
    ruleActions.current.setFieldValue('output', output);
    ruleActions.current.setFieldValue('eventType', _affordance?.type);
    props.setModalVisit(true);
  }

  const rwTypeFormItem = (
    <Field
      type="string"
      name="mode"
      title="读写类型"
      x-component="Radio"
      x-props={{
        visible: false,
        placeholder: '请选择读写类型',
        optionType: 'button',
        options: rwTypeList,
      }}
    />
  );
  const boolTypeFormItem = (
    <Field
      type="object"
      name="mapping"
      title="数据定义"
      x-props={{
        visible: false,
        extra: '支持中文、英文、数字、下划线的组合，最多不超过12个字符',
      }}
    >
      <FormItemGrid gutter={10} cols={[6, 6]} style={{ marginBottom: -25 }}>
        <Field
          type="string"
          name="0"
          x-component="Input"
          x-props={{
            placeholder: '请输入',
            addonBefore: '0',
          }}
          x-rules={{
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,12}$/,
            message: '请输入中文、英文、数字、下划线的组合，最多不超过12个字符',
          }}
        />
        <Field
          type="string"
          name="1"
          x-component="Input"
          required
          x-props={{
            placeholder: '请输入',
            addonBefore: 1,
          }}
          x-rules={{
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,12}$/,
            message: '请输入中文、英文、数字、下划线的组合，最多不超过12个字符',
          }}
        />
      </FormItemGrid>
    </Field>
  );

  const intTypeFormItem = (
    <>
      <Field type="object" name="numericalRange" title="数值范围" x-props={{ visible: false }}>
        <FormMegaLayout
          inline
          labelWidth={120}
          wrapperWidth={200}
          full
          hasBorder={false}
          isLayout={false}
        >
          <Field
            type="string"
            name="min"
            x-component="NumberPicker"
            required
            x-props={{
              placeholder: '请输入最小值',
            }}
          />

          <Field
            type="string"
            name="max"
            x-component="NumberPicker"
            required
            x-props={{
              placeholder: '请输入最大值',
            }}
          />
        </FormMegaLayout>
      </Field>
      {/* 初始值 */}
      <Field
        type="number"
        name="start"
        title="初始值"
        x-props={{
          placeholder: '请输入初始值',
          visible: false,
        }}
        x-component="NumberPicker"
      />
      {/* 步长 */}
      <Field
        type="number"
        name="step"
        title="步长"
        x-props={{
          placeholder: '请输入步长',
          visible: false,
        }}
        x-component="NumberPicker"
      />
      {/* 单位 */}
      <Field
        type="string"
        name="unit"
        title="单位"
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
      <Field
        type="string"
        name="max"
        title="数据定义"
        x-props={{
          placeholder: '请输入最大值',
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
          name="dataDefinitionForenum"
          title="数据定义"
          x-component="ArrayTable"
          x-props={{ visible: false }}
          x-component-props={{
            operationsWidth: 80,
            operations: {
              title: '',
            },
            renderMoveDown: () => null,
            renderMoveUp: () => null,
            renderRemove: (idx: number) => {
              const mutators = ruleActions.current.createMutators('dataDefinitionForenum');
              return (
                <FormSpy selector={[['onFieldValueChange', `userList.${idx}.username`]]}>
                  {({}) => {
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

  const arrayTypeFormItem = (
    <Field
      type="string"
      name="elementType"
      title="元素类型"
      default={'int'}
      x-props={{
        placeholder: '请选择元素类型',
        optionType: 'button',
        options: _yuansuleixingList,
        visible: false,
      }}
      x-component="Radio"
    />
  );

  const timeTypeFormItem = (
    <>
      <Field
        type="object"
        name="dataDefinitionFortimestamp"
        title="数据定义"
        x-props={{ visible: false }}
      >
        <Field
          type="string"
          name="type11111"
          x-component="Input"
          x-component-props={{ defaultValue: 'INT类型的UTC时间戳（秒）' }}
          required
          default="INT类型的UTC时间戳（秒)"
          readOnly
        />
      </Field>
    </>
  );

  // 新的对应关系
  const formItemMapping = {
    1: ['dataType'],
    2: ['eventType', 'params'],
    3: ['input', 'output'],
  };

  const dataTypeMapping = {
    bool: ['mode', 'mapping'],
    int: ['mode', 'numericalRange', 'start', 'step', 'unit'],
    string: ['mode', 'max'],
    float: ['mode', 'numericalRange', 'start', 'step', 'unit'],
    enum: ['mode', 'dataDefinitionForenum'],
    timestamp: ['mode', 'dataDefinitionFortimestamp'],
    struct: ['mode', 'specs'],
    array: [
      'mode',
      'arrayInfo',
      'elementType',
      'numericalRange',
      'start',
      'step',
      'unit',
      'mode',
      'max',
      'mode',
    ],
  };

  const elementTypeMapping = {
    int: ['mode', 'numericalRange', 'start', 'step', 'unit'],
    string: ['mode', 'max'],
    float: ['mode', 'numericalRange', 'start', 'step', 'unit'],
    struct: ['mode', 'specs'],
  };

  const renderStructFormItem = (title: string, name: string) => {
    return (
      <FormLayout
        className="rule_for_Table"
        wrapperCol={{
          span: 24,
        }}
      >
        <Field
          type="array"
          name={name}
          title={title}
          x-component="ArrayTable"
          x-props={{ visible: false }}
          x-component-props={{
            operationsWidth: 80,
            operations: {
              title: '操作',
            },
            renderMoveDown: () => null,
            renderMoveUp: () => null,
            renderRemove: (idx: number) => {
              const mutators = ruleActions.current.createMutators(name);
              return (
                <FormSpy selector={[['onFieldValueChange', `userList.${idx}.username`]]}>
                  {({}) => {
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
            <Field type="string" name="name" x-component="Input" title="参数名称" required />
            <Field
              type="string"
              name="identifier"
              x-component="Input"
              title="参数标识符"
              required
            />
            <Field
              type="string"
              name="type"
              x-component="Select"
              title="数据类型"
              enum={_dataTypeList}
            />
            {/* 动态渲染 */}
            <Field type="object" name="dataType" title="数据定义" required>
              <Field
                type="string"
                name="elementType"
                title="元素类型"
                x-props={{
                  placeholder: '请选择元素类型',
                  optionType: 'button',
                  options: yuansuleixingList,
                  visible: false,
                }}
                x-component="Radio"
              />
              <FormMegaLayout
                gutter={10}
                grid
                autoRow
                full
                labelCol={8}
                wrapperCol={24}
                name="shuzhifanweiForbool"
              >
                <Field type="object" name="mapping" required x-props={{ visible: false }}>
                  <FormItemGrid gutter={10} style={{ marginBottom: -25 }}>
                    <Field
                      type="string"
                      name="0"
                      x-component="Input"
                      required
                      x-props={{
                        placeholder: '请输入',
                        addonBefore: '0',
                      }}
                    />
                    <Field
                      type="string"
                      name="1"
                      x-component="Input"
                      required
                      x-props={{
                        placeholder: '请输入',
                        addonBefore: 1,
                      }}
                    />
                  </FormItemGrid>
                </Field>

                {intTypeFormItem}
                <Field
                  type="string"
                  name="max"
                  title="数据定义"
                  x-props={{
                    placeholder: '请输入数据定义',
                    visible: false,
                    addonBefore: '字节',
                  }}
                  x-component="NumberPicker"
                />
                <Field
                  type="array"
                  name="shujudingyiForenum"
                  title=""
                  x-component="ArrayTable"
                  required
                  x-props={{
                    visible: false,
                  }}
                  x-component-props={{
                    operationsWidth: 80,
                    operations: {
                      title: '',
                    },
                    renderMoveDown: () => null,
                    renderMoveUp: () => null,
                    renderRemove: (idx: number) => {
                      const mutators = ruleActions.current.createMutators('shujudingyiForenum');
                      return (
                        <FormSpy selector={[['onFieldValueChange', `userList.${idx}.username`]]}>
                          {({}) => {
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
                <Field
                  type="string"
                  name="timestamp"
                  x-component="Input"
                  x-props={{
                    visible: false,
                  }}
                  x-component-props={{ defaultValue: 'INT类型的UTC时间戳（秒）' }}
                  required
                  default="INT类型的UTC时间戳（秒)"
                  readOnly
                />
              </FormMegaLayout>
            </Field>
          </Field>
        </Field>
      </FormLayout>
    );
  };

  const formItemVisibleConfig = (formItems: string[], flag: boolean) => {
    if (!formItems) {
      return;
    }
    if (formItems.length === 0) {
      return;
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
      title={isEdit ? '编辑自定义规则' : '新建自定义规则'}
      width={1300}
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
        }}
        initialValues={{
          type: 1,
          dataType: 'bool',
          mode: 'rw',
          eventType: 'alert',
          mapping: { '0': '关', '1': '开' },
          numericalRange: { min: '1', max: '100' },
          start: 0,
          step: 1,
          max: '2048',
          specs: [{ type: 'bool', dataType: { mapping: { '0': '关', '1': '开' } } }],
          params: [{ type: 'bool', dataType: { mapping: { '0': '关', '1': '开' } } }],
          input: [{ type: 'bool', dataType: { mapping: { '0': '关', '1': '开' } } }],
          output: [{ type: 'bool', dataType: { mapping: { '0': '关', '1': '开' } } }],
        }}
        onSubmit={onModalFinish}
        effects={() => {
          // 监听 type 表单项显示 功能类型
          onFieldValueChange$('type').subscribe((state) => {
            const value = state.value;
            let allFormItem: string[] = [];

            currentFunctionType.current = value;

            Object.keys(formItemMapping).map((item) => {
              allFormItem = allFormItem.concat(formItemMapping[item]);
            });

            Object.keys(dataTypeMapping).map((item) => {
              allFormItem = allFormItem.concat(dataTypeMapping[item]);
            });

            // 先把所有的 设置为 false
            formItemVisibleConfig(allFormItem, false);

            const showFormItem = formItemMapping[value];
            formItemVisibleConfig(showFormItem, true);
          });

          // 监听 dataType 表单项显示 数据类型
          onFieldValueChange$('dataType').subscribe((state) => {
            const value = state.value;
            if (!value) {
              return;
            }

            let allFormItem: string[] = [];

            Object.keys(dataTypeMapping).map((item) => {
              allFormItem = allFormItem.concat(dataTypeMapping[item]);
            });

            formItemVisibleConfig(allFormItem, false);
            const showFormItem = dataTypeMapping[value];
            formItemVisibleConfig(showFormItem, true);
          });

          // 监听数据类型为数组时，元素类型的变化
          onFieldValueChange$('elementType').subscribe(async (state) => {
            const dataType = await ruleActions.current.getFieldState('dataType');
            if (dataType.value !== 'array') {
              return;
            }
            const value = state.value;
            if (!value) {
              return;
            }

            let allFormItem: string[] = [];

            Object.keys(elementTypeMapping).map((item) => {
              allFormItem = allFormItem.concat(elementTypeMapping[item]);
            });

            // 先把所有的 设置为 false
            formItemVisibleConfig(allFormItem, false);
            const showFormItem = elementTypeMapping[value];
            // 再把对应的表单项展示出来
            formItemVisibleConfig(showFormItem, true);
          });

          const array = ['specs', 'params', 'input', 'output'];

          array.map((scope) => {
            onFieldValueChange$(`${scope}.*.type`).subscribe((fieldState) => {
              const value = fieldState.value;

              if (!value) {
                return;
              }
              const mapper = {
                bool: ['mapping'],
                int: ['numericalRange', 'start', 'step', 'unit'],
                string: ['max'],
                float: ['numericalRange', 'start', 'step', 'unit'],
                enum: ['shujudingyiForenum'],
                timestamp: ['timestamp'],
                array: ['elementType'],
              };

              let allFormItem: string[] = [];

              Object.keys(mapper).map((item) => {
                allFormItem = allFormItem.concat(mapper[item]);
              });

              // 先把所有的 设置为 false
              allFormItem.map((item: string) => {
                ruleActions.current.setFieldState(
                  FormPath.transform(
                    fieldState.name,
                    /\d/,
                    ($1) => `${scope}.${$1}.dataType.${item}`,
                  ),
                  (state) => {
                    state.visible = false;
                  },
                );
              });

              const arr = mapper[value];

              arr.map((item: string) => {
                ruleActions.current.setFieldState(
                  FormPath.transform(
                    fieldState.name,
                    /\d/,
                    ($1) => `${scope}.${$1}.dataType.${item}`,
                  ),
                  (state) => {
                    state.visible = true;
                  },
                );
              });
            });
            onFieldValueChange$(`${scope}.*.dataType.elementType`).subscribe((fieldState) => {
              const value = fieldState.value;

              const mapper = {
                int: ['numericalRange', 'start', 'step', 'unit'],
                string: ['max'],
                float: ['numericalRange', 'start', 'step', 'unit'],
              };

              let allFormItem: string[] = [];

              Object.keys(mapper).map((item) => {
                allFormItem = allFormItem.concat(mapper[item]);
              });

              // 先把所有的 设置为 false
              allFormItem.map((item: string) => {
                ruleActions.current.setFieldState(
                  FormPath.transform(
                    fieldState.name,
                    /\d/,
                    ($1) => `${scope}.${$1}.dataType.${item}`,
                  ),
                  (state) => {
                    state.visible = false;
                  },
                );
              });

              const arr = mapper[value];
              if (!arr) {
                return;
              }

              arr.map((item: string) => {
                ruleActions.current.setFieldState(
                  FormPath.transform(
                    fieldState.name,
                    /\d/,
                    ($1) => `${scope}.${$1}.dataType.${item}`,
                  ),
                  (state) => {
                    state.visible = true;
                  },
                );
              });
            });
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
            extra: '支持中文、英文、数字、下划线的组合，最多不超过20个字符',
          }}
          x-rules={{
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,20}$/,
            message: '请输入中文、英文、数字、下划线的组合，最多不超过20个字符',
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
            extra: '第一个字符不能是数字，支持英文、数字、下划线的组合，最多不超过32个字符',
            disabled: isEdit,
          }}
          x-rules={{
            pattern: /^(?![0-9])[_a-zA-Z0-9_]{1,20}$/,
            message: '请输入第一个字符不能是数字，支持英文、数字、下划线的组合，最多不超过32个字符',
          }}
          x-component="Input"
        />
        <>
          <Field
            type="string"
            name="dataType"
            title="数据类型"
            x-props={{
              placeholder: '请选择数据类型',
              optionType: 'button',
              options: dataTypeList,
            }}
            x-component="Radio"
          />
          {arrayTypeFormItem}
          {rwTypeFormItem}
          {boolTypeFormItem}
          {intTypeFormItem}
          {stringTypeFormItem}
          {enumTypeFormItem}
          {timeTypeFormItem}
          {renderStructFormItem('数据定义', 'specs')}
        </>
        <>
          <Field
            type="string"
            title="事件类型"
            name="eventType"
            x-component="Radio"
            x-props={{
              placeholder: '请选择事件类型',
              optionType: 'button',
              options: eventTypeList,
            }}
          />
          {renderStructFormItem('事件参数', 'params')}
        </>
        {renderStructFormItem('调用参数', 'input')}
        {renderStructFormItem('返回参数', 'output')}
        <Field
          type="string"
          name="desc"
          title="描述"
          x-props={{
            placeholder: '请输入描述',
            extra: '最多不超过80个字符',
            maxLength: 80,
          }}
          x-component="TextArea"
          x-component-props={{
            maxLength: 80,
          }}
        />
      </SchemaForm>
    </Modal>
  );
});
