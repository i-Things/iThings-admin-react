import ProTable, { ProColumns } from "@ant-design/pro-table";
import moment from "moment";
import React from "react";
import styles from "./style.less";

const data: IGateWayData[] = [];
for (let i = 0; i < 50; i++) {
  const temp: IGateWayData = {
    id: String(i),
    collectorID: "采集器" + String(i),
    collectorName: "采集器名字" + String(i),
    collectorModle: "采集器型号" + String(i),
    deviceName: "设备名称" + String(i),
    gateway: "所属网关" + String(i),
    responsible: "负责人" + String(i),
    phone: "联系电话" + String(i),
    createdTime: moment().valueOf(),
  };
  data.push(temp);
}

const IndexPage: React.FC = () => {
  const formatTime = (val: number) => {
    return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
  };

  const columns: ProColumns<IGateWayData>[] = [
    { dataIndex: "collectorID", title: "采集器虚拟ID", hideInSearch: true },
    { dataIndex: "collectorName", title: "采集器名字", hideInSearch: true },
    { dataIndex: "collectorModle", title: "采集器型号", hideInSearch: true },
    { dataIndex: "deviceName", title: "设备名称", hideInSearch: true },
    { dataIndex: "gateway", title: "所属网关", hideInSearch: true },
    { dataIndex: "responsible", title: "负责人", hideInSearch: true },
    { dataIndex: "phone", title: "联系电话", hideInSearch: true },
    {
      dataIndex: "createdTime",
      title: "创建时间",
      hideInSearch: true,
      render: (val) => formatTime(val),
    },
  ];

  return (
    <div className={styles.mainContain}>
      <div className={styles.global_fontTitle}>
        <span>网关列表</span>
      </div>
      <ProTable<IGateWayData>
        columns={columns}
        dataSource={data}
        toolBarRender={false}
        search={false}
        rowKey={(record) => record.collectorID}
        pagination={{ pageSize: 15 }}
      ></ProTable>
    </div>
  );
};

export default IndexPage;
