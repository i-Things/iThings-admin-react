/* eslint-disable @typescript-eslint/no-unused-expressions */
import useGetSelectOptions from '@/hooks/useGetSelectOption';
import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import {
  postApiV1ThingsGroupDeviceIndex,
  postApiV1ThingsGroupDeviceMultiDelete,
} from '@/services/iThingsapi/shebeifenzu';
import { postApiV1ThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import { PROTABLE_OPTIONS } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { isOnlineEnum, selectConfirm } from '@/utils/utils';
import { LightFilter, ProFormSelect } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { history, useParams } from '@umijs/max';
import { Button, Divider, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import '../styles.less';
import type { activeKeyProps, GroupDeviceItem } from '../types';

const GroupDeviceList: React.FC<{
  flag: 'list' | 'create';
  selectedRowsHandler: (value: GroupDeviceItem[]) => void;
  actionRef: any;
  onAdd?: () => void;
  activeKey: activeKeyProps;
}> = ({ flag, onAdd, selectedRowsHandler, actionRef, activeKey }) => {
  const param = useParams() as { id: string };
  const groupID = param.id ?? '';
  const { queryPage } = useGetTableList();
  const { querySelectOptions, selectOptions } = useGetSelectOptions();
  const { deleteHandler } = useTableDelete();
  const [searchParams, setSearchParams] = useState({ productID: '', deviceName: '' });

  type QueryGroupDeviceProp = typeof postApiV1ThingsGroupDeviceIndex;
  type QueryDeviceInfoProp = typeof postApiV1ThingsDeviceInfoIndex;
  type QueryProductProp = typeof postApiV1ThingsProductInfoIndex;

  const listFlag = flag === 'list';
  // 删除操作
  const showDeleteConfirm = (record: GroupDeviceItem[]) => {
    const list: { productID?: string; deviceName?: string }[] = selectConfirm(record);
    const body = {
      groupID: groupID ?? '',
      list,
    };
    deleteHandler<{ groupID: string; list: { productID?: string; deviceName?: string }[] }>(
      postApiV1ThingsGroupDeviceMultiDelete,
      actionRef,
      {
        title: '是否从分组中删除选中设备',
        content: `所选设备, 删除后无法恢复，请确认`,
        body,
      },
    );
  };

  const filterFinish = async (value: Record<string, any>) =>
    setSearchParams({ ...searchParams, productID: value.productID });

  const inputSearch = (value: string) => setSearchParams({ ...searchParams, deviceName: value });

  const jumpToDeviceList = (record: GroupDeviceItem) =>
    history.push(`/deviceMangers/device/detail/${record?.productID}/${record.deviceName}/1`);

  const columns: ProColumns<GroupDeviceItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      render: (_, record) => <a onClick={() => jumpToDeviceList(record)}>{_}</a>,
      copyable: true,
      width: 150,
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
      renderText: (text) => selectOptions.filter((item) => item?.value === text)[0]?.label,
      width: 150,
    },
    {
      title: '在线状态',
      dataIndex: 'isOnline',
      valueEnum: isOnlineEnum,
      valueType: 'select',
      width: 100,
      // filters: true,
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
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => jumpToDeviceList(record)}>
            查看
          </Button>
          <Divider type="vertical" />
          <Button type="link" danger onClick={() => showDeleteConfirm(record)}>
            从分组中删除
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (activeKey === '2') {
      actionRef?.current?.reloadAndRest();
      querySelectOptions<QueryProductProp>(postApiV1ThingsProductInfoIndex, {
        page: { page: 1, size: 99999 },
        label: 'productName',
        value: 'productID',
      });
    }
  }, [activeKey]);

  return (
    <>
      <ProTable<GroupDeviceItem>
        bordered
        headerTitle={
          <LightFilter bordered onFinish={filterFinish}>
            <ProFormSelect
              name="productID"
              width="md"
              label="全部产品"
              placeholder="请选择产品"
              fieldProps={{
                options: selectOptions,
              }}
            />
            <Input.Search
              allowClear
              name="deviceName"
              width="md"
              placeholder="请输入设备名称"
              onSearch={inputSearch}
            />
          </LightFilter>
        }
        actionRef={actionRef}
        rowKey="secret"
        options={{ ...PROTABLE_OPTIONS }}
        search={false}
        toolBarRender={() => [
          listFlag ? (
            <Button key="primary" type="primary" onClick={onAdd}>
              添加设备到分组
            </Button>
          ) : undefined,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            selectedRowsHandler(selectedRows);
            console.log(selectedRows);
          },
        }}
        tableAlertRender={
          listFlag
            ? ({ selectedRowKeys, onCleanSelected }) => (
                <Space size={24}>
                  <span>
                    已选 {selectedRowKeys.length} 项
                    <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                      取消选择
                    </a>
                  </span>
                </Space>
              )
            : false
        }
        tableAlertOptionRender={
          listFlag
            ? ({ selectedRows }) => (
                <Space size={16}>
                  <Button
                    type="primary"
                    danger
                    onClick={async () => {
                      await showDeleteConfirm(selectedRows);
                      selectedRowsHandler([]);
                    }}
                  >
                    批量删除
                  </Button>
                </Space>
              )
            : false
        }
        params={searchParams}
        request={(params) =>
          listFlag
            ? queryPage<QueryGroupDeviceProp, GroupDeviceItem>(postApiV1ThingsGroupDeviceIndex, {
                ...params,
                groupID,
              })
            : queryPage<QueryDeviceInfoProp, GroupDeviceItem>(postApiV1ThingsDeviceInfoIndex, {
                ...params,
                groupID,
              })
        }
        columns={listFlag ? columns : columns.slice(0, columns.length - 1)}
        pagination={listFlag ? { pageSize: 10 } : false}
        size={'middle'}
      />
    </>
  );
};

export default GroupDeviceList;
