/* eslint-disable @typescript-eslint/no-unused-expressions */
import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import { postThingsGroupDeviceIndex } from '@/services/iThingsapi/shebeifenzu';
import { postSystemUser__openAPI__delete } from '@/services/iThingsapi/yonghuguanli';
import { PROTABLE_OPTIONS } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { LightFilter, ProFormSelect } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Input, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';

const { Search } = Input;

const GroupList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [searchParams, setSearchParams] = useState({ productID: '', deviceName: '' });

  const actionRef = useRef<ActionType>();
  type QueryProp = typeof postThingsGroupDeviceIndex;
  // 删除操作
  const showDeleteConfirm = (record: { uid: string; groupName: string }) => {
    const body = {
      uid: record?.uid ?? '',
    };
    deleteHandler<{ uid: string }>(postSystemUser__openAPI__delete, actionRef, {
      title: '是否从分组中删除当前设备',
      content: `所选设备: ${record?.groupName ?? '未知设备'},  删除后无法恢复，请确认`,
      body,
    });
  };

  /**
   *  批量删除节点
   * @param selectedRows
   */
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

  const columns: ProColumns<any>[] = [
    {
      title: '设备名称/备注名称',
      dataIndex: 'deviceName',
    },
    {
      title: '设备所属产品ID',
      dataIndex: 'deviceID',
    },
    {
      title: '节点类型',
      dataIndex: 'nodeType',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '最后上线时间',
      dataIndex: 'lastLogin',
      valueType: 'dateTime',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => history.push(`/deviceMangers/devices/details/${record.deviceID}`)}
          >
            查看
          </Button>
          {/* <CreateOrUpdateUser flag="update" record={record} actionRef={actionRef} /> */}
          <Divider type="vertical" />
          <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>
            从分组中删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<any>
        headerTitle={
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              alert('add');
            }}
          >
            添加设备到分组
          </Button>
        }
        actionRef={actionRef}
        rowKey="deviceName"
        options={{ ...PROTABLE_OPTIONS, search: true }}
        search={false}
        // TODO: 获取产品列表接口拿到option
        toolbar={{
          filter: (
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
            </LightFilter>
          ),
          search: (
            <Search
              name="deviceName"
              width="md"
              placeholder="请输入设备名称"
              onSearch={(value) => setSearchParams({ ...searchParams, deviceName: value })}
            />
          ),
        }}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
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
          );
        }}
        params={searchParams}
        request={(params) => queryPage<QueryProp, any>(postThingsGroupDeviceIndex, { ...params })}
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
      />
    </>
  );
};

export default GroupList;
