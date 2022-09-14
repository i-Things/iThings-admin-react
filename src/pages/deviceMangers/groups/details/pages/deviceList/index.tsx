import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import type { postDeviceGroupIndex } from '@/services/iThingsapi/group';
import { postThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import { postSystemUser__openAPI__delete } from '@/services/iThingsapi/yonghuguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import React, { useRef } from 'react';
import { history } from 'umi';
const GroupList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const actionRef = useRef<ActionType>();
  type QueryProp = typeof postDeviceGroupIndex;
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

  const columns: ProColumns<any>[] = [
    {
      title: '设备名称/备注名称',
      dataIndex: 'deviceName',
    },
    {
      title: '设备所属产品ID',
      dataIndex: 'deviceID',
      search: false,
    },
    {
      title: '节点类型',
      dataIndex: 'nodeType',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
    },
    {
      title: '最后上线时间',
      dataIndex: 'lastLogin',
      valueType: 'dateTime',
      search: false,
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
    <ProTable<any>
      // headerTitle="设备列表"
      actionRef={actionRef}
      rowKey="deviceID"
      search={SEARCH_CONFIGURE}
      options={PROTABLE_OPTIONS}
      toolBarRender={() => [
        // <CreateOrUpdateGroup flag="create" actionRef={actionRef} key="createGroup" />,
      ]}
      request={(params) => queryPage<QueryProp, any>(postThingsDeviceInfoIndex, { ...params })}
      columns={columns}
      pagination={{ pageSize: 10 }}
      size={'middle'}
    />
  );
};

export default GroupList;
