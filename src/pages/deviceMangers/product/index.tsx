import {
  postThingsProductInfoIndex,
  postThingsProductInfo__openAPI__delete,
} from '@/services/iThingsapi/chanpinguanli';
import { deviceTypeValue } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { history } from '@@/core/history';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import React, { useRef } from 'react';
import { CreateForm } from './createForm';

const { confirm } = Modal;

type queryParam = {
  pageSize: number;
  current: number;
  deviceType: number;
  productName: string;
};

const columns: ProColumns<PRODUCT.productInfo>[] = [
  {
    key: 'productName',
    title: '产品名称',
    dataIndex: 'productName',
  },
  {
    key: 'productID',
    title: '产品id',
    dataIndex: 'productID',
    search: false,
  },
  {
    key: 'deviceType',
    title: '设备类型',
    dataIndex: 'deviceType',
    valueEnum: deviceTypeValue,
  },
  {
    key: 'createdTime',
    title: '创建时间',
    dataIndex: 'createdTime',
    search: false,
    renderText: (text: string) => (text == '-' ? text : timestampToDateStr(Number(text))),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="show"
        onClick={() => {
          history.push('/deviceMangers/product/detail/' + record.productID);
        }}
      >
        查看
      </a>,
      <Button
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
              postThingsProductInfo__openAPI__delete(body).then((res) => {
                if (res.code === 200) {
                  message.success('删除成功');
                  action?.reload();
                }
              });
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }}
      >
        删除
      </Button>,
    ],
  },
];

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const queryPage = async (
    params: queryParam,
  ): Promise<{ data?: PRODUCT.productInfo[]; total?: number }> => {
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      deviceType: Number(params.deviceType),
      productName: params.productName,
    };
    const res = await postThingsProductInfoIndex(body);

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
  return (
    <PageContainer>
      <ProTable<PRODUCT.productInfo, queryParam>
        rowKey="productID"
        actionRef={actionRef}
        request={queryPage}
        search={{
          defaultCollapsed: false,
          span: 12,
          labelWidth: 'auto',
        }}
        tableAlertRender={false}
        columns={columns}
        bordered
        size={'middle'}
        toolBarRender={() => [<CreateForm onCommit={() => actionRef.current?.reload()} />]}
      />
    </PageContainer>
  );
};

export default IndexPage;
