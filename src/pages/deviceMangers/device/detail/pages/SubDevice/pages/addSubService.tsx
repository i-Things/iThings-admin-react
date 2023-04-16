import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import { postApiV1ThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import { postApiV1ThingsDeviceGatewayMultiCreate } from '@/services/iThingsapi/wangguanzishebeiguanli';
import { DefaultPage, ResponseCode } from '@/utils/base';
import type { DEVICE_INFO } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { isOnlineEnum } from '@/utils/utils';
import { DrawerForm } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PageInfo } from '@ant-design/pro-table/lib/typing';
import { useAntdTable, useRequest } from 'ahooks';
import { Col, message, Row, Select } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';
import type { ModalProps, SelectOption } from './data';

const AddSubServiceModal: React.FC<ModalProps> = (props) => {
  const { visible, gateWayProductID, gateWaydeviceName, refresh, setVisible } = props;

  const [produceListOption, setProductListOption] = useState<SelectOption[]>();
  const [productID, setProductID] = useState('');
  const [selectedDeviceKeys, setSelectedDeviceKeys] = useState<Key[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DEVICE_INFO[]>([]);

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
    onSuccess: (result) => {
      setProductID(result.data.list?.[0].productID || '');
      setProductListOption(() =>
        result.data?.list?.map((item) => ({
          label: item.productName || '',
          value: item.productID || '',
        })),
      );
    },
    onError: (error) => {
      message.error('获取产品错误:' + error.message);
    },
  });

  /** 获取子设备列表 */
  const subDeviceListTable = async ({ current, pageSize }: PageInfo) => {
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      productID,
      page,
    };

    const res = await postApiV1ThingsDeviceInfoIndex(_params);
    return {
      list: res.data.list || [],
      total: res.data.total || 0,
    };
  };

  const { tableProps } = useAntdTable(subDeviceListTable, {
    defaultPageSize: DefaultPage.size,
    refreshDeps: [productID],
  });

  /** 切换产品选择 */
  const handleSelectProduct = (val: string) => {
    setProductID(val);
    setSelectedDeviceKeys([]);
    setSelectedDevice([]);
  };

  /** 添加设备 */
  const onFinish = async () => {
    if (selectedDeviceKeys.length === 0) {
      message.warning('请选择设备');
      return false;
    }
    const params = {
      gateWayProductID,
      gateWaydeviceName,
      list: selectedDevice.map((item) => ({ productID, deviceName: item.deviceName || '' })),
    };
    try {
      const res = await postApiV1ThingsDeviceGatewayMultiCreate(params);
      if (res.code === ResponseCode.SUCCESS) {
        message.success('添加成功');
        refresh();
      }
      return true;
    } catch (error) {
      message.error('添加失败:' + (error as Error).message);
      return false;
    }
  };

  /** 选择子设备 */
  const handleCheckDevice = (selectedRowKeys: Key[], selectedRows: DEVICE_INFO[]) => {
    setSelectedDevice(selectedRows);
    setSelectedDeviceKeys(selectedRowKeys);
  };

  const deviceColumns: ProColumns<DEVICE_INFO>[] = [
    {
      title: '子设备',
      dataIndex: 'deviceName',
      copyable: true,
    },
    {
      title: '所属产品名称',
      dataIndex: 'productID',
      renderText: (text: string) =>
        produceListOption?.filter((item) => item.value === text)?.[0]?.label,
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
    <DrawerForm
      title="添加子设备"
      open={visible}
      onOpenChange={setVisible}
      width={1000}
      onFinish={onFinish}
    >
      <Row align="middle" gutter={16}>
        <Col>产品</Col>
        <Col>
          <Select
            placeholder="请选择产品"
            options={produceListOption}
            style={{ width: '200px' }}
            onSelect={handleSelectProduct}
            value={productID}
          />
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <ProTable
          rowKey="secret"
          toolBarRender={false}
          search={false}
          columns={deviceColumns}
          {...tableProps}
          rowSelection={{
            selectedRowKeys: selectedDeviceKeys,
            onChange: handleCheckDevice,
            preserveSelectedRowKeys: true,
          }}
        />
      </div>
    </DrawerForm>
  );
};

export default AddSubServiceModal;
