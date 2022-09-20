import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postThingsGroupInfoIndex,
  postThingsGroupInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeifenzu';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import type { GroupListItem } from '../types';
import CreateOrUpdateGroup from './CreateOrUpdateGroup';
import GroupTags from './GroupTags';
import type { TagProps } from './types';

const GroupList: React.FC = () => {
  const { queryPage } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const [tagValues, setTagValues] = useState<{ tags: TagProps[] }>({ tags: [] });
  const actionRef = useRef<ActionType>();
  type QueryProp = typeof postThingsGroupInfoIndex;
  // 删除操作
  const showDeleteConfirm = (record: { groupID: string; groupName: string }) => {
    const body = {
      groupID: record?.groupID ?? '',
    };
    deleteHandler<{ groupID: string }>(postThingsGroupInfo__openAPI__delete, actionRef, {
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
      title: '分组标签',
      dataIndex: 'tags',
      hideInTable: true,
      renderFormItem: (_, { type }) => {
        if (type === 'form') {
          return null;
        }
        return <GroupTags flag="create" key="createGroupTags" setTagValues={setTagValues} />;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => history.push(`/deviceMangers/group/detail/${record?.groupID}`)}
          >
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
    <ProTable<GroupListItem>
      headerTitle="分组"
      actionRef={actionRef}
      rowKey="groupID"
      search={SEARCH_CONFIGURE}
      options={PROTABLE_OPTIONS}
      toolBarRender={() => [
        <CreateOrUpdateGroup flag="create" actionRef={actionRef} key="createGroup" />,
      ]}
      request={(params) => {
        return queryPage<QueryProp, GroupListItem>(postThingsGroupInfoIndex, {
          ...params,
          ...tagValues,
        });
      }}
      columns={columns}
      pagination={{ pageSize: 10 }}
      size={'middle'}
    />
  );
};

export default GroupList;
