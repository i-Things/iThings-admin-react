import ProDescriptions, {
  ProDescriptionsActionType,
  ProDescriptionsItemProps,
} from "@ant-design/pro-descriptions";
import ProTable from "@ant-design/pro-table";
import React, { useRef } from "react";
import { IDeviceListData, ITags } from "../../index/data";
import { queryDeviceInfo } from "./service";
import styles from "./style.less";

const IndexPage: React.FC = (props: any) => {
  const columns: ProDescriptionsItemProps<IDeviceListData>[] = [
    { dataIndex: "productID", title: "产品id" },
    { dataIndex: "deviceName", title: "设备名称" },
    { dataIndex: "createdTime", title: "创建时间" },
    { dataIndex: "secret", title: "设备秘钥" },
    { dataIndex: "firstLogin", title: "激活时间" },
    { dataIndex: "lastLogin", title: "最后上线时间" },
    { dataIndex: "version", title: "固件版本" },
    {
      dataIndex: "logLevel",
      title: "日志级别",
      valueEnum: {
        0: { text: "关闭" },
        1: { text: "关闭" },
        2: { text: "错误" },
        3: { text: "告警" },
        4: { text: "信息" },
        5: { text: "调试" },
      },
    },
    {
      dataIndex: "tags",
      title: "tags",
      render: (dom, entity, index, action) => {
        return (
          <ProTable<ITags>
            dataSource={entity.tags}
            toolBarRender={false}
            search={false}
            columns={[
              { dataIndex: "key", title: "key" },
              { dataIndex: "value", title: "value" },
            ]}
            pagination={false}
          />
        );
      },
    },
  ];

  const { id, name } = props.match.params;
  console.log(id, name);
  const actionRef = useRef<ProDescriptionsActionType>();

  return (
    <div className={styles.mainContain}>
      <div className={styles.global_moduleFontTitle}>
        <span>设备模型</span>
      </div>
      <div className={styles.infoContain}>
        <ProDescriptions<IDeviceListData>
          actionRef={actionRef}
          bordered
          columns={columns}
          column={2}
          request={async () => {
            const param = { productID: id, deviceName: name };
            const data: IDeviceListData = await queryDeviceInfo(param);
            console.log(data);
            return {
              success: true,
              data: data,
            };
          }}
        ></ProDescriptions>
      </div>
    </div>
  );
};

export default IndexPage;
