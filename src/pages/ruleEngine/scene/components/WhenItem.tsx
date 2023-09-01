import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import { postApiV1ThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import { postApiV1ThingsProductSchemaIndex } from '@/services/iThingsapi/wumoxing';
import { isCorn } from '@/utils/utils';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Cascader, Form, Input, message, Select, Space } from 'antd';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

interface OptionType {
  value?: string | null | undefined | number;
  label?: any;
  children?: OptionType[];
  isLeaf?: boolean;
  loading?: boolean;
}

const defaultSeconedOptions: OptionType[] = [
  {
    value: '属性',
    label: '属性',
    isLeaf: false,
  },
];

const columnTypeOptions: OptionType[] = [
  {
    value: 'sysTime',
    label: '系统时间',
  },
  {
    value: 'property',
    label: '属性',
  },
];

const nextConditionOptions: OptionType[] = [
  {
    value: 'and',
    label: '并且',
  },
  {
    value: 'or',
    label: '或者',
  },
];

// eq: 相等  not:不相等  btw:在xx之间  gt: 大于  gte:大于等于 lt:小于  lte:小于等于   in:在xx值之间
const termTypeOptions: OptionType[] = [
  {
    value: 'eq',
    label: '相等',
  },
  {
    value: 'not',
    label: '不相等',
  },
  {
    value: 'gt',
    label: '大于',
  },
  {
    value: 'gte',
    label: '大于等于',
  },
  {
    value: 'lte',
    label: '小于等于',
  },
];

type WhenItemProps = {
  getFormValueFn: (values: any) => void;
  ref?: any;
};

const WhenItem: React.FC<WhenItemProps> = forwardRef((props: WhenItemProps, ref) => {
  const { getFormValueFn } = props;
  const [form] = Form.useForm();
  const currentProductID = useRef<string | null>('');
  const [firstOptions, setFirstOptions] = useState<OptionType[]>([]);
  const [seconedOptions, setSeconedOptions] = useState<OptionType[]>(defaultSeconedOptions);

  // 存储下标与字段类型的关系
  const [indexToFieldTypeMap, setIndexToFieldTypeMap] = useState<boolean[]>([]);

  // 获取产品列表
  useRequest(postApiV1ThingsProductInfoIndex, {
    defaultParams: [
      {
        page: {
          size: 9999999,
          page: 1,
        },
      },
    ],
    onSuccess: (result) => {
      const _productListOption = result.data?.list?.map((item) => ({
        label: item.productName || '',
        value: item.productID || '',
        isLeaf: false,
        children: [],
      }));
      setFirstOptions(_productListOption ?? []);
    },
    onError: (error) => {
      message.error('获取产品错误:' + error.message);
    },
  });

  // 远程加载第一项 加载设备
  const loadFirstOptions = async (selectedOptions: OptionType[]) => {
    // 根据选择的产品ID 获取到设备
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const _productID = targetOption.value ?? '';
    currentProductID.current = _productID as string;
    targetOption.loading = true;

    const res = await postApiV1ThingsDeviceInfoIndex({
      page: {
        size: 9999999,
        page: 1,
      },
      productID: currentProductID.current,
    });
    if (res.data.list) {
      targetOption.loading = false;
      const deviceList = res.data.list.map((item) => ({
        label: item.deviceName,
        value: item.deviceName,
        isLeaf: true,
      }));
      targetOption.children = deviceList;
      setFirstOptions([...firstOptions]);
    }
  };
  // 远程加载第二项 加载属性
  const loadSeconedOptions = async (selectedOptions: OptionType[]) => {
    // 根据选择的产品ID 获取到物模型列表
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (!currentProductID.current) {
      throw new Error('没有选择产品');
    }

    const res = await postApiV1ThingsProductSchemaIndex({
      page: {
        size: 9999999,
        page: 1,
      },
      productID: currentProductID.current,
    });
    if (res.data.list) {
      targetOption.loading = false;
      const deviceList = res.data.list.map((item) => ({
        label: item.name,
        value: item.identifier,
        isLeaf: true,
      }));
      targetOption.children = deviceList;
      setSeconedOptions([...seconedOptions]);
    }
  };

  const convertFormValue = (values: any) => {
    // 如果是 属性
    const when = values.when;
    when.map((item: any) => {
      if (item.columnType === 'property') {
        item.columnSchema = {
          ...item.columnSchema,
          productID: item?.columnSchema?.productIDAnddeviceName?.[0],
          deviceName: item?.columnSchema?.productIDAnddeviceName?.[1],
          dataID: [].concat(item?.columnSchema?.dataID?.[1]),
        };
        delete item.columnTime;
        delete item.columnSchema.productIDAnddeviceName;
      }
    });
    return values;
  };

  const onFinish = (values: any) => {
    // 如果是 属性
    convertFormValue(values);
  };
  // 回显
  useImperativeHandle(ref, () => ({
    setFormValue(values: any) {
      console.log('values', values);

      // 兼容indexToFieldTypeMap
      values.map((item: any, index: any) => {
        if (item.columnType === 'sysTime') {
          indexToFieldTypeMap[index] = true;
        }
      });

      // 兼容数据结构
      values.map((item: any) => {
        if (item.columnType === 'property') {
          // 反向操作，恢复原始数据
          item.columnSchema.productIDAnddeviceName = [
            item.columnSchema.productID,
            item.columnSchema.deviceName,
          ];
          item.columnSchema.dataID = [item.columnSchema.dataID[0]];
          item.columnTime = undefined;

          // 删除新的字段
          delete item.columnSchema.productID;
          delete item.columnSchema.deviceName;
          delete item.columnSchema.dataID;
        }
      });

      setIndexToFieldTypeMap([...indexToFieldTypeMap]);

      form.setFieldValue('when', values);
    },
  }));

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      onFieldsChange={(filed: any) => {
        const formValues = form.getFieldsValue();
        console.log('触发了whenItem', formValues);
        const convertedFormValue = convertFormValue(formValues);
        getFormValueFn(convertedFormValue);

        console.log('?filed', filed);

        // 当监听到 columnType 字段改变的时候 动态改变 setIndexToFieldTypeMap
        if (filed.length === 0) {
          return;
        }
        const index = filed?.[0].name?.[1];
        const type = filed?.[0].name?.[2];
        if (!type) {
          return;
        }

        if (type !== 'columnType') {
          return;
        }
        const value = filed[0].value;
        const isSysTime = value === 'sysTime';
        indexToFieldTypeMap[index] = isSysTime;

        setIndexToFieldTypeMap([...indexToFieldTypeMap]);
      }}
    >
      <Form.List name="when">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item key={key}>
                  <Space.Compact>
                    {/* 选字段类型 */}
                    <Form.Item
                      {...restField}
                      name={[name, 'columnType']}
                      noStyle
                      rules={[{ required: true, message: '字段类型必填' }]}
                      shouldUpdate={true}
                    >
                      <Select defaultValue={'sysTime'} options={columnTypeOptions} />
                    </Form.Item>
                    {/* 如果字段类型是时间 */}

                    {indexToFieldTypeMap[name] ? (
                      <Form.Item
                        {...restField}
                        name={[name, 'columnTime', 'type']}
                        style={{ display: 'none' }}
                      >
                        <Input defaultValue={'cron'} value={'cron'} />
                      </Form.Item>
                    ) : null}

                    {indexToFieldTypeMap[name] ? (
                      <Form.Item
                        {...restField}
                        name={[name, 'columnTime', 'cron']}
                        noStyle
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
                        <Input />
                      </Form.Item>
                    ) : null}

                    {/* 如果字段类型是属性 */}
                    {/* 选择产品和设备 */}
                    {!indexToFieldTypeMap[name] ? (
                      <Form.Item
                        {...restField}
                        name={[name, 'columnSchema', 'productIDAnddeviceName']}
                        noStyle
                        rules={[{ required: true, message: '物模型类型配置' }]}
                      >
                        <Cascader
                          options={firstOptions}
                          loadData={loadFirstOptions}
                          placeholder="请选择物模型类型配置"
                        />
                      </Form.Item>
                    ) : null}
                    {/* 选择属性 */}
                    {!indexToFieldTypeMap[name] ? (
                      <Form.Item
                        {...restField}
                        name={[name, 'columnSchema', 'dataID']}
                        noStyle
                        rules={[{ required: true, message: '属性是必填的' }]}
                      >
                        <Cascader
                          disabled={!currentProductID.current}
                          options={seconedOptions}
                          loadData={loadSeconedOptions}
                          placeholder="请选择属性"
                        />
                      </Form.Item>
                    ) : null}
                    {!indexToFieldTypeMap[name] ? (
                      <Form.Item
                        {...restField}
                        name={[name, 'columnSchema', 'termType']}
                        noStyle
                        rules={[{ required: true, message: '动态条件类型是必填的' }]}
                      >
                        <Select options={termTypeOptions} placeholder="请选择动态条件类型" />
                      </Form.Item>
                    ) : null}

                    {!indexToFieldTypeMap[name] ? (
                      <Form.Item
                        {...restField}
                        name={[name, 'columnSchema', 'values']}
                        noStyle
                        rules={[{ required: true, message: '值是必填的' }]}
                      >
                        {/* <InputNumber/> */}
                        <Input disabled={!currentProductID.current} />
                      </Form.Item>
                    ) : null}
                  </Space.Compact>
                </Form.Item>
                {fields.length - 1 !== name ? (
                  <Form.Item key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'netCondition']}
                      noStyle
                      rules={[{ required: true, message: '和下个条件的关联类型' }]}
                    >
                      <Select defaultValue={'and'} options={nextConditionOptions} />
                    </Form.Item>
                  </Form.Item>
                ) : null}

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  indexToFieldTypeMap.push(true);
                  setIndexToFieldTypeMap([...indexToFieldTypeMap]);
                  add({ columnType: 'sysTime', columnTime: { type: 'cron' }, netCondition: 'and' });
                }}
                block
                icon={<PlusOutlined />}
              >
                新增触发条件
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      {/* <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item> */}
    </Form>
  );
});

export default WhenItem;
