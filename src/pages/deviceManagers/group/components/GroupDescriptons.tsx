import useGetTableList from '@/hooks/useGetTableList';
import { postApiV1ThingsGroupInfoRead } from '@/services/iThingsapi/shebeifenzu';
import { FlagStatus } from '@/utils/base';
import type { ParamsType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useLocation, useParams } from '@umijs/max';
import { useLatest } from 'ahooks';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import type { GroupListItem, GroupOption } from '../types';
import CreateOrUpdateGroup from './CreateOrUpdateGroup';
import GroupTags from './GroupTags';
import type { GroupDescriptonProps } from './types';

const GroupDescriptons: React.FC<{
  borderFlag: boolean;
  activeKeyChange: (key: string) => void;
  flag: 'groupInfo' | 'tagInfo';
}> = ({ borderFlag, activeKeyChange, flag }) => {
  const params = useParams() as { id: string };
  const location = useLocation();
  const groupID = params.id ?? '';
  const { queryPage, dataList, setDataList } = useGetTableList();
  const cascaderOptions = location.state ?? '';
  const [updateFlag, setUpdateFlag] = useState(false);

  const lastRecordRef = useLatest(dataList);

  type QueryProp = typeof postApiV1ThingsGroupInfoRead;

  const updateFlagHandler = () => setUpdateFlag(true);

  const groupInfoBaseColumns: ProColumns<Pick<GroupDescriptonProps, 'groupName' | 'groupID'>>[] = [
    {
      title: '分组名称',
      dataIndex: 'groupName',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '分组ID',
      dataIndex: 'groupID',
      ellipsis: true,
      copyable: true,
    },
  ];
  const groupInfoColumns: ProColumns<
    Pick<GroupDescriptonProps, 'groupName' | 'groupID' | 'createdTime' | 'desc'>
  >[] = [
    ...groupInfoBaseColumns,
    {
      title: '创建时间',
      dataIndex: 'createdTime',
    },
    {
      title: '分组描述',
      dataIndex: 'desc',
    },
  ];

  const tagInfoColumns: ProColumns<Pick<GroupDescriptonProps, 'tags'>>[] = [
    {
      title: '分组标签',
      dataIndex: 'tags',
      render: () => {
        return dataList?.tags?.map((item: { key: string; value: string }) => (
          <Tag key={item.key}>{`${item.key}:${item.value}`}</Tag>
        ));
      },
    },
  ];

  const getColumns = () => {
    if (!borderFlag && flag === 'groupInfo') return groupInfoBaseColumns;
    else if (borderFlag && flag === 'groupInfo') return groupInfoColumns;
    else return tagInfoColumns;
  };
  const getExtra = () => {
    if (!borderFlag && flag === 'groupInfo') return <></>;
    else if (borderFlag && flag === 'groupInfo')
      return (
        <CreateOrUpdateGroup
          flag={FlagStatus.UPDATE}
          key="updateGroup"
          record={lastRecordRef.current as GroupListItem}
          cascaderOptions={cascaderOptions as GroupOption[]}
          updateFlagHandler={updateFlagHandler}
        />
      );
    else
      return (
        <GroupTags
          flag={FlagStatus.UPDATE}
          key="updateGroupTags"
          record={lastRecordRef.current as GroupDescriptonProps}
          updateFlagHandler={updateFlagHandler}
        />
      );
  };

  useEffect(() => {
    activeKeyChange('1');
    setDataList(undefined);
    setUpdateFlag(false);
    const param = { groupID };
    queryPage<QueryProp, ParamsType>(postApiV1ThingsGroupInfoRead, param);
  }, [updateFlag, location]);

  return (
    <>
      <ProDescriptions<GroupDescriptonProps>
        title={flag === 'groupInfo' ? '分组信息' : '标签信息'}
        bordered={borderFlag}
        dataSource={flag === 'groupInfo' ? dataList : dataList?.tags}
        colon={false}
        columns={getColumns()}
        extra={getExtra()}
      />
    </>
  );
};

export default GroupDescriptons;
