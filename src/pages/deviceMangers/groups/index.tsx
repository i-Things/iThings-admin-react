import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import { postDeviceGroupIndex } from '@/services/iThingsapi/group';
import { postSystemUser__openAPI__delete } from '@/services/iThingsapi/yonghuguanli';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import React, { useRef } from 'react';
import { history } from 'umi';
import CreateOrUpdateGroup from './components/CreateOrUpdateGroup';
import type { GroupListItem } from './types';
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
      title: '是否删除当前分组',
      content: `所选分组: ${record?.groupName ?? '未知分组'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const columns: ProColumns<GroupListItem>[] = [
    {
      title: '分组名称',
      dataIndex: 'groupName',
    },
    {
      title: '分组ID',
      dataIndex: 'groupID',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
          <Button type="primary" onClick={() => history.push('/deviceManger/groups/details/123')}>
            查看
          </Button>
          {/* <CreateOrUpdateUser flag="update" record={record} actionRef={actionRef} /> */}
          <Divider type="vertical" />
          <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<GroupListItem>
        headerTitle="分组"
        actionRef={actionRef}
        rowKey="groupID"
        search={SEARCH_CONFIGURE}
        options={PROTABLE_OPTIONS}
        toolBarRender={() => [
          <CreateOrUpdateGroup flag="create" actionRef={actionRef} key="createGroup" />,
        ]}
        request={(params) =>
          queryPage<QueryProp, GroupListItem>(postDeviceGroupIndex, { ...params })
        }
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
      />
    </PageContainer>
  );
};

export default GroupList;
