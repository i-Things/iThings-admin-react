import {
  createAsyncFormActions,
  Field,
  FormEffectHooks,
  FormMegaLayout,
  FormPath,
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
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import type { EditFormType } from './const';

import {
  postApiV1ThingsProductSchemaCreate,
  postApiV1ThingsProductSchemaUpdate,
} from '@/services/iThingsapi/wumoxing';
import { useCreation } from 'ahooks';
import styles from '../style.less';
import {
  dataTypeMapping,
  dataTypeOptionsList,
  elementTypeMapping,
  eventTypeList,
  formItemMapping,
  initialValues,
  rwTypeList,
  shadowType,
  typeOptionsList,
  yuansuleixingList,
  _dataTypeList,
  _yuansuleixingList,
} from './const';

const { onFieldValueChange$ } = FormEffectHooks;

export const EditForm: React.FC<EditFormType> = forwardRef(({ ...props }, ref) => {
  // 暴露出去的方法
  useImperativeHandle(ref, () => ({
    setModelModalValue: setModelModalValue,
    clearModal: clearModal,
    createModel: createModel,
  }));

  const ruleActions = useCreation<ISchemaFormAsyncActions>(() => createAsyncFormActions(), []);

  const [isEdit, setIsEdit] = useState(false);
  const [loading] = useState(false);

  const urlParams = useParams() as { id: string };
  const productID = urlParams.id ?? '';

  const ruleModalFormItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  // TODO: 提交函数
  const onModalFinish = async (values: any) => {
    const {
      type,
      identifier,
      name,
      desc,
      mode,
      isUseShadow,
      numericalRange,
      start,
      step,
      unit,
      min,
      max,
      dataDefinitionForEnum: dataDefinitionForEnum,
      mapping,
      specs = [],
      input = [],
      output = [],
      params = [],
      dataType,
      eventType,
      elementType,
    } = values;

    let arrayInfo = {};
    //
    specs?.map((item: any) => {
      // 去掉undefined
      for (const key in item) {
        if (item[key] === undefined || item[key] === 'undefined') {
          item[key] = '';
        }
      }
      for (const key in item?.dataType) {
        if (item?.dataType[key] === undefined || item[key] === 'undefined') {
          item.dataType[key] = '';
        }
      }

      item.dataType.type = item.type;
      if (item?.dataType?.numericalRange) {
        item.dataType.max = String(item.dataType.numericalRange.max ?? '');
        item.dataType.min = String(item.dataType.numericalRange.min ?? '');
        item.dataType.start = String(item.dataType.start ?? '');
        item.dataType.step = String(item.dataType.step ?? '');
        item.dataType.unit = String(item.dataType.unit ?? '');
      }

      item.dataType.max = String(item.dataType.max ?? '');
      item.dataType.min = String(item.dataType.min ?? '');
      if (item.dataType.type !== 'timestamp')
        item.dataType.timestamp = String(item.dataType.timestamp ?? '');

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((en) => {
          const key = en.label;
          const value = en.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }

      if (item.dataType.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: String(item.dataType.max ?? ''),
        };
      }
    });

    input?.map((item: any) => {
      // 去掉undefined
      for (const key in item.dataType) {
        if (item?.dataType[key] === undefined || item?.dataType[key] === 'undefined') {
          item.dataType[key] = '';
        }
      }
      for (const key in item?.define) {
        if (item?.define[key] === undefined || item?.define[key] === 'undefined') {
          item.define[key] = '';
        }
      }
      item.dataType.type = item.type;
      if (item?.dataType?.numericalRange) {
        item.dataType.max = String(item.dataType.numericalRange.max ?? '');
        item.dataType.min = String(item.dataType.numericalRange.min ?? '');
        item.dataType.start = String(item.dataType.start ?? '');
        item.dataType.step = String(item.dataType.step ?? '');
        item.dataType.unit = String(item.dataType.unit ?? '');
      }

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((en) => {
          const key = en.label;
          const value = en.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }
      if (item.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: String(item.dataType.max ?? ''),
        };
      }
      item.define = {
        ...item.dataType,
        type: item.type,
      };
    });

    output?.map((item: any) => {
      // 去掉undefined
      for (const key in item.dataType) {
        if (item.dataType[key] === undefined || item?.dataType[key] === 'undefined') {
          item.dataType[key] = '';
        }
      }
      for (const key in item?.define) {
        if (item?.define[key] === undefined || item?.define[key] === 'undefined') {
          item.define[key] = '';
        }
      }
      item.dataType.type = item.type;
      if (item?.dataType?.numericalRange) {
        item.dataType.max = String(item.dataType.numericalRange.max ?? '');
        item.dataType.min = String(item.dataType.numericalRange.min ?? '');
        item.dataType.start = String(item.dataType.start ?? '');
        item.dataType.step = String(item.dataType.step ?? '');
        item.dataType.unit = String(item.dataType.unit ?? '');
      }

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((en) => {
          const key = en.label;
          const value = en.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }
      if (item.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: String(item.dataType.max ?? ''),
        };
      }
      item.define = {
        ...item.dataType,
        type: item.type,
      };
    });

    params?.map((item: any) => {
      // 去掉undefined
      for (const key in item.dataType) {
        if (item.dataType[key] === undefined || item?.dataType[key] === 'undefined') {
          item.dataType[key] = '';
        }
      }
      for (const key in item?.define) {
        if (item?.define[key] === undefined || item?.define[key] === 'undefined') {
          item.define[key] = '';
        }
      }

      if (item?.dataType?.numericalRange) {
        item.dataType.max = String(item.dataType.numericalRange.max ?? '');
        item.dataType.min = String(item.dataType.numericalRange.min ?? '');
        item.dataType.start = String(item.dataType.start ?? '');
        item.dataType.step = String(item.dataType.step ?? '');
        item.dataType.unit = String(item.dataType.unit ?? '');
      }

      if (item?.dataType?.shujudingyiForenum) {
        const _mapping = {};
        item?.dataType?.shujudingyiForenum?.map((en) => {
          const key = en.label;
          const value = en.value;
          _mapping[key] = value;
        });
        item.dataType.mapping = _mapping;
      }

      if (item.type === 'array') {
        item.dataType.arrayInfo = {
          ...item.dataType,
          type: item.dataType.elementType,
          max: String(item.dataType.max ?? ''),
        };
      }

      item.define = {
        ...item.dataType,
        type: item.type,
        max: (item.dataType.max ?? '') + '',
      };
    });

    const _max = String(numericalRange?.max ?? max ?? '');
    const _min = String(numericalRange?.min ?? min ?? '');

    let defineType;

    if (dataType === 'array') {
      defineType = 'array';
      arrayInfo = {
        type: elementType,
        numericalRange: { min: _min, max: _max },
        max: String(_max ?? ''),
        min: String(_min ?? ''),
        start: String(start ?? ''),
        step: String(step ?? ''),
        unit: String(unit ?? '') /*  */,
        specs: specs,
      };
    }

    if (values?.dataType && values?.dataType != 'array') defineType = values?.dataType;
    if (!values?.dataType) defineType = eventType;

    const _mapping = {};
    dataDefinitionForEnum?.map((item: any) => {
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
        elementType: elementType ?? '',
        dataDefinitionForEnum: dataDefinitionForEnum,
        type: defineType,
        numericalRange: { min: _min, max: _max },
        mapping: __mapping,
        max: String(_max ?? ''),
        min: String(numericalRange?.min ?? ''),
        start: String(start ?? ''),
        step: String(step ?? ''),
        unit: String(unit ?? ''),
      },
      isUseShadow,
      params,
      input,
      output,
      type: eventType,
      mode,
    };

    // 过滤掉 undefined 字段
    for (const key in affordance) {
      if (affordance[key] === undefined || affordance[key] === 'undefined') {
        affordance[key] = '';
      }
    }
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

    await ruleActions.reset({
      validate: false,
    });
    props?.actionRef?.current?.reload();
    props.setModalVisit(false);
  };

  async function clearModal() {
    await ruleActions.reset({
      validate: false,
    });
    props?.actionRef?.current?.reload();
  }

  async function createModel() {
    await ruleActions.reset({
      validate: false,
    });
    setIsEdit(false);
    props.setModalVisit(true);
  }

  async function setModelModalValue(record: any, _isEdit: boolean) {
    setIsEdit(_isEdit);
    const { type, identifier, name, desc, affordance } = record;

    ruleActions.setFieldValue('name', name);
    ruleActions.setFieldValue('identifier', identifier);
    ruleActions.setFieldValue('type', type);
    ruleActions.setFieldValue('desc', desc);

    const _affordance = JSON.parse(affordance);
    const { params, input, output } = _affordance;
    const defineType = _affordance.define.type || {};
    const specs = _affordance.define.specs || {};
    const arrayInfo = _affordance.define.arrayInfo || {};
    const mode = _affordance?.mode;
    specs?.map((item) => {
      item.type = item.dataType.type;
      const numericalRange = {
        max: String(item.dataType.max ?? ''),
        min: String(item.dataType.min ?? ''),
      };
      item.dataType.numericalRange = numericalRange;
    });

    // const params = _affordance?.params;
    // const input = _affordance?.input;
    // const output = _affordance?.output;
    let isUseShadow = _affordance?.isUseShadow;
    if (isUseShadow == undefined) {
      isUseShadow = false;
    }
    const dataType = _affordance?.define?.type;
    const mapping = _affordance?.define?.mapping;
    const max = String(_affordance?.define?.max ?? '');
    const min = String(_affordance?.define?.min ?? '');
    const start = String(_affordance?.define?.start ?? '');
    const step = String(_affordance?.define?.step ?? '');
    const unit = _affordance?.define?.unit;
    let dataDefinitionForEnum;
    if (mapping && Object.keys(mapping).length)
      dataDefinitionForEnum = Object.keys(mapping).map((label) => ({
        label,
        value: mapping[label],
      }));

    if (defineType === 'struct' || defineType === 'array') {
      specs.map((s: any, i: number) => {
        if (s.dataType.type === 'array') {
          s.dataType.elementType = s.dataType.arrayInfo.type;
        }
        if (s.dataType.type === 'enum') {
          if (s.dataType.mapping) {
            const enumValue = Object.keys(s.dataType.mapping).map((m) => ({
              label: m,
              value: s.dataType.mapping[m],
            }));

            ruleActions.setFieldValue(`specs.${i}.dataType.shujudingyiForenum`, enumValue);
          }
        }
      });
    }
    if (params)
      params.map((p, i) => {
        p.type = p.define.type;
        if (p.define) {
          p.dataType = p.define;
        }
        if (p.type === 'array') {
          p.dataType = p.define.arrayInfo;
          p.dataType.elementType = p.define.arrayInfo.type;
        }
        if (p.type === 'enum') {
          if (p.define.mapping) {
            const enumValue = Object.keys(p.define.mapping).map((m) => ({
              label: m,
              value: p.define.mapping[m],
            }));
            ruleActions.setFieldValue(`params.${i}.dataType.shujudingyiForenum`, enumValue);
          }
        }
        p.dataType.numericalRange = { min: p.define.min ?? '', max: p.define.max ?? '' };
      });

    if (input)
      input.map((p, i) => {
        p.type = p.define.type;
        if (p.define) {
          p.dataType = p.define;
        }
        if (p.type === 'array') {
          p.dataType = p.define.arrayInfo;
          p.dataType.elementType = p.define.arrayInfo.type;
        }
        if (p.type === 'enum') {
          if (p.define.mapping) {
            const enumValue = Object.keys(p.define.mapping).map((m) => ({
              label: m,
              value: p.define.mapping[m],
            }));
            ruleActions.setFieldValue(`input.${i}.dataType.shujudingyiForenum`, enumValue);
          }
        }
        p.dataType.numericalRange = { min: p.define.min ?? '', max: p.define.max ?? '' };
      });

    if (output)
      output.map((p, i) => {
        p.type = p.define.type;
        if (p.define) {
          p.dataType = p.define;
        }
        if (p.type === 'array') {
          p.dataType = p.define.arrayInfo;
          p.dataType.elementType = p.define.arrayInfo.type;
        }
        if (p.type === 'enum') {
          if (p.define.mapping) {
            const enumValue = Object.keys(p.define.mapping).map((m) => ({
              label: m,
              value: p.define.mapping[m],
            }));
            ruleActions.setFieldValue(`output.${i}.dataType.shujudingyiForenum`, enumValue);
          }
        }
        p.dataType.numericalRange = { min: p.define.min ?? '', max: p.define.max ?? '' };
      });

    let elementType;
    if (arrayInfo && Object.keys(arrayInfo).length) {
      if (arrayInfo.type) elementType = arrayInfo.type;
      else elementType = 'int';
    }

    ruleActions.setFieldValue('mode', mode);

    ruleActions.setFieldValue('mapping', mapping);
    ruleActions.setFieldValue('max', max);
    ruleActions.setFieldValue('min', min);
    ruleActions.setFieldValue('start', start);
    ruleActions.setFieldValue('step', step);
    ruleActions.setFieldValue('unit', unit);
    ruleActions.setFieldValue('dataDefinitionForEnum', dataDefinitionForEnum);
    ruleActions.setFieldValue('numericalRange.min', min);
    ruleActions.setFieldValue('numericalRange.max', max);
    ruleActions.setFieldValue('isUseShadow', isUseShadow);

    ruleActions.setFieldValue('dataType', dataType);
    ruleActions.setFieldValue('elementType', elementType);
    ruleActions.setFieldValue('params', params);
    ruleActions.setFieldValue('specs', specs);
    ruleActions.setFieldValue('input', input);
    ruleActions.setFieldValue('output', output);
    ruleActions.setFieldValue('eventType', _affordance?.type ?? initialValues.eventType);

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
          className={styles['form-mega-layout-no-margin']}
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
        type="string"
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
        type="string"
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
          name="dataDefinitionForEnum"
          title="数据定义"
          x-component="ArrayTable"
          x-props={{ visible: false }}
          default={[{ label: 0, value: '' }]}
          x-component-props={{
            operationsWidth: 80,
            operations: {
              title: '',
            },
            renderMoveDown: () => null,
            renderMoveUp: () => null,
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
          }}
        >
          <Field type="object">
            <Field
              type="string"
              name="name"
              x-component="Input"
              title="参数名称"
              required
              default={''}
            />
            <Field
              type="string"
              name="identifier"
              x-component="Input"
              title="参数标识符"
              required
              default={''}
            />
            <Field
              type="string"
              name="type"
              x-component="Select"
              title="数据类型"
              enum={_dataTypeList}
              default={'bool'}
            />
            {/* 动态渲染 */}
            <Field type="object" name="dataType" title="数据定义" required>
              <Field
                type="string"
                name="elementType"
                title="元素类型"
                default={'int'}
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
                <Field
                  type="object"
                  name="mapping"
                  required
                  x-props={{ visible: false }}
                  default={{ '0': '关', '1': '开' }}
                >
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
                  default={[{ label: 0, value: '' }]}
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
    if (!formItems || formItems?.length === 0) {
      return;
    }
    formItems?.map((item: string) => {
      ruleActions.setFieldState(item, (sta) => {
        sta.visible = flag;
      });
    });
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      open={props.modalVisit}
      okButtonProps={{
        loading: loading,
      }}
      onOk={() => {
        ruleActions.submit();
      }}
      onCancel={() => {
        clearModal();
        props.setModalVisit(false);
      }}
      title={isEdit ? '编辑自定义规则' : '新建自定义规则'}
      width={1300}
      maskClosable={false}
    >
      <SchemaForm
        {...ruleModalFormItemLayout}
        actions={ruleActions}
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
        initialValues={initialValues}
        onSubmit={onModalFinish}
        effects={async () => {
          // 扁平化对象数据
          function flattenObjectValues(obj: Record<string, any[]>): string[] {
            return Object.values(obj).flat();
          }

          // 订阅表单字段改变
          function subscribeToFieldChanges(
            allFormItems: string[],
            mapping: Record<string, string[]>,
            scopedFieldName: string,
          ) {
            onFieldValueChange$(scopedFieldName).subscribe(async (state) => {
              if (scopedFieldName === 'elementType') {
                const dataType = await ruleActions.getFieldState('dataType');

                if (dataType.value !== 'array') {
                  return;
                }
              }
              const fieldType = state.value;

              if (!fieldType || !(fieldType in mapping)) {
                return;
              }

              // 隐藏所有表单项
              formItemVisibleConfig(allFormItems, false);

              //展示匹配到的表单项
              let formItemsToShow = mapping[fieldType];

              if (scopedFieldName === 'dataType') {
                const elementType = await ruleActions.getFieldState('elementType');
                const dataType = await ruleActions.getFieldState('dataType');
                if (elementType?.value === 'int' && dataType?.value === 'array') {
                  formItemsToShow = formItemsToShow.filter((item) => item !== 'max');
                }
              }

              formItemVisibleConfig(formItemsToShow, true);
            });
          }

          // 需要订阅的表单字段
          const fieldsToSubscribe = ['type', 'dataType', 'elementType'];

          // 需要订阅的表单字段以及所对应的项
          const fieldMappings: Record<string, Record<string, string[]>> = {
            type: Object.assign({ ...formItemMapping, ...dataTypeMapping }),
            dataType: dataTypeMapping,
            elementType: elementTypeMapping,
          };

          // 为每一个字段绑定订阅函数
          fieldsToSubscribe.forEach((field) => {
            const allFormItems = flattenObjectValues(fieldMappings[field]);
            subscribeToFieldChanges(allFormItems, fieldMappings[field], field);
          });

          // 定义函数用于管理表单项的可见性
          function manageFormItemVisibility(
            scope: string,
            formName: string,
            mapper: Record<string, string[]>,
          ) {
            onFieldValueChange$(`${scope}.${formName}`).subscribe(async (fieldState) => {
              const value = fieldState.value;

              if (!value) {
                return;
              }

              let allFormItem: string[] = [];
              Object.keys(mapper)?.map((item) => {
                allFormItem = allFormItem.concat(mapper[item]);
              });

              const type = await ruleActions.getFieldState(fieldState.name);
              const elementType = await ruleActions.getFieldState('elementType');
              if (type?.props?.enum && elementType.value === 'struct') {
                const filterEnum = type.props.enum.filter((en) => en.value !== 'array');
                type.props.enum = filterEnum;
              }

              // 先把所有的设置为false
              allFormItem?.map(async (item: string) => {
                ruleActions.setFieldState(
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

              arr?.map((item: string) => {
                ruleActions.setFieldState(
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
          }

          // 定义对应的mapper
          const typeMapper = {
            bool: ['mapping'],
            int: ['numericalRange', 'start', 'step', 'unit'],
            string: ['max'],
            float: ['numericalRange', 'start', 'step', 'unit'],
            enum: ['shujudingyiForenum'],
            timestamp: ['timestamp'],
            array: ['elementType'],
          };

          const elementTypeMapper = {
            int: ['numericalRange', 'start', 'step', 'unit'],
            string: ['max'],
            float: ['numericalRange', 'start', 'step', 'unit'],
          };

          const array = ['specs', 'params', 'input', 'output'];
          array?.map((scope) => {
            // 调用函数
            manageFormItemVisibility(scope, '*.type', typeMapper);
            manageFormItemVisibility(scope, '*.dataType.elementType', elementTypeMapper);
          });
        }}
      >
        <Field
          type="string"
          title="功能类型"
          required
          name="type"
          x-component="Radio"
          x-props={{
            placeholder: '请选择功能类型',
            optionType: 'button',
            options: typeOptionsList,
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
        <Field
          type="boolean"
          title="设备影子"
          name="isUseShadow"
          x-component="Radio"
          x-props={{
            placeholder: '是否启用设备影子',
            optionType: 'button',
            options: shadowType,
          }}
        />
        <>
          {/* 数据类型选项框 */}
          <Field
            type="string"
            name="dataType"
            default={'bool'}
            title="数据类型"
            x-props={{
              placeholder: '请选择数据类型',
              optionType: 'button',
              options: dataTypeOptionsList,
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
