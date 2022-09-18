import { CreateForm } from '@/pages/device/createForm';
import { postThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import {
  postThingsDeviceInfoIndex,
  postThingsDeviceInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeiguanli';
import { PRODUCT_INFO } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

const { confirm } = Modal;

const DeviceList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [productsValue, setProductsValue] = useState([]);
  const [products, setProducts] = useState<PRODUCT_INFO[]>();

  /**
   * 删除
   * */
  const showDeleteConfirm = (record: any) => {
    confirm({
      title: '你确定要删除该设备吗？',
      icon: <ExclamationCircleOutlined />,
      content: `该设备删除后无法恢复`,
      onOk() {
        console.log(record, '删除');
        const body = {
          productID: record.productID,
          deviceName: record.deviceName,
        };
        postThingsDeviceInfo__openAPI__delete(body).then((res) => {
          if (res.code === 200) {
            message.success('删除成功');
            actionRef.current?.reload();
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  /**
   * 列信息
   * */
  const columns: any = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '产品名称',
      dataIndex: 'projectId',
      ellipsis: true,
      render: (_: any, row: any) => {
        const find_row = productsValue.find((item: any) => item.value === row.productID);
        return (find_row as any)?.label;
      },
    },
    {
      title: '固定版本',
      dataIndex: 'version',
    },
    {
      title: '日志级别',
      dataIndex: 'logLevel',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '关闭',
          status: '1',
        },
        2: {
          text: '错误',
          status: '2',
        },
        3: {
          text: '警告',
          status: '3',
        },
        4: {
          text: '信息',
          status: '4',
        },
        5: {
          text: '调试',
          status: '5',
        },
      },
    },
    {
      title: '在线状态',
      dataIndex: 'isOnline',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '离线',
          status: '1',
        },
        2: {
          text: '在线',
          status: '2',
        },
      },
    },
    {
      title: '激活时间',
      key: 'firstLogin',
      dataIndex: 'firstLogin',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      render: (text: string) =>
        ['0', '-'].includes(text) ? '-' : timestampToDateStr(Number(text)),
    },
    {
      title: '最后上线时间',
      key: 'lastLogin',
      dataIndex: 'lastLogin',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      render: (text: any) => (['0', '-'].includes(text) ? '-' : timestampToDateStr(text)),
    },
    {
      title: '创建时间',
      key: 'createdTime',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      render: (text: any) => (['0', '-'].includes(text) ? '-' : timestampToDateStr(text)),
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text: any, record: any) => [
        <a
          key="view"
          onClick={() => {
            history.push('/deviceManger/device/detail/123');
          }}
        >
          查看
        </a>,
        <a
          key="view"
          onClick={() => {
            showDeleteConfirm(record);
          }}
        >
          查看
        </a>,
      ],
    },
  ];
  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<any> => {
    console.log(123, params);
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      productID: params.productID,
      deviceName: params.deviceName,
      logLevel: params.logLevel,
      isOnline: params.isOnline,
      version: params.version,
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
  const queryProjectList = async (): Promise<any> => {
    const body = {
      page: {
        size: 9999999,
        page: 1,
      },
      deviceType: 1,
    };
    const res = await postThingsProductInfoIndex(body);

    if (res instanceof Response) {
      setProductsValue([]);
    }
    setProducts(res.data.list);
    const list: any = [];
    res.data.list?.map((item) => {
      list.push({
        label: item.productName,
        value: item.productID,
      });
    });
    setProductsValue(list);
  };

  /**
   * 监听
   * */
  useEffect(() => {
    queryProjectList();
  }, []);
  return (
    <ProTable<any>
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
        onChange(value) {
          console.log('value: ', value);
        },
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
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <CreateForm productInfos={products} onCommit={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default DeviceList;
