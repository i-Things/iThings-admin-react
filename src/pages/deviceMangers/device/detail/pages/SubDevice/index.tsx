import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import {
  postApiV1ThingsDeviceGatewayIndex,
  postApiV1ThingsDeviceGatewayMultiDelete,
} from '@/services/iThingsapi/wangguanzishebeiguanli';

import { DefaultPage, ResponseCode } from '@/utils/base';
import type { DEVICE_INFO } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { isOnlineEnum } from '@/utils/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useAntdTable, useRequest } from 'ahooks';
import { Button, Card, message, Modal, Space } from 'antd';
import type { Key } from 'react';
import React, { useState } from 'react';
import type { DeviceInfo, PageInfo } from '../../../data';
import AddSubServiceModal from './pages/addSubService';

const DevicePage: React.FC<DeviceInfo> = (props) => {
  const { productID, deviceName } = props;

  const [visible, setVisible] = useState(false);
  const [selectedDeviceKeys, setSelectedDeviceKeys] = useState<Key[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DEVICE_INFO[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [productsValue, setProductsValue] = useState({});

  /** 获取子设备列表 */
  const subDeviceListTable = async ({ current, pageSize }: PageInfo) => {
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      gateWayProductID: productID,
      gateWaydeviceName: deviceName,
      page,
    };

    const res = await postApiV1ThingsDeviceGatewayIndex(_params);
    return {
      list: res.data.list || [],
      total: res.data.total || 0,
    };
  };

  const { tableProps, refresh } = useAntdTable(subDeviceListTable, {
    defaultPageSize: DefaultPage.size,
  });

  /** 获取子设备产品列表 */
  useRequest(postApiV1ThingsProductInfoIndex, {
    defaultParams: [
      {
        page: {
          size: 9999999,
          page: 1,
        },
        deviceType: 3,
      },
    ],
    onSuccess: (res) => {
      const productMap = {};
      res.data.list?.map((item) => {
        if (item.productID != undefined) {
          productMap[item.productID] = { text: item.productName };
        }
      });
      setProductsValue(productMap);
    },
    onError: (error) => {
      message.error('获取产品错误:' + error.message);
    },
  });

  /** 单元格操作 */
  const handleSelectChange = (selectedRowKeys: Key[], selectedRows: DEVICE_INFO[]) => {
    setSelectedDevice(selectedRows);
    setSelectedDeviceKeys(selectedRowKeys);
  };

  /** 解绑子设备 */
  const handleDeleteSubDevice = () => {
    const params = {
      gateWayProductID: productID,
      gateWaydeviceName: deviceName,
      list: selectedDevice.map((item) => ({
        productID: item.productID || '',
        deviceName: item.deviceName || '',
      })),
    };
    setDeleteLoading(true);
    postApiV1ThingsDeviceGatewayMultiDelete(params)
      .then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          message.success('解绑成功');
          refresh();
          setSelectedDevice([]);
          setSelectedDeviceKeys([]);
        }
      })
      .catch((error) => {
        message.error('解绑失败:' + error.message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  const handleDeleteConfirm = () => {
    Modal.confirm({
      title: '确定解绑设备？',
      icon: <ExclamationCircleOutlined />,
      content: `确定对现有勾选的设备进行解绑操作？`,
      onOk() {
        handleDeleteSubDevice();
      },
    });
  };

  const subDeviceColumns: ProColumns<DEVICE_INFO>[] = [
    {
      title: '子设备',
      dataIndex: 'deviceName',
      copyable: true,
    },
    {
      title: '所属产品名称',
      dataIndex: 'productID',
      valueEnum: productsValue,
      copyable: true,
    },
    {
      title: '所属产品ID',
      dataIndex: 'productID',
      copyable: true,
    },
    {
      title: '状态',
      dataIndex: 'isOnline',
      valueEnum: isOnlineEnum,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '激活时间',
      dataIndex: 'firstLogin',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '最后上线时间',
      dataIndex: 'lastLogin',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record: DEVICE_INFO) => (
        <a
          href={`/deviceMangers/device/detail/${record.productID}/${record.deviceName}/1`}
          target="_blank"
          rel="noreferrer"
        >
          查看
        </a>
      ),
    },
  ];

  return (
    <Card>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          添加子设备
        </Button>
        <Button
          type="primary"
          disabled={selectedDeviceKeys.length === 0}
          onClick={handleDeleteConfirm}
          loading={deleteLoading}
        >
          解绑
        </Button>
      </Space>
      <ProTable<DEVICE_INFO>
        rowKey="secret"
        toolBarRender={false}
        search={false}
        columns={subDeviceColumns}
        {...tableProps}
        rowSelection={{
          selectedRowKeys: selectedDeviceKeys,
          onChange: handleSelectChange,
          preserveSelectedRowKeys: true,
        }}
      />
      {visible && (
        <AddSubServiceModal
          setVisible={setVisible}
          visible={visible}
          refresh={refresh}
          gateWayProductID={productID}
          gateWaydeviceName={deviceName}
        />
      )}
    </Card>
  );
};

export default DevicePage;
