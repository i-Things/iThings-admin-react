import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";
import { Button, Popconfirm } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { history } from "umi";
import { queryDeviceList } from "./service";
import styles from "./style.less";

const IndexPage: React.FC = () => {
  const [isInit, setisInit] = useState(false);
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    setisInit(true);
  }, []);

  const handleDelete = (deviceId: string) => {
    console.log(deviceId);
  };

  const columns: ProColumns<IDeviceMsg>[] = [
    {
      // dataIndex: "deviceName",
      title: "设备名称",
      valueType: "option",
      render: (text, record, _, action) => [
        <a
          style={{ textAlign: "center" }}
          onClick={() => {
            history.push({
              pathname:
                "/device-maneger/detail/" +
                record.productID +
                "/" +
                record.deviceName,
            });
          }}
        >
          {record.deviceName}
        </a>,
      ],
    },
    {
      dataIndex: "secret",
      title: "设备秘钥",
    },
    {
      dataIndex: "version",
      title: "固件版本",
    },
    {
      dataIndex: "logLevel",
      title: "日志级别",
    },
    {
      dataIndex: "firstLogin",
      title: "激活时间",
    },
    {
      dataIndex: "lastLogin",
      title: "最后上线时间",
    },
    {
      dataIndex: "createdTime",
      title: "创建时间",
    },
    {
      title: "操作",
      valueType: "option",
      render: (text, record, _, action) => [
        <a key="update">更新</a>,
        <Popconfirm
          title="确认删除吗？"
          key="delete"
          onConfirm={() => {
            handleDelete(record.productID);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div className={styles.lineButton}>
        <Button type="primary">查询</Button>
        <Button type="primary">新增</Button>
      </div>

      {isInit && (
        <ProTable<IDeviceMsg>
          rowKey="productID"
          columns={columns}
          toolBarRender={false}
          actionRef={actionRef}
          search={false}
          request={async (params) => {
            const { current, pageSize } = params;
            const result = await queryDeviceList({
              page: current,
              size: pageSize,
            });
            const r = { data: result.data, success: true, total: result.total };
            console.log(r);
            return r;
          }}
        ></ProTable>
      )}
    </PageContainer>
  );
};

export default IndexPage;
