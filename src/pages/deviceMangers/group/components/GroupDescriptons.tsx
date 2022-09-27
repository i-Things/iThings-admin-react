import useGetTableList from '@/hooks/useGetTableList';
import { postThingsGroupInfoRead } from '@/services/iThingsapi/shebeifenzu';
import { timestampToDateStr } from '@/utils/date';
import type { ParamsType } from '@ant-design/pro-components';
import { Descriptions, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'umi';
import type { GroupOption } from '../types';
import CreateOrUpdateGroup from './CreateOrUpdateGroup';
import GroupTags from './GroupTags';

const GroupDescriptons: React.FC<{ borderFlag: boolean }> = ({ borderFlag }) => {
  const params = useParams() as { id: string };
  const location = useLocation();
  const groupID = params.id ?? '';
  const { queryPage, dataList } = useGetTableList();
  const cascaderOptions = location.state;
  const [updateFlag, setUpdateFlag] = useState(false);

  type QueryProp = typeof postThingsGroupInfoRead;

  useEffect(() => {
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
              flag="update"
              key="updateGroup"
              record={dataList}
              cascaderOptions={cascaderOptions as GroupOption[]}
              setUpdateFlag={setUpdateFlag}
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
              record={dataList}
              setUpdateFlag={setUpdateFlag}
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
