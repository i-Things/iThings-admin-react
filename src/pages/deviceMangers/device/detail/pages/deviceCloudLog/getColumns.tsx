import { Button } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import type { AttrData } from './data';

export const useAttrColumns = () => {
  return [
    {
      title: '标识符',
      dataIndex: 'dataID',
      key: 'dataID',
      render: (val: string) => val || '-',
    },
    {
      title: '历史数据',
      dataIndex: 'sendValue',
      key: 'sendValue',
      render: (_, record) => (
        <Button
          onClick={() => {
            console.log(record);
          }}
          type="link"
        >
          查看
        </Button>
      ),
    },
    {
      title: '最新值',
      dataIndex: 'getValue',
      key: 'getValue',
      render: (val: string) => val || '-',
    },
    {
      title: '更新时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (val: string) => {
        if (val === '0') {
          return '-';
        } else {
          return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss.SSS') || '-';
        }
      },
    },
  ] as ColumnsType<Partial<AttrData>>;
};

export const eventColumns = [
  {
    title: '时间',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '日志类型',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '事件信息',
    dataIndex: 'address',
    key: 'address',
  },
];

export const contentColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => {
      if (val === '0') {
        return '-';
      } else {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss.SSS') || '-';
      }
    },
  },
  {
    title: '操作类型',
    dataIndex: 'action',
    key: 'action',
    render: (val: string) => val || '-',
  },
  {
    title: '请求ID',
    dataIndex: 'requestID',
    key: 'requestID',
    render: (val: string) => val || '-',
  },
  {
    title: '主题',
    dataIndex: 'topic',
    key: 'topic',
    render: (val: string) => val || '-',
  },
  {
    title: '详细信息',
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
    render: (val: string) => {
      if (val === '0') {
        return '-';
      } else {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss.SSS') || '-';
      }
    },
  },
  {
    title: '操作类型',
    dataIndex: 'action',
    key: 'action',
    render: (val: string) => val || '-',
  },
  {
    title: '请求ID',
    dataIndex: 'requestID',
    key: 'requestID',
    render: (val: string) => val || '-',
  },
  {
    title: '详细信息',
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
