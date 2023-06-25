import {
  postApiV1SystemApiIndex,
  postApiV1SystemApi__openAPI__delete,
} from '@/services/iThingsapi/jiekouguanli';
import {
  BUSINESS_TYPE_VALUE,
  METHOD_VALUE,
  PROTABLE_OPTIONS,
  SEARCH_CONFIGURE,
} from '@/utils/const';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ParamsType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { useRequest } from 'ahooks';
import { Button, message, Modal, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import CreateOrUpdateApi from './components/CreateOrUpdateApi';

export type ApiListType = {
  id: number;
  route: string;
  method: number;
  businessType: number;
  group: string;
  name: string;
  path?: string;
  key?: string | number;
  title?: string;
  onlyId?: string;
};

const { confirm } = Modal;

const ApiList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const { runAsync, error } = useRequest(
    async (params) => {
      const res = await postApiV1SystemApiIndex(params);
      return {
        data: res.data?.list,
        total: res.data?.total,
      };
    },
    {
      manual: true, // 手动触发请求
    },
  );

  const { run: runDelete } = useRequest(postApiV1SystemApi__openAPI__delete, {
    manual: true,
    onError: (err) => {
      message.error('删除接口失败:' + err.message);
    },
    onSuccess: (data) => {
      message.success('删除接口成功:' + data.msg);
      actionRef.current?.reloadAndRest?.();
    }, // 手动触发请求
  });

  const queryPage = async (params: ParamsType) => {
    if (error) message.error('获取操作日志错误:' + error.message);
    return runAsync(params);
  };

  // 删除操作
  const showDeleteConfirm = (record: { id: number; name: string }) => {
    confirm({
      title: '是否删除当前接口',
      icon: <ExclamationCircleOutlined />,
      content: `所选接口  ${record?.name},  删除后无法恢复，请确认`,
      onOk() {
        runDelete({ id: record?.id });
      },
    });
  };

  const columns: ProColumns<ApiListType>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '接口编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '接口路由',
      dataIndex: 'route',
      copyable: true,
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: METHOD_VALUE,
      copyable: true,
    },
    {
      title: '接口分组',
      dataIndex: 'group',
      copyable: true,
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '业务类型',
      dataIndex: 'businessType',
      valueType: 'select',
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Tag color={BUSINESS_TYPE_VALUE[record?.businessType]?.color} key={record.businessType}>
            {BUSINESS_TYPE_VALUE[record?.businessType]?.text}
          </Tag>
        </Space>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <CreateOrUpdateApi flag="update" record={record} key="updateApi" actionRef={actionRef} />
          <Button type="link" danger key="deleteProduct" onClick={() => showDeleteConfirm(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ApiListType>
        headerTitle="接口管理"
        bordered
        actionRef={actionRef}
        rowKey="id"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateApi flag="create" key="createApi" actionRef={actionRef} />,
        ]}
        request={(params) =>
          queryPage({
            ...params,
            method: Number(params.method),
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

export default ApiList;
