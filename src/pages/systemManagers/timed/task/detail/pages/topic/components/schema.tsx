import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  name: string;
  topic: string;
  access: string;
  method: string;
  desc: string;
}

const data: DataType[] = [
  {
    name: '属性上报',
    topic: '$thing/up/property/{ProductID}/{DeviceName}',
    access: '发布',
    method: 'report',
    desc: '设备属性上报',
  },
  {
    name: '属性上报',
    topic: '$thing/down/property/{ProductID}/{DeviceName}',
    access: '订阅',
    method: 'report_reply',
    desc: '云端响应属性上报',
  },
  {
    name: '属性设置',
    topic: '$thing/down/property/{ProductID}/{DeviceName}',
    access: '订阅',
    method: 'control',
    desc: '云端属性设置请求',
  },
  {
    name: '属性设置',
    topic: '$thing/up/property/{ProductID}/{DeviceName}',
    access: '发布',
    method: 'control_reply',
    desc: '设备属性设置回复',
  },
  {
    name: '最新属性获取',
    topic: '$thing/up/property/{ProductID}/{DeviceName}',
    access: '发布',
    method: 'get_status',
    desc: '设备从云端接收最新消息',
  },
  {
    name: '最新属性获取',
    topic: '$thing/down/property/{ProductID}/{DeviceName}',
    access: '订阅',
    method: 'get_status_reply',
    desc: '设备从云端接收最新消息的回复',
  },
  {
    name: '事件上报',
    topic: '$thing/up/event/{ProductID}/{DeviceName}',
    access: '发布',
    method: 'event_post',
    desc: '设备事件上报',
  },
  {
    name: '事件上报',
    topic: '$thing/down/event/{ProductID}/{DeviceName}',
    access: '订阅',
    method: 'event_reply',
    desc: '云端响应事件上报',
  },
  {
    name: '行为调用',
    topic: '$thing/down/action/{ProductID}/{DeviceName}',
    access: '订阅',
    method: 'action',
    desc: '云端调用设备行为',
  },
  {
    name: '行为调用',
    topic: '$thing/up/action/{ProductID}/{DeviceName}',
    access: '发布',
    method: 'action_reply',
    desc: '设备端响应服务调用',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: '功能',
    dataIndex: 'name',
    onCell: (_, index) => {
      if (index === undefined) {
        return { rowSpan: 1 };
      }
      switch (index % 2) {
        case 0:
          return { rowSpan: 2 };
        default:
          return { rowSpan: 0 };
      }
    },
  },
  {
    title: 'Topic类',
    dataIndex: 'topic',
  },
  {
    title: '设备操作权限',
    dataIndex: 'access',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
];

const Schema: React.FC = () => <Table columns={columns} dataSource={data} bordered />;

export default Schema;
