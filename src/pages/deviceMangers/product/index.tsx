import {
  postApiV1ThingsProductInfoIndex,
  postApiV1ThingsProductInfo__openAPI__delete,
} from '@/services/iThingsapi/chanpinguanli';
import { FlagStatus, ResponseCode } from '@/utils/base';
import type { PRODUCT_INFO } from '@/utils/const';
import { DEVICE_TYPE_VALUE, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { history } from '@@/core/history';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table/lib/typing';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { CreateForm } from './createForm';
import type { TagsInfo } from './data';
import ProductTagsModal from './detail/pages/productInfo/components/deviceTagsModal';

const { confirm } = Modal;

type queryParam = {
  pageSize: number;
  current: number;
  deviceType: number;
  productName: string;
};

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [tags, setTags] = useState<TagsInfo[]>();

  const queryPage = async (
    params: queryParam,
  ): Promise<{ data?: PRODUCT_INFO[]; total?: number }> => {
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      // deviceType: Number(params.deviceType),
      productName: params.productName,
      tags: tags,
    };
    const res = await postApiV1ThingsProductInfoIndex(body);

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

  const changeTags = (val: TagsInfo[]) => {
    setTags(val);
  };

  const columns: ProColumns<PRODUCT_INFO>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      key: 'productName',
      title: '产品名称',
      dataIndex: 'productName',
      copyable: true,
      render: (text, record) => [
        <a
          key="view"
          onClick={() => {
            history.push('/deviceMangers/product/detail/' + record.productID);
          }}
        >
          {text}
        </a>,
      ],
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
      valueEnum: DEVICE_TYPE_VALUE,
    },
    {
      title: '产品标签',
      dataIndex: 'tags',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <div style={{ marginTop: -16 }}>
            <ProductTagsModal
              flag={FlagStatus.CREATE}
              key="createDeviceTags"
              changeTags={changeTags}
            />
          </div>
        );
      },
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
