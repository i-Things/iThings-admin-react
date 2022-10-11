import { Field, SchemaForm } from '@formily/antd';
import {
  ArrayTable as FArrayTable,
  Input as FInput,
  NumberPicker as FNumberPicker,
  Select as FSelect,
  Switch as FSwitch,
} from '@formily/antd-components';
import type { ISchemaFormAsyncActions } from '@formily/react-schema-renderer/lib/types';
import { AutoComplete, Input, Modal, Radio } from 'antd';

import { createAsyncFormActions } from '@formily/antd';
import { useRef } from 'react';
type EditFormType = {
  modalVisit: boolean;
  setModalVisit: any;
};

export const EditForm: React.FC<EditFormType> = (props) => {
  const ruleActions = useRef<ISchemaFormAsyncActions>(createAsyncFormActions());
  const ruleModalFormItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const typeBtnList = [
    { label: '属性', value: 'property' },
    { label: '事件', value: 'event' },
    { label: '行为', value: 'action' },
  ];

  const shujuleixingBtnList = [
    { label: '布尔型', value: 'property' },
    { label: '整数型', value: 'event' },
    { label: '字符串', value: 'action' },
    { label: '浮点型', value: 'action' },
    { label: '枚举整型', value: 'action' },
    { label: '枚举字符串', value: 'action' },
    { label: '时间型', value: 'action' },
    { label: '结构体', value: 'action' },
    { label: '数组', value: 'action' },
  ];

  const readWrtieList = [
    { label: '读写', value: 'property' },
    { label: '自读', value: 'event' },
  ];

  const onModalFinish = () => {};

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
          shujudingyi: ({ value, onChange }) => (
            <>
              <Input
                onChange={(v) => onChange({ ...value, name0: v.target.value })}
                min={1}
                value={value ? value.name : undefined}
                style={{ width: 250 }}
                addonBefore={'0'}
              />
              <Input
                onChange={(v) => onChange({ ...value, name1: v.target.value })}
                min={1}
                value={value ? value.name : undefined}
                style={{ width: 250 }}
                addonBefore={'1'}
              />
            </>
          ),
        }}
        initialValues={{}}
        onSubmit={onModalFinish}
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

        <Field
          type="string"
          name="shujuleix"
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
        <Field
          type="array"
          name="shujudingyi"
          title="数据定义"
          required
          x-props={{
            placeholder: '请选择数据定义',
          }}
          x-component="shujudingyi"
        />

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
