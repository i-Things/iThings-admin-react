/* eslint-disable @typescript-eslint/no-unused-expressions */
import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postThingsGroupDeviceIndex,
  postThingsGroupInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeifenzu';
import { postSystemUser__openAPI__delete } from '@/services/iThingsapi/yonghuguanli';
import { PROTABLE_OPTIONS } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { LightFilter, ProFormSelect } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Input, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import type { GroupDeviceItem } from '../types';

const GroupDeviceList: React.FC<{
  flag: string;
  onAdd?: () => void;
}> = ({ flag, onAdd }) => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [searchParams, setSearchParams] = useState({ productID: '', deviceName: '' });

  const actionRef = useRef<ActionType>();
  type QueryProp = typeof postThingsGroupDeviceIndex;
  // 删除操作
  const showDeleteConfirm = (record: { groupID: string; deviceName: string }) => {
    const body = {
      groupID: record?.groupID ?? '',
    };
    deleteHandler<{ groupID: string }>(postThingsGroupInfo__openAPI__delete, actionRef, {
      title: '是否从分组中删除当前设备',
      content: `所选设备: ${record?.deviceName ?? '未知设备'},  删除后无法恢复，请确认`,
      body,
    });
  };

  // /**
  //  *  批量删除节点
  //  * @param selectedRows
  //  */
  const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await postSystemUser__openAPI__delete({
        ids: selectedRows.map((row) => row.id),
      });
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const PRODUCT_TYPE_OPTION = [
    { label: '全部产品', value: 1 },
    { label: 'test001', value: 2 },
  ];

  // enum FlagStatus  {
  //   LIST = 'list',
  //   CREATE = 'create'
  // }

  const columns: ProColumns<GroupDeviceItem>[] = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '设备所属产品',
      dataIndex: 'productID',
    },
    {
      title: '设备秘钥',
      dataIndex: 'secret',
    },
    {
      title: '固件版本',
      dataIndex: 'version',
    },
    {
      title: '设备证书',
      dataIndex: 'cert',
    },

    {
      title: '状态',
      dataIndex: 'isOnline',
      valueEnum: {
        2: {
          text: '在线',
          status: 'Success',
        },
        1: { text: '离线', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '激活时间',
      dataIndex: 'firstLogin',
      valueType: 'dateTime',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '组合上线时间',
      dataIndex: 'lastLogin',
      valueType: 'dateTime',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // TODO: 删除传递groupID
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => history.push(`/deviceMangers/devices/details/${record.productID}`)}
          >
            查看
          </Button>
          {/* <CreateOrUpdateUser flag="update" record={record} actionRef={actionRef} /> */}
          <Divider type="vertical" />
          <Button type="primary" danger onClick={() => showDeleteConfirm(record?.productID)}>
            从分组中删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<any>
        // TODO: ProFormSelect获取产品列表接口拿到option
        headerTitle={
          <>
            <LightFilter
              bordered
              onFinish={async (value) =>
                setSearchParams({ ...searchParams, productID: value.productID })
              }
            >
              <ProFormSelect
                name="productID"
                width="md"
                label="设备所属产品"
                placeholder="请选择产品"
                request={async () => PRODUCT_TYPE_OPTION}
              />
              <Input.Search
                allowClear
                name="deviceName"
                width="md"
                placeholder="请输入设备名称"
                onSearch={(value) => setSearchParams({ ...searchParams, deviceName: value })}
              />
            </LightFilter>
          </>
        }
        actionRef={actionRef}
        rowKey="deviceName"
        options={{ ...PROTABLE_OPTIONS }}
        search={false}
        toolBarRender={() => [
          flag === 'list' ? (
            <Button key="primary" type="primary" onClick={onAdd}>
              添加设备到分组
            </Button>
          ) : (
            <></>
          ),
        ]}
        rowSelection={{}}
        tableAlertRender={
          flag === 'list'
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
          flag === 'list'
            ? () => (
                <Space size={16}>
                  <Button
                    type="primary"
                    danger
                    onClick={async () => {
                      await handleRemove(selectedRowsState);
                      setSelectedRows([]);
                      actionRef.current?.reloadAndRest?.();
                    }}
                  >
                    批量删除
                  </Button>
                </Space>
              )
            : false
        }
        params={searchParams}
        request={(params) => queryPage<QueryProp, any>(postThingsGroupDeviceIndex, { ...params })}
        columns={flag === 'list' ? columns : columns.slice(0, columns.length - 1)}
        pagination={flag === 'list' ? { pageSize: 10 } : false}
        size={'middle'}
      />
    </>
  );
};

export default GroupDeviceList;
