import useGetTableList from '@/hooks/useGetTableList';
import { postThingsGroupInfoRead } from '@/services/iThingsapi/shebeifenzu';
import { FlagStatus } from '@/utils/base';
import { timestampToDateStr } from '@/utils/date';
import type { ParamsType } from '@ant-design/pro-components';
import { Descriptions, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'umi';
import type { GroupListItem, GroupOption } from '../types';
import CreateOrUpdateGroup from './CreateOrUpdateGroup';
import GroupTags from './GroupTags';
import type { GroupDescriptonProps } from './types';

const GroupDescriptons: React.FC<{
  borderFlag: boolean;
  activeKeyChange: (key: string) => void;
}> = ({ borderFlag, activeKeyChange }) => {
  const params = useParams() as { id: string };
  const location = useLocation();
  const groupID = params.id ?? '';
  const { queryPage, dataList, setDataList } = useGetTableList();
  const cascaderOptions = location.state ?? '';
  const [updateFlag, setUpdateFlag] = useState(false);

  type QueryProp = typeof postThingsGroupInfoRead;

  const updateFlagHandler = () => setUpdateFlag(true);

  useEffect(() => {
    activeKeyChange('1');
    setDataList(undefined);
    setUpdateFlag(false);
    const param = { groupID };
    queryPage<QueryProp, ParamsType>(postThingsGroupInfoRead, param);
  }, [updateFlag, location]);

  return (
    <>
      <Descriptions
        title={'分组信息'}
        bordered={borderFlag}
        extra={
          borderFlag && (
            <CreateOrUpdateGroup
              flag={FlagStatus.UPDATE}
              key="updateGroup"
              record={dataList as GroupListItem}
              cascaderOptions={cascaderOptions as GroupOption[]}
              updateFlagHandler={updateFlagHandler}
            />
          )
        }
      >
        {dataList ? (
          <>
            <Descriptions.Item label="分组名称">{dataList?.groupName}</Descriptions.Item>
            <Descriptions.Item label="分组ID">{dataList?.groupID}</Descriptions.Item>
            {borderFlag && (
              <>
                <Descriptions.Item label="创建时间">
                  {timestampToDateStr(Number(dataList?.createdTime))}
                </Descriptions.Item>
                <Descriptions.Item label="分组描述">{dataList?.desc}</Descriptions.Item>
              </>
            )}
          </>
        ) : (
          <Descriptions.Item>
            <Spin />
          </Descriptions.Item>
        )}
      </Descriptions>
      {borderFlag && (
        <Descriptions
          title="标签信息"
          style={{ marginTop: '20px' }}
          extra={
            <GroupTags
              flag="update"
              key="updateGroupTags"
              record={dataList as GroupDescriptonProps}
              updateFlagHandler={updateFlagHandler}
            />
          }
        >
          <Descriptions.Item label="分组标签">
            {dataList?.tags?.map((item: { key: string; value: string }) => (
              <Tag key={item.key}>{`${item.key}:${item.value}`}</Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

export default GroupDescriptons;
