import useReactive from '@/hooks/useReactive';
import { postApiV1ThingsDeviceMsgPropertyLatestIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { postApiV1ThingsProductSchemaIndex } from '@/services/iThingsapi/wumoxing';
import { MODEL_VALUE_TYPE_ENUMS } from '@/utils/const';
import {
  ProDescriptions,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSegmented,
  ProFormSwitch,
  ProFormText,
  type ProColumns,
} from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { useRequest } from 'ahooks';
import { Button, Card, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { ModelType } from 'types/base';

import { postApiV1ThingsDeviceInteractSendProperty } from '@/services/iThingsapi/shebeijiaohu';
import { dateStrToTimestamp, timestampToDateStr } from '@/utils/date';
import '../../index.less';

interface DataType {
  type: ModelType;
  mapping: Record<string, string>;
  step: string;
  min: string;
  max: string;
  specs: AttrTableProps[];
  arrayInfo: {
    type: 'int' | 'string' | 'float';
    step: string;
    min: string;
    max: string;
  };
}

interface AffordanceType {
  define: DataType;
  mode: 'rw' | 'r';
  specs: AttrTableProps[];
  isUseShadow: boolean;
}

interface AttrTableProps extends Record<string, unknown> {
  dataID: string;
  name: string;
  timestamp: string;
  type: ModelType;
  affordance: AffordanceType;
  value: string;
  identifier: string;
  params?: React.ReactNode;
  dataType: DataType;
}

const DeviceStatusPage: React.FC<{ productID: string; deviceName: string }> = ({
  productID,
  deviceName,
}) => {
  const formState = useReactive<
    Record<string, string | number | boolean | Record<string, string | number | boolean>>
  >({});

  console.log(formState);

  const [attrList, setAttrList] = useState<AttrTableProps[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('attrList', attrList);

  const actionRef = useRef<ActionType>();

  const valueType = ['bool', 'int', 'float', 'string', 'timestamp', 'enum'];

  // 获取物模型日志 - 属性
  const { data: attrData } = useRequest(async () => {
    const res = await postApiV1ThingsDeviceMsgPropertyLatestIndex({
      productID,
      deviceName,
      dataIDs: [],
    });
    return res.data;
  });

  // 获取物模型列表
  const { data: modelList } = useRequest(async () => {
    const res = await postApiV1ThingsProductSchemaIndex({
      productID,
      type: 1,
    });
    return res.data;
  });

  // 调用设备属性
  const { run } = useRequest(
    (params) =>
      postApiV1ThingsDeviceInteractSendProperty({
        productID,
        deviceName: params?.deviceName,
        data: JSON.stringify(params?.data),
      }),
    {
      manual: true,
    },
  );

  // 值类型
  const renderInputValueTypeMap = new Map([
    [
      'bool',
      (par: AttrTableProps, firstItem?: string) => {
        return (
          <Space className="switch-margin">
            <span style={{ color: formState[par?.identifier] ? 'black' : '#1677ff' }}>
              {par?.affordance?.define?.mapping?.['0'] || par?.dataType?.mapping?.['0'] || '关'}
            </span>
            <ProFormSwitch
              name={par?.identifier}
              fieldProps={{
                disabled: par?.affordance?.mode === 'r',
                value: firstItem
                  ? (formState?.[firstItem] as Record<string, boolean>)?.[par?.identifier]
                  : formState?.[par?.identifier] || '',
                onChange: (v) => {
                  if (firstItem) {
                    (formState[firstItem] as Record<string, boolean>)[par?.identifier] = v!;
                  } else formState[par?.identifier] = v!;
                },
              }}
            />
            <span style={{ color: formState[par?.identifier] ? '#1677ff' : 'black' }}>
              {par?.affordance?.define?.mapping?.['1'] || par?.dataType?.mapping?.['1'] || '开'}
            </span>
          </Space>
        );
      },
    ],
    [
      'int',
      (par: AttrTableProps, firstItem?: string) => (
        <ProFormDigit
          name={par?.identifier}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            value: firstItem
              ? (formState?.[firstItem] as Record<string, number>)?.[par?.identifier]
              : formState?.[par?.identifier] || '',
            onChange: (v) => {
              if (firstItem) (formState[firstItem] as Record<string, number>)[par?.identifier] = v!;
              else formState[par?.identifier] = v!;
            },
          }}
        />
      ),
    ],
    [
      'float',
      (par: AttrTableProps, firstItem?: string) => (
        <ProFormDigit
          name={par?.identifier}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            stringMode: true,
            step: firstItem
              ? Number(par?.dataType?.arrayInfo?.step)
              : Number(par?.affordance?.define?.step) || 0.0,
            min: firstItem
              ? Number(par?.dataType?.arrayInfo?.min)
              : Number(par?.affordance?.define?.min) || 0,
            max: firstItem
              ? Number(par?.dataType?.arrayInfo?.max)
              : Number(par?.affordance?.define?.max) || 100,
            value: firstItem
              ? (formState?.[firstItem] as Record<string, string>)?.[par?.identifier]
              : formState[par?.identifier] || '',
            onChange: (v) => {
              if (firstItem) (formState[firstItem] as Record<string, number>)[par?.identifier] = v!;
              else formState[par?.identifier] = v!;
            },
          }}
        />
      ),
    ],
    [
      'string',
      (par: AttrTableProps, firstItem?: string) => (
        <ProFormText
          name={par?.identifier}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            value: firstItem
              ? (formState?.[firstItem] as Record<string, string>)?.[par?.identifier]
              : formState[par?.identifier] || '',
            onChange: (v) => {
              if (firstItem)
                (formState[firstItem] as Record<string, string>)[par?.identifier] = v.target.value!;
              else formState[par?.identifier] = v.target.value!;
            },
          }}
        />
      ),
    ],
    [
      'enum',
      (par: AttrTableProps, firstItem?: string) => (
        <ProFormSegmented
          name={par?.identifier}
          valueEnum={par?.affordance?.define?.mapping || {}}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            value: firstItem
              ? (formState?.[firstItem] as Record<string, string>)?.[par?.identifier]
              : formState?.[par?.identifier] || '',
            onChange: (v) => {
              if (firstItem)
                (formState[firstItem] as Record<string, string>)[par?.identifier] = v as string;
              else formState[par?.identifier] = v as string;
            },
          }}
        />
      ),
    ],
    [
      'timestamp',
      (par: AttrTableProps, firstItem?: string) => (
        <ProFormDateTimePicker
          name={par?.name}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            allowClear: false,
            showToday: true,
            value: firstItem
              ? timestampToDateStr(
                  Number((formState?.[firstItem] as Record<string, string>)?.[par?.name] || ''),
                )
              : timestampToDateStr(Number(formState?.[par?.name] || '')),
            onChange: (v, date) => {
              if (firstItem)
                (formState[firstItem] as Record<string, string>)[par?.name] =
                  dateStrToTimestamp(date).toString();
              else formState[par?.name] = dateStrToTimestamp(date).toString();
            },
          }}
        />
      ),
    ],
  ]);
  // array
  const renderInputArrayTypeMap = new Map([
    [
      'array',
      (par: AttrTableProps, firstItem: string) => {
        return (
          <>
            <ProDescriptions column={1} bordered>
              <ProDescriptions.Item
                label={MODEL_VALUE_TYPE_ENUMS?.[par?.dataType?.arrayInfo?.type]}
                key={par?.identifier}
              >
                {renderInputValueTypeMap.get(par.dataType?.arrayInfo?.type)?.(par, firstItem)}
              </ProDescriptions.Item>
            </ProDescriptions>
          </>
        );
      },
    ],
  ]);
  // struct
  const renderInputStructTypeMap = new Map([
    [
      'struct',
      (par: AttrTableProps) => {
        return (
          <>
            <ProDescriptions column={1} bordered>
              {par.affordance?.define?.specs?.map((item) => (
                <ProDescriptions.Item label={item?.identifier} key={item?.identifier}>
                  {/* {MODE_ENUM[par.affordance?.mode] === 'r' ? '只读' : '读写'} */}
                  {valueType.includes(item.dataType?.type) &&
                    renderInputValueTypeMap.get(item.dataType?.type)?.(item, par?.identifier)}
                  {item.dataType?.type === 'array' &&
                    renderInputArrayTypeMap.get('array')?.(item, par?.identifier)}
                </ProDescriptions.Item>
              ))}
            </ProDescriptions>
          </>
        );
      },
    ],
  ]);

  const renderInput = (attrRecord: AttrTableProps) => {
    const type = attrRecord?.affordance?.define?.type || 'string';
    if (valueType.includes(type)) return renderInputValueTypeMap.get(type)?.(attrRecord);
    if (type === 'struct') return renderInputStructTypeMap.get(type)?.(attrRecord);
    return;
  };

  const controlDeviceProp = (attrRecord: AttrTableProps) => {
    // TODO: 发出去的值是什么类型
    run({
      deviceName: attrRecord?.name,
      data: { [attrRecord?.identifier]: formState?.[attrRecord?.identifier] },
    });
  };

  const columns: ProColumns<AttrTableProps>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '属性',
      dataIndex: 'name',
      key: 'name',
      renderText: (val: string) => val || '-',
    },
    {
      title: '参数',
      dataIndex: 'affordance',
      render: (_, record) => renderInput(record),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button type="link" key="control" onClick={() => controlDeviceProp(record)}>
            控制
          </Button>
          {record?.affordance?.isUseShadow && (
            <Button type="link" key="shadow">
              影子
            </Button>
          )}
        </>
      ),
    },
  ];

  // 匹配物模型名称
  useEffect(() => {
    setLoading(true);
    if (modelList && attrData) {
      const arr: AttrTableProps[] = [];
      modelList?.list?.forEach((item) => {
        attrData.list?.some((list) => {
          if (list?.dataID === item?.identifier) {
            arr.push({
              ...list,
              name: item?.name,
              identifier: item?.identifier,
              type: JSON.parse(item.affordance)?.define?.type,
              affordance: JSON.parse(item?.affordance),
            });
          }
          return list.dataID === item.identifier;
        });
      });
      setLoading(false);
      setAttrList(arr);
    }
  }, [attrData, modelList]);

  // 表单初始值
  useEffect(() => {
    if (attrList.length) {
      attrList?.forEach((item) => {
        const type = item?.affordance?.define?.type;
        if (valueType.includes(type)) formState[item?.identifier] = item?.value || '';
        if (item?.type === 'struct') {
          formState[item?.identifier] = {};
          item?.affordance?.define?.specs?.forEach((spec) => {
            // TODO: 确定struct的value值结构
            (formState[item?.identifier] as Record<string, string>)[spec?.identifier] =
              !Object.keys(JSON.parse(item?.value)).length ? '' : item?.value;
          });
        }
      });
    }
  }, [attrList.length]);

  return (
    <Card>
      <ProTable<AttrTableProps>
        className="model-prop-table"
        headerTitle={false}
        search={false}
        actionRef={actionRef}
        rowKey="dataID"
        options={false}
        bordered
        dataSource={attrList}
        pagination={false}
        loading={loading}
        columns={columns}
        size={'middle'}
      />
    </Card>
  );
};

export default DeviceStatusPage;
