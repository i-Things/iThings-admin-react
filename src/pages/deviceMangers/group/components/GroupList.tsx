import useGetTableList from '@/hooks/useGetTableList';
import useTableDelete from '@/hooks/useTableDelete';
import {
  postApiV1ThingsGroupInfoIndex,
  postApiV1ThingsGroupInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeifenzu';
import { FlagStatus } from '@/utils/base';
import { PROTABLE_OPTIONS, SEARCH_CONFIGURE } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { spanTree } from '@/utils/utils';
import { LightFilter } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { history } from '@umijs/max';
import { Button, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { activeKeyProps, GroupListItem } from '../types';
import CreateOrUpdateGroup from './CreateOrUpdateGroup';
import GroupTags from './GroupTags';
import type { groupSearchParmasProps } from './types';

const GroupList: React.FC<{
  flag: 'index' | 'son';
  parentID: string;
  activeKey?: activeKeyProps;
}> = ({ flag, parentID, activeKey }) => {
  const { queryPage, dataList } = useGetTableList();
  const { deleteHandler } = useTableDelete();
  const [searchParams, setSearchParams] = useState<groupSearchParmasProps>({
    tags: [],
    groupName: '',
  });

  const actionRef = useRef<ActionType | undefined>();

  type QueryProp = typeof postApiV1ThingsGroupInfoIndex;

  const indexFlag = flag === 'index';

  const cascaders = dataList?.listAll.map((item: GroupListItem) => {
    return {
      ...item,
      key: item?.groupID + '',
      label: item?.groupName,
      value: item?.groupID,
    };
  });
  const cascaderOptions = spanTree(cascaders, '1', 'parentID');
  cascaderOptions?.unshift({
    key: '1',
    label: '根节点',
    value: '1',
    createdTime: '',
    groupID: '1',
    groupName: '',
    desc: '',
    parentID: '1',
    tags: [],
  });

  // 删除操作
  const showDeleteConfirm = (record: { groupID: string; groupName: string }) => {
    const body = {
      groupID: record?.groupID,
    };
    deleteHandler<{ groupID: string }>(postApiV1ThingsGroupInfo__openAPI__delete, actionRef, {
      title: '是否删除当前分组',
      content: `所选分组: ${record?.groupName ?? '未知分组'},  删除后无法恢复，请确认`,
      body,
    });
  };

  const filterFinish = async (value: Record<string, any>) =>
    setSearchParams({ ...searchParams, groupName: value.groupName });

  const searchParamsHandler = (
    cb: groupSearchParmasProps | ((pre: groupSearchParmasProps) => groupSearchParmasProps),
  ) => setSearchParams(cb);

  const inputSearch = (value: string) => setSearchParams({ ...searchParams, groupName: value });

  const jumpToDetails = (record: GroupListItem) =>
    history.push({
      pathname: `/deviceMangers/group/detail/${record?.groupID}`,
      state: cascaderOptions,
    });

  const columns: ProColumns<GroupListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '分组名称',
      dataIndex: 'groupName',
      render: (_, record) => <a onClick={() => jumpToDetails(record)}>{_}</a>,
      copyable: true,
    },
    {
      title: '分组ID',
      dataIndex: 'groupID',
      search: false,
      copyable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
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
        return (
          <div style={{ marginTop: -16 }}>
            <GroupTags
              flag={FlagStatus.CREATE}
              key="createGroupTags"
              searchParamsHandler={searchParamsHandler}
            />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => jumpToDetails(record)}>
            查看
          </Button>
          <Button type="link" danger onClick={() => showDeleteConfirm(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (activeKey === '3') actionRef?.current?.reloadAndRest?.();
  }, [activeKey]);

  return (
    <ProTable<GroupListItem>
      bordered
      headerTitle={
        indexFlag ? (
          '分组'
        ) : (
          <LightFilter bordered onFinish={filterFinish}>
            <GroupTags
              flag={FlagStatus.CREATE}
              key="createGroupTags"
              searchParamsHandler={searchParamsHandler}
            />
            <Input.Search
              allowClear
              name="groupName"
              width="md"
              placeholder="请输入分组名称"
              onSearch={inputSearch}
            />
          </LightFilter>
        )
      }
      search={indexFlag ? SEARCH_CONFIGURE : false}
      actionRef={actionRef}
      rowKey="groupID"
      options={PROTABLE_OPTIONS}
      toolBarRender={() => [
        <CreateOrUpdateGroup
          flag={FlagStatus.CREATE}
          actionRef={actionRef}
          key="createGroup"
          cascaderOptions={cascaderOptions}
        />,
      ]}
      params={indexFlag ? undefined : searchParams}
      request={(params) =>
        queryPage<QueryProp, GroupListItem>(
          postApiV1ThingsGroupInfoIndex,
          indexFlag
            ? {
                ...params,
                parentID,
                tags: searchParams?.tags,
              }
            : { ...params, parentID },
        )
      }
      columns={columns}
      size={'middle'}
    />
  );
};

export default GroupList;
