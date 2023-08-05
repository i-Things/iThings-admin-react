import useReactive from '@/hooks/useReactive';
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

import { postApiV1ThingsDeviceInteractSendAction } from '@/services/iThingsapi/shebeijiaohu';
import { ResponseCode } from '@/utils/base';
import { dateStrToTimestamp, timestampToDateStr } from '@/utils/date';
import { SmileOutlined } from '@ant-design/icons';

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
  input: AffordanceType[];
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

const DeviceActPage: React.FC<{ productID: string; deviceName: string }> = ({
  productID,
  deviceName,
}) => {
  const formState = useReactive<
    Record<string, string | number | boolean | Record<string, string | number | boolean>>
  >({});

  const [attrList, setAttrList] = useState<AttrTableProps[]>([]);
  const [controlLoading, setControlLoading] = useState(false);

  const actionRef = useRef<ActionType>();

  const valueType = ['bool', 'int', 'float', 'string', 'timestamp', 'enum'];
  const formInputWidth = 250;

  // 获取物模型行为列表
  const { loading } = useRequest(
    async () => {
      const res = await postApiV1ThingsProductSchemaIndex({
        productID,
        type: 3,
      });
      return res.data;
    },
    {
      ready: !!productID,
      onSuccess: (res) => {
        const arr = res.list?.map((item) => {
          return {
            name: item?.name,
            identifier: item?.identifier,
            type: JSON.parse(item.affordance)?.define?.type,
            affordance: JSON.parse(item?.affordance),
          };
        });
        setAttrList(arr);
      },
    },
  );

  // 调用设备行为
  const { run: controlRun } = useRequest(
    (params) =>
      postApiV1ThingsDeviceInteractSendAction({
        productID,
        deviceName: params?.deviceName,
        actionID: params?.actionID,
        inputParams: JSON.stringify(params?.inputParams),
      }),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.code === ResponseCode.SUCCESS) {
          message.success('调用成功');
          const parsedObject = JSON.parse(res?.data?.outputParams || '{}');
          const output = Object.keys(parsedObject).map((key) => ({
            key,
            value: parsedObject[key],
          }));

          notification.open({
            message: '输出参数',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            duration: 3,
            description: (
              <ProDescriptions column={1}>
                {output?.length &&
                  output?.map((item) => (
                    <ProDescriptions.Item label={item.key} key={item.key}>
                      {item.value}
                    </ProDescriptions.Item>
                  ))}
              </ProDescriptions>
            ),
          });
        }
      },
      onFinally: () => setControlLoading(false),
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
                value: (formState?.[firstItem] as Record<string, boolean>)?.[par?.identifier],
                onChange: (v) => {
                  (formState[firstItem] as Record<string, boolean>)[par?.identifier] = v ? 1 : 0;
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
      (par: AttrTableProps, firstItem?: string) => {
        return (
          <ProFormDigit
            name={par?.identifier}
            width={formInputWidth}
            fieldProps={{
              precision: 0,
              value: (formState?.[firstItem] as Record<string, number>)?.[par?.identifier] || '',
              min: Number(par?.define?.min) || 0,
              max: Number(par?.define?.max) || 100,
              step: Number(par?.define?.step) || 1,
              onChange: (v) => {
                (formState[firstItem] as Record<string, number>)[par?.identifier] = v!;
              },
            }}
          />
        );
      },
    ],
    [
      'float',
      (par: AttrTableProps, firstItem?: string) => (
        <ProFormDigit
          name={par?.identifier}
          width={formInputWidth}
          fieldProps={{
            stringMode: true,
            value: (formState?.[firstItem] as Record<string, string>)?.[par?.identifier],
            min: Number(par?.define?.min) || 0.0,
            max: Number(par?.define?.max) || 100.0,
            step: Number(par?.define?.step) || 0.1,
            onChange: (v) => {
              (formState[firstItem] as Record<string, number>)[par?.identifier] = v!;
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
            value: (formState?.[firstItem] as Record<string, string>)?.[par?.identifier] || '',
            onChange: (v) => {
              (formState[firstItem] as Record<string, string>)[par?.identifier] = v.target.value!;
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
            value: String(
              (formState?.[firstItem] as Record<string, number>)?.[par?.identifier] || '',
            ),
            onChange: (v) => {
              (formState[firstItem] as Record<string, number>)[par?.identifier] = Number(v);
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
            allowClear: false,
            showToday: true,
            value: timestampToDateStr(
              Number(
                (formState?.[firstItem] as Record<string, string>)?.[par?.identifier] || Date.now(),
              ),
            ),
            onChange: (v, date) => {
              (formState[firstItem] as Record<string, number>)[par?.identifier] =
                dateStrToTimestamp(date);
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
                label={MODEL_VALUE_TYPE_ENUMS?.[par?.define?.arrayInfo?.type]}
                key={par?.identifier}
              >
                {renderInputValueTypeMap.get(par?.define?.arrayInfo?.type)?.(par, firstItem)}
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
              {par.affordance?.input?.map((item) => (
                <ProDescriptions.Item label={item?.identifier} key={item?.identifier}>
                  {/* {MODE_ENUM[par.affordance?.mode] === 'r' ? '只读' : '读写'} */}
                  {valueType.includes(item.define?.type) &&
                    renderInputValueTypeMap.get(item.define?.type)?.(item, par?.identifier)}
                  {item.define?.type === 'array' &&
                    renderInputArrayTypeMap.get('array')?.(item, par?.identifier)}
                </ProDescriptions.Item>
              ))}
            </ProDescriptions>
          </>
        );
      },
    ],
  ]);

  const renderInput = (attrRecord: AttrTableProps) =>
    renderInputStructTypeMap.get('struct')?.(attrRecord);

  const controlDeviceAct = (attrRecord: AttrTableProps) => {
    setControlLoading(true);
    controlRun({
      deviceName,
      actionID: attrRecord?.identifier,
      inputParams: formState?.[attrRecord?.identifier],
    });
  };

  const columns: ProColumns<AttrTableProps>[] = [
    {
      title: '行为',
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
            onClick={() => controlDeviceAct(record)}
            loading={controlLoading}
          >
            调用
          </Button>
        </>
      ),
    },
  ];

  // 表单初始值
  useEffect(() => {
    if (attrList.length) {
      attrList?.forEach((item) => {
        formState[item?.identifier] = {};
        item?.affordance?.input?.forEach((n) => {
          if (n.define.type === 'bool') {
            formState[item?.identifier][n?.identifier] = parseInt(n?.define?.start) || 0;
          } else formState[item?.identifier][n?.identifier] = parseInt(n?.define?.start) || '';
        });
      });
    }
  }, [attrList.length]);

  return (
    <ProTable<AttrTableProps>
      className="model-prop-table"
      headerTitle="设备行为"
      search={false}
      actionRef={actionRef}
      rowKey="identifier"
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

export default DeviceActPage;
