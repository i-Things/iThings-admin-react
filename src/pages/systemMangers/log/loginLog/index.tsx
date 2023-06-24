import { postApiV1SystemLogLoginIndex } from '@/services/iThingsapi/rizhiguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import type { ParamsType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { useRequest } from 'ahooks';
import { Badge, message, Space } from 'antd';
import React, { useRef } from 'react';

import '../styles.less';

type LoginLogType = {
  userID?: number;
  userName?: string;
  ipAddr?: string;
  loginLocation?: string;
  browser?: string;
  os?: string;
  code?: string;
  msg?: string;
  createdTime?: string;
};

const LoginLog: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const { runAsync, error } = useRequest(
    async (params) => {
      const res = await postApiV1SystemLogLoginIndex(params);
      return {
        data: res.data?.list,
        total: res.data?.total,
      };
    },
    {
      manual: true, // 手动触发请求
    },
  );

  const queryPage = async (params: ParamsType) => {
    if (error) message.error('获取操作日志错误:' + error.message);
    return runAsync(params);
  };

  const columns: ProColumns<LoginLogType>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户id',
      dataIndex: 'userID',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '登录人员',
      dataIndex: 'userName',
      defaultSortOrder: 'ascend',
      hideInSearch: true,
    },
    {
      title: '登录ip地址',
      dataIndex: 'ipAddr',
      copyable: true,
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      copyable: true,
    },
    {
      title: '浏览器类型',
      dataIndex: 'browser',
      valueType: 'select',
      hideInSearch: true,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      hideInSearch: true,
    },
    {
      title: '登录状态',
      dataIndex: 'code',
      filters: true,
      onFilter: true,
      valueType: 'select',
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Badge
            status={record.code === '200' ? 'success' : 'error'}
            text={record.code === '200' ? '成功' : '失败'}
          />
        </Space>
      ),
    },
    {
      title: '提示信息',
      dataIndex: 'msg',
      hideInSearch: true,
    },
    {
      title: '登录时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInSearch: true,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '登录时间',
      dataIndex: 'createdTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            date: {
              start: value[0],
              end: value[1],
            },
          };
        },
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<LoginLogType>
        headerTitle="操作日志"
        bordered
        actionRef={actionRef}
        rowKey="userID"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        request={(params) =>
          queryPage({
            ...params,
            page: { page: params.current || 1, size: params.pageSize || 10 },
          })
        }
        pagination={{ defaultPageSize: 10 }}
        columns={columns}
        size={'middle'}
      />
    </PageContainer>
  );
};

export default LoginLog;
