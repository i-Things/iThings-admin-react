import useReactive from '@/hooks/useReactive';
import {
  postApiV1ThingsDeviceMsgPropertyLatestIndex,
  postApiV1ThingsDeviceMsgShadowIndex,
} from '@/services/iThingsapi/shebeixiaoxi';
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
import { Button, message, notification, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { ModelType } from 'types/base';

import { postApiV1ThingsDeviceInteractSendProperty } from '@/services/iThingsapi/shebeijiaohu';
import { ResponseCode } from '@/utils/base';
import { dateStrToTimestamp, timestampToDate, timestampToDateStr } from '@/utils/date';
import { SmileOutlined } from '@ant-design/icons';

interface DataType {
  type: ModelType;
  mapping: Record<string, string>;
  step: string;
  min: string;
  max: string;
  start: string;
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

const DevicePropsPage: React.FC<{ productID: string; deviceName: string }> = ({
  productID,
  deviceName,
}) => {
  const formState = useReactive<
    Record<string, string | number | boolean | Record<string, string | number | boolean>>
  >({});

  const [attrList, setAttrList] = useState<AttrTableProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [controlLoading, setControlLoading] = useState(false);
  const [shadowLoading, setShadowLoading] = useState(false);

  const actionRef = useRef<ActionType>();

  const valueType = ['bool', 'int', 'float', 'string', 'timestamp', 'enum'];
  const formInputWidth = 250;

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
  const { run: controlRun } = useRequest(
    (params) =>
      postApiV1ThingsDeviceInteractSendProperty({
        productID,
        deviceName: params?.deviceName,
        data: JSON.stringify(params?.data),
      }),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.code === ResponseCode.SUCCESS) {
          message.success('设置成功');
        }
      },
      onFinally: () => setControlLoading(false),
    },
  );

  // 获取影子列表

  const { run: showRun } = useRequest(
    (params) =>
      postApiV1ThingsDeviceMsgShadowIndex({
        productID,
        deviceName: params?.deviceName,
        dataIDs: params?.dataIDs,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.code === ResponseCode.SUCCESS) {
          if (res?.data?.list?.length)
            notification.open({
              message: '设备影子',
              icon: <SmileOutlined style={{ color: '#108ee9' }} />,
              duration: 3,
              description: (
                <ProDescriptions column={1}>
                  <ProDescriptions.Item label="属性">
                    {res?.data?.list?.[0].dataID}
                  </ProDescriptions.Item>
                  <ProDescriptions.Item label="更新时间">
                    {res?.data?.list?.[0].updatedDeviceTime
                      ? timestampToDate(Number(res?.data?.list?.[0].updatedDeviceTime))
                      : 0}
                  </ProDescriptions.Item>
                  <ProDescriptions.Item label="更新的值">
                    {res?.data?.list?.[0].value}
                  </ProDescriptions.Item>
                </ProDescriptions>
              ),
            });
          else message.info('暂无影子列表');
        } else message.error('获取设备影子失败');
      },
      onFinally: () => setShadowLoading(false),
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
                    (formState[firstItem] as Record<string, boolean>)[par?.identifier] = v ? 1 : 0;
                  } else formState[par?.identifier] = v ? 1 : 0;
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
          width={formInputWidth}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            step:
              (firstItem
                ? Number(par?.dataType?.arrayInfo?.step)
                : Number(par?.affordance?.define?.step)) || 1,
            min:
              (firstItem
                ? Number(par?.dataType?.arrayInfo?.min)
                : Number(par?.affordance?.define?.min)) || 0,
            max:
              (firstItem
                ? Number(par?.dataType?.arrayInfo?.max)
                : Number(par?.affordance?.define?.max)) || 100,
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
          width={formInputWidth}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            stringMode: true,
            step:
              (firstItem
                ? Number(par?.dataType?.arrayInfo?.step)
                : Number(par?.affordance?.define?.step)) || 0.1,
            min:
              (firstItem
                ? Number(par?.dataType?.arrayInfo?.min)
                : Number(par?.affordance?.define?.min)) || 0.0,
            max:
              (firstItem
                ? Number(par?.dataType?.arrayInfo?.max)
                : Number(par?.affordance?.define?.max)) || 100,
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
          width={formInputWidth}
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
              ? String((formState?.[firstItem] as Record<string, number>)?.[par?.identifier] || '')
              : String(formState?.[par?.identifier] || ''),
            onChange: (v) => {
              if (firstItem)
                (formState[firstItem] as Record<string, number>)[par?.identifier] = Number(v);
              else formState[par?.identifier] = Number(v);
            },
          }}
        />
      ),
    ],
    [
      'timestamp',
      (par: AttrTableProps, firstItem?: string) => (
        <ProFormDateTimePicker
          name={par?.identifier}
          width={formInputWidth}
          fieldProps={{
            disabled: par?.affordance?.mode === 'r',
            allowClear: false,
            showToday: true,
            value: firstItem
              ? timestampToDateStr(
                  Number(
                    (formState?.[firstItem] as Record<string, string>)?.[par?.identifier] ||
                      Date.now(),
                  ),
                )
              : timestampToDateStr(Number(formState?.[par?.identifier] || Date.now())),
            onChange: (v, date) => {
              if (firstItem)
                (formState[firstItem] as Record<string, number>)[par?.identifier] =
                  dateStrToTimestamp(date);
              else formState[par?.identifier] = dateStrToTimestamp(date);
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
            <ProDescriptions column={1} bordered className="prop-arr">
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
            <ProDescriptions column={1} bordered className="prop-str">
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
    setControlLoading(true);
    controlRun({
      deviceName,
      data: { [attrRecord?.identifier]: formState?.[attrRecord?.identifier] },
    });
  };

  // 影子列表
  const getShadowList = (attrRecord: AttrTableProps) => {
    setShadowLoading(true);
    showRun({
      deviceName,
      dataIDs: [attrRecord?.identifier],
    });
  };

  const columns: ProColumns<AttrTableProps>[] = [
    {
      title: '属性',
      dataIndex: 'name',
      key: 'name',
      renderText: (val: string) => val || '-',
    },
    {
      title: '标识符',
      dataIndex: 'identifier',
      key: 'identifier',
      renderText: (val: string) => val || '-',
    },
    {
      title: '参数',
      dataIndex: 'affordance',
      render: (_, record) => renderInput(record),
      width: 600,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="link"
            key="control"
            onClick={() => controlDeviceProp(record)}
            loading={controlLoading}
            disabled={record?.affordance?.mode === 'r'}
          >
            控制
          </Button>
          {record?.affordance?.isUseShadow && (
            <Button
              type="link"
              key="shadow"
              onClick={() => getShadowList(record)}
              loading={shadowLoading}
              disabled={record?.affordance?.mode === 'r'}
            >
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
        if (valueType.includes(type)) {
          if (type === 'bool')
            formState[item?.identifier] =
              item?.value || parseInt(item?.affordance?.define?.start) || 0;
          else
            formState[item?.identifier] =
              item?.value || parseInt(item?.affordance?.define?.start) || '';
        }

        if (item?.type === 'struct') {
          formState[item?.identifier] = {};
          item?.affordance?.define?.specs?.forEach((n) => {
            // TODO: 确定struct的value值结构
            if (Object.keys(JSON.parse(item?.value || '{}')).length)
              formState[item?.identifier] = JSON.parse(item?.value || '{}');
            else {
              if (n?.dataType?.type === 'bool')
                formState[item?.identifier][n?.identifier] = parseInt(n?.dataType?.start) || 0;
              else formState[item?.identifier][n?.identifier] = parseInt(n?.dataType?.start) || '';
            }
          });
        }
      });
    }
  }, [attrList.length]);

  return (
    <ProTable<AttrTableProps>
      className="model-prop-table"
      headerTitle="设备属性"
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
  );
};

export default DevicePropsPage;
