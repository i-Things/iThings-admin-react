import { timestampToDateStr } from '@/utils/date';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { AttrData } from './data';

const eventTypeMap = new Map([
  ['info', '信息'],
  ['alert', '告警'],
  ['fault', '故障'],
]);

const actionMap = new Map([
  ['connected', '上线'],
  ['disconnected', '下线'],
  ['property', '属性'],
  ['event', '事件'],
  ['action', '行为'],
  ['subscribe', '订阅'],
  ['publish', '发布'],
]);

const dataTypeMap = new Map([
  ['bool', '布尔型'],
  ['int', '整数型'],
  ['string', '字符串'],
  ['float', '浮点型'],
  ['enum', '枚举整型'],
  ['timestamp', '时间型'],
  ['struct', '结构体'],
  ['array', '数组'],
]);

export const getAttrColumns = (handleHistory: (record: Partial<AttrData>) => void) => {
  return [
    {
      title: '标识符',
      dataIndex: 'dataID',
      key: 'dataID',
      render: (val: string) => val || '-',
    },
    {
      title: '功能名称',
      dataIndex: 'name',
      key: 'name',
      render: (val: string) => val || '-',
    },
    {
      title: '历史数据',
      dataIndex: 'sendValue',
      key: 'sendValue',
      render: (_, record) => (
        <Button onClick={() => handleHistory(record)} type="link">
          查看
        </Button>
      ),
    },
    {
      title: '数据类型',
      dataIndex: 'affordance',
      key: 'affordance',
      render: (val: string) => dataTypeMap.get(val) || '-',
    },
    {
      title: '最新值',
      dataIndex: 'value',
      key: 'value',
      render: (val: string) => val || '-',
    },
    {
      title: '更新时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (val: string) => timestampToDateStr(Number(val), 'YYYY-MM-DD HH:mm:ss.SSS'),
    },
  ] as ColumnsType<Partial<AttrData>>;
};

export const eventColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val), 'YYYY-MM-DD HH:mm:ss.SSS'),
  },
  {
    title: '日志类型',
    dataIndex: 'type',
    key: 'type',
    render: (val: string) => eventTypeMap.get(val) || '-',
  },
  {
    title: '事件信息',
    dataIndex: 'params',
    key: 'params',
  },
];

export const contentColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val), 'YYYY-MM-DD HH:mm:ss.SSS'),
  },
  {
    title: '操作类型',
    dataIndex: 'action',
    key: 'action',
    render: (val: string) => actionMap.get(val) || '-',
  },

  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'topic',
    render: (val: string) => val || '-',
  },
  {
    title: '通信内容',
    dataIndex: 'content',
    key: 'content',
    render: (val: string) => val || '-',
  },
  {
    title: '请求结果状态',
    dataIndex: 'resultType',
    key: 'resultType',
    render: (val: string) => val || '-',
  },
];

export const accessColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val), 'YYYY-MM-DD HH:mm:ss.SSS'),
  },
  {
    title: '操作类型',
    dataIndex: 'action',
    key: 'action',
    render: (val: string) => actionMap.get(val) || '-',
  },

  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'topic',
    render: (val: string) => val || '-',
  },
  {
    title: '描述',
    dataIndex: 'content',
    key: 'content',
    render: (val: string) => val || '-',
  },
  {
    title: '请求结果状态',
    dataIndex: 'resultType',
    key: 'resultType',
    render: (val: string) => val || '-',
  },
];

export const onofflineColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val), 'YYYY-MM-DD HH:mm:ss.SSS'),
  },
  {
    title: '动作',
    dataIndex: 'action',
    key: 'action',
    render: (val: string) => actionMap.get(val) || '-',
  },
];
