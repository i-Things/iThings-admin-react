import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import React, { useRef, useState } from "react";
import { IDeviceListData } from "./data";
import { queryDeviceList, removeDevice, updateDevice } from "./service";
import styles from "./style.less";
import { history } from "umi";
import DeviceOp from "./compontents/deviceop";
import { Popconfirm } from "antd";
import moment from "moment";

const valueEnum = {
  1: "关闭",
  2: "错误",
  3: "告警",
  4: "信息",
  5: "调试",
};

const IndexPage: React.FC = () => {
  const formatTime = (val: number) => {
    return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
  };

  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [deviceItem, setDeviceItem] = useState({});

  const columns: ProColumns<IDeviceListData>[] = [
    { dataIndex: "productID", title: "产品id", copyable: true },
    { dataIndex: "deviceName", title: "设备名称", hideInSearch: true },
    {
      dataIndex: "createdTime",
      title: "创建时间",
      hideInSearch: true,
      render: (val) => formatTime(val * 1000),
    },
    { dataIndex: "secret", title: "设备秘钥", hideInSearch: true },
    {
      dataIndex: "firstLogin",
      title: "激活时间",
      hideInSearch: true,
      render: (val) => formatTime(val * 1000),
    },
    {
      dataIndex: "lastLogin",
      title: "最后上线时间",
      hideInSearch: true,
      render: (val) => formatTime(val * 1000),
    },
    { dataIndex: "version", title: "固件版本", hideInSearch: true },
    {
      dataIndex: "logLevel",
      title: "日志级别",
      hideInSearch: true,
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
      title: "操作",
      key: "option",
      valueType: "option",
      render: (text, record, _, action) => [
        // TODO FIX
        <a
          key={`link${record.productID}${record.deviceName}`}
          onClick={() => {
            history.push({
              pathname:
                "/sys-device/device/schema/read/" +
                record.productID +
                "/" +
                record.deviceName,
            });
          }}
        >
          查看
        </a>,
        <a
          key={`link2${record.productID}${record.deviceName}`}
          onClick={() => {
            setDeviceItem(record);
            setVisibleEdit(true);
          }}
        >
          修改
        </a>,
        <Popconfirm
          title="确认删除吗？"
          key="delete"
          onConfirm={() => {
            const param = {
              productID: record.productID,
              deviceName: record?.deviceName,
            };
            removeDevice(param);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div className={styles.mainContain}>
      <div className={styles.global_fontTitle}>
        <span>设备列表</span>
      </div>

      <div>
        <ProTable<IDeviceListData>
          columns={columns}
          toolBarRender={false}
          rowKey={(record) => record.productID + record.deviceName}
          actionRef={actionRef}
          request={async (params) => {
            const { current, pageSize } = params;
            const param = {
              page: {
                page: current,
                size: pageSize,
              },
            };
            if (params["productID"]) {
              param["productID"] = params["productID"];
            }
            const result = await queryDeviceList(param);
            const r = {
              data: result.list,
              success: true,
              total: result.total,
            };
            return r;
          }}
        />
      </div>

      <DeviceOp
        type="edit"
        onSubmit={async (values) => {
          console.log("edit values:", values);
          let r = await updateDevice(values);
          if (r.code == 200) {
            setVisibleEdit(false);
            actionRef.current?.reloadAndRest?.();
          }
        }}
        onCancel={() => {
          setVisibleEdit(false);
        }}
        modalVisible={visibleEdit}
        values={deviceItem}
      />
    </div>
  );
};

export default IndexPage;
