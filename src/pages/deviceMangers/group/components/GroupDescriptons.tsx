import useGetTableList from '@/hooks/useGetTableList';
import { postThingsGroupInfoRead } from '@/services/iThingsapi/shebeifenzu';
import { timestampToDateStr } from '@/utils/date';
import { Descriptions, Spin } from 'antd';
import React, { useEffect } from 'react';
import CreateOrUpdateGroup from './CreateOrUpdateGroup';

const GroupDescriptons: React.FC<{ borderFlag: boolean; groupID: string }> = ({
  borderFlag,
  groupID,
}) => {
  const { queryPage, dataList } = useGetTableList();
  useEffect(() => {
    const param = { groupID };
    queryPage(postThingsGroupInfoRead, param);
  }, []);
  return (
    <Descriptions
      title="分组信息"
      bordered={borderFlag}
      extra={
        borderFlag && <CreateOrUpdateGroup flag="update" key="updateGroup" record={dataList[0]} />
      }
    >
      {dataList.length > 0 ? (
        <>
          <Descriptions.Item label="分组层级">{dataList[0]?.groupLevel}</Descriptions.Item>
          <Descriptions.Item label="分组ID">{dataList[0]?.groupID}</Descriptions.Item>
          <Descriptions.Item label="设备总数">{dataList[0]?.totalDevice}</Descriptions.Item>
          <Descriptions.Item label="激活设备">{dataList[0]?.activateDevice}</Descriptions.Item>
          <Descriptions.Item label="当前在线">{dataList[0]?.currentOnline}</Descriptions.Item>
          {borderFlag && (
            <>
              <Descriptions.Item label="创建时间">
                {timestampToDateStr(Number(dataList[0]?.createTime))}
              </Descriptions.Item>
              <Descriptions.Item label="分组描述">{dataList[0]?.remark}</Descriptions.Item>
            </>
          )}
        </>
      ) : (
        <Descriptions.Item>
          <Spin />
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default GroupDescriptons;
