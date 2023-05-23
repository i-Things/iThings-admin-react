import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import { postApiV1ThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import { postApiV1ThingsProductSchemaIndex } from '@/services/iThingsapi/wumoxing';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Cascader, Form, Input, Select, Space, message } from 'antd';
import React, { useRef, useState } from 'react';

const { Option } = Select;


const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

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
    isLeaf: false
  }
];

const defaultFirstOptions: OptionType[] = [
  {
    value: 'sysTime',
    label: '系统时间'
  },
  {
    value: 'property',
    label: '设备'
  },
];

const columnTypeOptions: OptionType[] = [
  {
    value: 'sysTime',
    label: '系统时间'
  },
  {
    value: 'property',
    label: '属性'
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
  }
]



const App: React.FC = () => {
  const currentProductID = useRef<number | string>('')
  const [firstOptions, setFirstOptions] = useState<OptionType[]>([])
  const [seconedOptions, setSeconedOptions] = useState<OptionType[]>(defaultSeconedOptions)
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
        children: []
      }))
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
    const _productID = targetOption.value ?? ''
    currentProductID.current = _productID
    targetOption.loading = true

    const res = await postApiV1ThingsDeviceInfoIndex({
      page: {
        size: 9999999,
        page: 1,
      },
      productID: currentProductID.current,
    })
    if (res.data.list) {
      targetOption.loading = false
      const deviceList = res.data.list.map((item) => ({
        label: item.deviceName,
        value: item.deviceName,
        isLeaf: true
      }))
      targetOption.children = deviceList
      setFirstOptions([...firstOptions]);
    }
  }

  // 远程加载第二项 加载属性
  const loadSeconedOptions = async (selectedOptions: OptionType[]) => {
    console.log('selectedOptions', selectedOptions);

    // 根据选择的产品ID 获取到物模型列表
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true
    if (!currentProductID.current) {
      throw new Error('没有选择产品')
    }

    const res = await postApiV1ThingsProductSchemaIndex({
      page: {
        size: 9999999,
        page: 1,
      },
      productID: currentProductID.current,
    })
    if (res.data.list) {
      targetOption.loading = false
      const deviceList = res.data.list.map((item) => ({
        label: item.name,
        value: item.identifier,
        isLeaf: true
      }))
      targetOption.children = deviceList
      setSeconedOptions([...seconedOptions]);
    }
  }
  return <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    autoComplete="off"
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
                    name={[name, 'term', 'columnType']}
                    noStyle
                    rules={[{ required: true, message: '字段类型必填' }]}
                  >
                    <Select defaultValue={'sysTime'} options={columnTypeOptions} />
                  </Form.Item>
                  {/* 如果字段类型是时间 */}
                  <Form.Item
                    {...restField}
                    name={[name, 'term', 'cc']}
                    noStyle
                    rules={[{ required: true, message: 'Missing last name' }]}
                    shouldUpdate={(prevValue, currentValues) => prevValue.when?.[name]?.term?.columnType !== currentValues.when?.[name]?.term?.columnType}
                  >
                    {({ getFieldValue }) => {
                      const firstFieldValue = getFieldValue(['when', name, 'term', 'columnType']);
                      console.log('firstFieldValue', firstFieldValue)
                      return firstFieldValue === 'sysTime' ? <Input placeholder="Second Field" /> : <Input placeholder="Second Field11" />;
                    }}
                  </Form.Item>
                 

                  {/* 如果字段类型是属性 */}

                  {/* 选择产品和设备 */}
                  <Form.Item
                    {...restField}
                    name={[name, 'term', 'columnSchema']}
                    noStyle
                    rules={[{ required: true, message: '物模型类型配置' }]}
                  >
                    <Cascader options={firstOptions} loadData={loadFirstOptions} placeholder="请选择物模型类型配置" />
                  </Form.Item>
                  {/* 选择属性 */}
                  <Form.Item
                    {...restField}
                    name={[name, 'term', 'dataID']}
                    noStyle
                    rules={[{ required: true, message: '属性是必填的' }]}
                  >
                    <Cascader disabled={!currentProductID.current} options={seconedOptions} loadData={loadSeconedOptions} placeholder="请选择属性" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'term', 'termType']}
                    noStyle
                    rules={[{ required: true, message: '动态条件类型是必填的' }]}
                  >
                    <Select disabled={!currentProductID.current} options={termTypeOptions} placeholder="请选择动态条件类型" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'term', 'values']}
                    noStyle
                    rules={[{ required: true, message: '值是必填的' }]}
                  >
                    {/* <InputNumber/> */}
                    <Input disabled={!currentProductID.current} />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
};

export default App;