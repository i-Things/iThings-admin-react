import { postApiV1SystemLogOperIndex } from '@/services/iThingsapi/rizhiguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import type { ParamsType } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { useRequest } from 'ahooks';
import { Badge, Button, message, Modal, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

type OperationLogType = {
  uid?: number;
  operUserName?: string;
  operName?: string;
  businessType?: number;
  uri?: string;
  operIpAddr?: string;
  operLocation?: string;
  req?: string;
  resp?: string;
  code?: number;
  msg?: string;
  createdTime?: string;
};

const OperationLog: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordList, setRecordList] = useState('');
  const actionRef = useRef<ActionType>();

  const { runAsync, error } = useRequest(
    async (params) => {
      const res = await postApiV1SystemLogOperIndex(params);
      return {
        data: res.data?.list,
        total: res.data?.total,
      };
    },
    {
      manual: true, // 手动触发请求
    },
  );
  const statusValueEnum = {
    200: { text: '成功', color: '#2569eb' },
    other: { text: '失败', color: '#2569eb' },
  };

  const businessTypeEnum = {
    1: { text: '新增', color: 'blue' },
    2: { text: '删除', color: 'red' },
    3: { text: '修改', color: 'yellow' },
    4: { text: '查询', color: 'green' },
    5: { text: '其它', color: '#ccc' },
  };

  const onOpen = () => {
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };

  const queryPage = async (params: ParamsType) => {
    if (error) message.error('获取操作日志错误:' + error.message);
    return runAsync(params);
  };

  const columns: ProColumns<OperationLogType>[] = [
    {
      title: '用户id',
      dataIndex: 'uid',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '操作名称',
      dataIndex: 'operName',
      copyable: true,
    },
    {
      title: '业务类型',
      dataIndex: 'businessType',
      valueType: 'select',
      hideInTable: true,
      valueEnum: businessTypeEnum,
      copyable: true,
    },
    {
      title: '业务类型',
      dataIndex: 'businessType',
      valueType: 'select',
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Tag
            color={businessTypeEnum[record.businessType as number].color}
            key={record.businessType}
          >
            {businessTypeEnum[record.businessType as number].text}
          </Tag>
        </Space>
      ),
    },
    {
      title: '操作人员',
      dataIndex: 'operUserName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.operUserName - b.operUserName,
      copyable: true,
    },
    {
      title: '操作主机ip地址',
      dataIndex: 'operIpAddr',
      hideInSearch: true,
    },
    {
      title: '操作地点',
      dataIndex: 'operLocation',
      hideInSearch: true,
    },
    {
      title: '操作状态',
      dataIndex: 'code',
      filters: true,
      onFilter: true,
      valueType: 'select',
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Badge
            status={record.code == '200' ? 'success' : 'error'}
            text={record.code == '200' ? '成功' : '失败'}
          />
        </Space>
      ),
    },

    {
      title: '操作时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      sorter: (a, b) => a.createdTime - b.createdTime,
      hideInSearch: true,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setRecordList(record);
            onOpen();
          }}
        >
          详情
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<OperationLogType>
        headerTitle="操作日志"
        actionRef={actionRef}
        rowKey="uid"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        request={(params) =>
          queryPage({
            ...params,
            page: { page: params.current || 1, size: params.pageSize || 10 },
          })
        }
        columns={columns}
        size={'middle'}
      />
      <Modal title="操作日志详情" visible={isModalOpen} onOk={onOpen} onCancel={onClose}>
        <ProDescriptions column={2}>
          <ProDescriptions.Item valueType="text" ellipsis label="操作模块">
            {recordList?.systemModule}/{recordList?.type?.[0].name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" ellipsis label="请求地址">
            {recordList?.systemModule}/{recordList?.type?.[0].name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" ellipsis label="登录信息">
            {recordList?.operator}/{recordList?.ip}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" ellipsis label="请求方式">
            {recordList?.requestMethod}
          </ProDescriptions.Item>
          <ProDescriptions.Item span={2} valueType="code" ellipsis label="操作方法">
            {recordList?.requestMethod}
          </ProDescriptions.Item>
          <ProDescriptions.Item span={2} valueType="code" ellipsis label="请求参数">
            {recordList?.requestMethod}
          </ProDescriptions.Item>
          <ProDescriptions.Item span={2} valueType="code" ellipsis label="返回参数">
            {recordList?.requestMethod}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" ellipsis label="操作状态">
            {statusValueEnum?.[recordList?.status]?.text}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="dateTime" ellipsis label="操作时间">
            {recordList?.operationTime}
          </ProDescriptions.Item>
        </ProDescriptions>
      </Modal>
    </PageContainer>
  );
};

export default OperationLog;
