import { CreateForm } from '@/pages/deviceMangers/device/components/createForm';
import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import {
  postApiV1ThingsDeviceInfoIndex,
  postApiV1ThingsDeviceInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeiguanli';
import { FlagStatus, ResponseCode } from '@/utils/base';
import type { DEVICE_INFO, PRODUCT_INFO } from '@/utils/const';
import { DEVICE_LOG_LEVEL_VALUE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { isOnlineEnum } from '@/utils/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table/lib/typing';
import { history } from '@umijs/max';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import DeviceTagsModal from '../detail/pages/deviceInfo/pages/tagsInfo/deviceTagsModal';
import { MultiImport } from './multiImport';

const { confirm } = Modal;

interface Tags {
  key?: string;
  value?: string;
}

type queryParam = {
  pageSize: number;
  current: number;
  productID?: string;
  deviceName?: string;
  deviceAlias?: string;
  isOnline?: number;
  /** 非模糊查询 为tag的名,value为tag对应的值 */
  tags?: Tags[];
};

interface Props {
  productInfo?: PRODUCT_INFO;
}

const deviceTypeMap = new Map([
  [1, '设备'],
  [2, '网关'],
  [3, '子设备'],
]);

const DeviceList: React.FC<Props> = ({ productInfo }) => {
  const actionRef = useRef<ActionType>();
  const [productsValue, setProductsValue] = useState({});
  const [deviceType, setDeviceType] = useState({});
  const [products, setProducts] = useState<PRODUCT_INFO[]>();
  const [tags, setTags] = useState<Tags[]>();

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
        getProductName(record?.productID ?? '') +
        ',设备名:' +
        record.deviceName,
      icon: <ExclamationCircleOutlined />,
      content: `该设备删除后无法恢复`,
      onOk() {
        const body = {
          productID: record?.productID ?? '',
          deviceName: record?.deviceName ?? '',
        };
        postApiV1ThingsDeviceInfo__openAPI__delete(body).then((res) => {
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
      deviceAlias: params.deviceAlias,
      tags: tags,
      isOnline: Number(params.isOnline || 0),
    };
    const res = await postApiV1ThingsDeviceInfoIndex(body);

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
      const deviceTypeObj = {};
      productMap[productInfo?.productID ?? ''] = { text: productInfo.productName };
      deviceTypeObj[productInfo?.productID ?? ''] = {
        text: deviceTypeMap.get(productInfo.deviceType || 0),
      };
      setProductsValue(productMap);
      setDeviceType(deviceTypeObj);
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
    const res = await postApiV1ThingsProductInfoIndex(body);
    if (res instanceof Response) {
      message.error('获取产品列表失败:' + res.msg);
      return;
    }
    setProducts(res.data.list);
    const productMap = {};
    const deviceTypeObj = {};
    res.data.list?.map((item) => {
      if (item.productID != undefined) {
        productMap[item.productID] = { text: item.productName };
        deviceTypeObj[item.productID] = { text: deviceTypeMap.get(item.deviceType || 0) };
      }
    });
    setProductsValue(productMap);
    setDeviceType(deviceTypeObj);
  };

  const menu = (
    <Menu>
      <Menu.Item key="2">
        <MultiImport key="multiImport" onCommit={() => actionRef.current?.reload()} />
      </Menu.Item>
    </Menu>
  );

  /**
   * 监听
   * */
  useEffect(() => {
    queryProjectList();
  }, []);

  const changeTags = (val: Tags[]) => {
    setTags(val);
  };

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
      title: '设备名称',
      dataIndex: 'deviceName',
      copyable: true,
      render: (text, record: DEVICE_INFO) => [
        <a
          key="view"
          onClick={() => {
            history.push(
              '/deviceMangers/device/detail/' + record.productID + '/' + record.deviceName + '/1',
            );
          }}
        >
          {text}
        </a>,
      ],
    },
    {
      title: '设备别名',
      dataIndex: 'deviceAlias',
    },
    {
      title: '所属产品名称',
      dataIndex: 'productID',
      valueType: 'select',
      ellipsis: true,
      hideInTable: productInfo != undefined,
      hideInSearch: productInfo != undefined,
      valueEnum: productsValue,
    },
    {
      title: '所属产品ID',
      dataIndex: 'productID',
      ellipsis: true,
      copyable: true,
      hideInTable: true,
      search: false,
    },
    {
      title: '设备类型',
      dataIndex: 'productID',
      ellipsis: true,
      hideInTable: productInfo != undefined,
      search: false,
      valueEnum: deviceType,
      width: 80,
    },
    {
      title: '设备标签',
      dataIndex: 'tags',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <div style={{ marginTop: -16 }}>
            <DeviceTagsModal
              flag={FlagStatus.CREATE}
              key="createDeviceTags"
              changeTags={changeTags}
            />
          </div>
        );
      },
    },
    {
      title: '固件版本',
      dataIndex: 'version',
      search: false,
      hideInTable: true,
    },
    {
      title: '日志级别',
      dataIndex: 'logLevel',
      valueType: 'select',
      search: false,
      valueEnum: DEVICE_LOG_LEVEL_VALUE,
      hideInTable: true,
    },
    {
      title: '在线状态',
      dataIndex: 'isOnline',
      valueType: 'select',
      valueEnum: isOnlineEnum,
      width: 80,
    },
    {
      title: '激活时间',
      key: 'firstLogin',
      dataIndex: 'firstLogin',
      search: false,
      hideInTable: true,
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
      hideInTable: true,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record: DEVICE_INFO) => (
        <>
          <a
            key="view"
            onClick={() => {
              history.push(
                '/deviceMangers/device/detail/' + record.productID + '/' + record.deviceName + '/1',
              );
            }}
            style={{ marginRight: '16px' }}
          >
            查看
          </a>
          <Button
            type="link"
            danger
            key="deleteProduct"
            onClick={() => {
              showDeleteConfirm(record);
            }}
            style={{ padding: 0 }}
          >
            删除
          </Button>
          {deviceType[record.productID as string]?.text === '网关' && (
            <div>
              <a
                className=""
                href={`/deviceMangers/device/detail/${record.productID}/${record.deviceName}/7`}
              >
                子设备管理
              </a>
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <ProTable<DEVICE_INFO, queryParam>
      rowKey="secret"
      columns={columns}
      actionRef={actionRef}
      bordered
      request={queryPage}
      onReset={() => setTags(undefined)}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      search={{
        span: 4,
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
      toolBarRender={() => [
        <CreateForm
          key="createDevice"
          productValues={products}
          onCommit={() => actionRef.current?.reload()}
        />,
        <Dropdown key="more" overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
      ]}
    />
  );
};

export default DeviceList;
