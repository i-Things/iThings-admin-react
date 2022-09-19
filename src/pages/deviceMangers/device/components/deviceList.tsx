import { CreateForm } from '@/pages/deviceMangers/device/components/createForm';
import { postThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import {
  postThingsDeviceInfoIndex,
  postThingsDeviceInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeiguanli';
import { ResponseCode } from '@/utils/base';
import { DEVICE_INFO, DEVICE_LOG_LEVEL_VALUE, PRODUCT_INFO } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table/lib/typing';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

const { confirm } = Modal;
type queryParam = {
  pageSize: number;
  current: number;
  productID?: string;
  deviceName?: string;
  /** 非模糊查询 为tag的名,value为tag对应的值 */
  tags?: { key?: string; value?: string }[];
};
const STATUS = new Map([
  [1, '离线'],
  [2, '在线'],
]);
interface Props {
  productInfo?: PRODUCT_INFO;
}
const DeviceList: React.FC<Props> = ({ productInfo }) => {
  const actionRef = useRef<ActionType>();
  const [productsValue, setProductsValue] = useState({});
  const [products, setProducts] = useState<PRODUCT_INFO[]>();
  const getProductName = (productID: string) => {
    const info = productsValue[productID];
    if (info != undefined) {
      return info.text;
    }
    return '-';
  };
  /**
   * 删除
   * */
  const showDeleteConfirm = (record: DEVICE_INFO) => {
    confirm({
      title:
        '你确定要删除该设备吗？产品:' +
        getProductName(record.productID) +
        ',设备名:' +
        record.deviceName,
      icon: <ExclamationCircleOutlined />,
      content: `该设备删除后无法恢复`,
      onOk() {
        const body = {
          productID: record.productID,
          deviceName: record.deviceName,
        };
        postThingsDeviceInfo__openAPI__delete(body).then((res) => {
          if (res.code === ResponseCode.SUCCESS) {
            message.success('删除成功');
            actionRef.current?.reload();
          }
        });
      },
    });
  };

  /**
   * 查询数据
   * */
  const queryPage = async (
    params: queryParam,
  ): Promise<{ data?: DEVICE_INFO[]; total?: number }> => {
    let productID = params.productID;
    if (productInfo != undefined && productID == undefined) {
      productID = productInfo.productID;
    }
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      productID: productID,
      deviceName: params.deviceName,
      tags: params.tags,
    };
    const res = await postThingsDeviceInfoIndex(body);

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
  /**
   * 查询数据
   * */
  const queryProjectList = async () => {
    if (productInfo != undefined) {
      const productMap = {};
      productMap[productInfo?.productID ?? ''] = { text: productInfo.productName };
      setProductsValue(productMap);
      const list = [productInfo];
      setProducts(list);
      return;
    }
    const body = {
      page: {
        size: 9999999,
        page: 1,
      },
    };
    const res = await postThingsProductInfoIndex(body);
    if (res instanceof Response) {
      message.error('获取产品列表失败:' + res.msg);
      return;
    }
    setProducts(res.data.list);
    const productMap = {};
    res.data.list?.map((item) => {
      if (item.productID != undefined) {
        productMap[item.productID] = { text: item.productName };
      }
    });
    setProductsValue(productMap);
  };

  /**
   * 监听
   * */
  useEffect(() => {
    queryProjectList();
  }, []);

  /**
   * 列信息
   * */
  const columns: ProColumns<DEVICE_INFO>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '产品名称',
      dataIndex: 'productID',
      valueType: 'select',
      ellipsis: true,
      hideInTable: productInfo != undefined,
      hideInSearch: productInfo != undefined,
      valueEnum: productsValue,
    },
    {
      title: '产品ID',
      dataIndex: 'productID',
      ellipsis: true,
      copyable: true,
      hideInTable: productInfo != undefined,
      hideInSearch: productInfo != undefined,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      copyable: true,
      render: (text, record: DEVICE_INFO) => [
        <a
          key="view"
          onClick={() => {
            history.push(
              '/deviceMangers/device/detail/' + record.productID + '/' + record.deviceName,
            );
          }}
        >
          {text}
        </a>,
      ],
    },
    {
      title: '固件版本',
      dataIndex: 'version',
      search: false,
    },
    {
      title: '日志级别',
      dataIndex: 'logLevel',
      valueType: 'select',
      search: false,
      valueEnum: DEVICE_LOG_LEVEL_VALUE,
    },
    {
      title: '在线状态',
      dataIndex: 'isOnline',
      search: false,
      valueType: 'select',
      render: (_, record) =>
        record.firstLogin === '0' ? '未激活' : STATUS.get(record.isOnline || 0),
    },
    {
      title: '激活时间',
      key: 'firstLogin',
      dataIndex: 'firstLogin',
      search: false,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '最后上线时间',
      key: 'lastLogin',
      dataIndex: 'lastLogin',
      search: false,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '创建时间',
      key: 'createdTime',
      dataIndex: 'createdTime',
      search: false,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: DEVICE_INFO) => [
        <a
          key="view"
          onClick={() => {
            history.push(
              '/deviceMangers/device/detail/' + record.productID + '/' + record.deviceName,
            );
          }}
        >
          查看
        </a>,
        <Button
          danger
          key="deleteProduct"
          onClick={() => {
            showDeleteConfirm(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <ProTable<DEVICE_INFO, queryParam>
      rowKey="secret"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={queryPage}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <CreateForm productValues={products} onCommit={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default DeviceList;
