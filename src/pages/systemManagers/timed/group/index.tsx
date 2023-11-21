import { postApiV1ThingsProductInfo__openAPI__delete } from '@/services/iThingsapi/chanpinguanli';
import { postApiV1SystemTimedTaskGroupIndex } from '@/services/iThingsapi/renwu';
import { ResponseCode } from '@/utils/base';
import type { PRODUCT_INFO } from '@/utils/const';
import { SEARCH_CONFIGURE, TASK_GROUP_SUB_TYPE_VALUE, TASK_GROUP_TYPE_VALUE } from '@/utils/const';
import { history } from '@@/core/history';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table/lib/typing';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import { CreateForm } from './createForm';

const { confirm } = Modal;

type queryParam = {
  pageSize: number;
  current: number;
  deviceType: number;
  productName: string;
};

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const queryPage = async (
    params: queryParam,
  ): Promise<{ data?: API.taskGroup[]; total?: number }> => {
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      // deviceType: Number(params.deviceType),
      productName: params.productName,
    };
    const res = await postApiV1SystemTimedTaskGroupIndex(body);

    if (res instanceof Response) {
      return {
        data: [],
        total: 0,
      };
    }
    return {
      data: res.data.list,
      total: res.data.total,
    };
  };

  const columns: ProColumns<API.taskGroup>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      key: 'code',
      title: '组编码',
      dataIndex: 'code',
      copyable: true,
      render: (text, record) => [
        <a
          key="view"
          onClick={() => {
            history.push('/systemManagers/timed/group/detail/' + record.code);
          }}
        >
          {text}
        </a>,
      ],
    },
    {
      key: 'name',
      title: '组名',
      dataIndex: 'name',
      search: false,
    },
    {
      key: 'type',
      title: '组类型',
      dataIndex: 'type',
      valueEnum: TASK_GROUP_TYPE_VALUE,
    },
    {
      key: 'subType',
      title: '组子类型',
      dataIndex: 'subType',
      valueEnum: TASK_GROUP_SUB_TYPE_VALUE,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="show"
          onClick={() => {
            history.push('/systemManagers/timed/group/detail/' + record.code);
          }}
        >
          查看
        </a>,
        <Button
          type="link"
          danger
          key="deleteProduct"
          onClick={() => {
            confirm({
              title: '你确定要删除该产品吗？',
              icon: <ExclamationCircleOutlined />,
              content: `所选产品名: ${record?.productName ?? ''},删除后无法恢复`,
              onOk() {
                const body = {
                  productID: record?.productID ?? '',
                };
                postApiV1ThingsProductInfo__openAPI__delete(body).then(
                  (res: { code: number; msg: string }) => {
                    if (res.code === ResponseCode.SUCCESS) {
                      message.success('删除成功');
                      action?.reload();
                    }
                  },
                );
              },
              onCancel() {},
            });
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  useEffect(() => {
    console.log('11111');
    console.log('11111');
  }, []);

  return (
    <PageContainer>
      <ProTable<PRODUCT_INFO, queryParam>
        rowKey="productID"
        actionRef={actionRef}
        request={queryPage}
        search={{ ...SEARCH_CONFIGURE, span: 6 }}
        tableAlertRender={false}
        columns={columns}
        bordered
        size={'middle'}
        toolBarRender={() => [
          <CreateForm onCommit={() => actionRef.current?.reload()} key="createProduct" />,
        ]}
      />
    </PageContainer>
  );
};

export default IndexPage;
