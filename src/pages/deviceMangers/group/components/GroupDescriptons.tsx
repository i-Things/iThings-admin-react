import useGetTableList from '@/hooks/useGetTableList';
import { postThingsGroupInfoRead } from '@/services/iThingsapi/shebeifenzu';
import { timestampToDateStr } from '@/utils/date';
import type { ParamsType } from '@ant-design/pro-components';
import { Descriptions, Spin, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'umi';
import CreateOrUpdateGroup from './CreateOrUpdateGroup';
import GroupTags from './GroupTags';
const GroupDescriptons: React.FC<{ borderFlag: boolean }> = ({ borderFlag }) => {
  const params = useParams() as { id: string };
  const groupID = params.id ?? '';
  const { queryPage, dataList } = useGetTableList();
  type QueryProp = typeof postThingsGroupInfoRead;

  useEffect(() => {
    const param = { groupID };
    queryPage<QueryProp, ParamsType>(postThingsGroupInfoRead, param);
  }, []);

  return (
    <>
      <Descriptions
        title="分组信息"
        bordered={borderFlag}
        extra={
          borderFlag && <CreateOrUpdateGroup flag="update" key="updateGroup" record={dataList} />
        }
      >
        {dataList ? (
          <>
            <Descriptions.Item label="分组层级">{dataList?.groupLevel}</Descriptions.Item>
            <Descriptions.Item label="分组ID">{dataList?.groupID}</Descriptions.Item>
            <Descriptions.Item label="设备总数">{dataList?.totalDevice}</Descriptions.Item>
            <Descriptions.Item label="激活设备">{dataList?.activateDevice}</Descriptions.Item>
            <Descriptions.Item label="当前在线">{dataList?.currentOnline}</Descriptions.Item>
            {borderFlag && (
              <>
                <Descriptions.Item label="创建时间">
                  {timestampToDateStr(Number(dataList?.createTime))}
                </Descriptions.Item>
                <Descriptions.Item label="分组描述">{dataList?.description}</Descriptions.Item>
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
          extra={<GroupTags flag="update" key="updateGroupTags" record={dataList} />}
        >
          <Descriptions.Item label="分组标签">
            {dataList?.tags.map((item: { key: string; value: string }) => (
              <Tag key={item.key}>{`${item.key}:${item.value}`}</Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

export default GroupDescriptons;
