import TimeFilter from '@/components/TimeFilter';
import { postApiV1ThingsDeviceMsgPropertyLogIndex } from '@/services/iThingsapi/shebeixiaoxi';
import { DefaultPage, getInitialTime } from '@/utils/base';
import { timestampToDateStr } from '@/utils/date';
import { CloseOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { useAntdTable } from 'ahooks';
import { Drawer, Space, Table } from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import React, { useState } from 'react';
import type { PageInfo } from '../../../data';
import styles from './index.less';

interface ModelProps {
  visible: boolean;
  dataID: string;
  handleClose: () => void;
  deviceName?: string;
  productId: string;
}

const historyColumns = [
  {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (val: string) => timestampToDateStr(Number(val)),
  },
  {
    title: '值',
    dataIndex: 'value',
    key: 'value',
    render: (val: string) => val || '-',
  },
];

const ModelDetail: React.FC<ModelProps> = (props) => {
  const { visible, dataID, handleClose, deviceName, productId } = props;

  const params = useParams() as { id: string; name: string };
  const { id = '', name = '' } = params;

  const initialTime = getInitialTime();

  const [timeRange, setTimeRange] = useState<RangePickerProps['value']>(initialTime);

  /** 获取历史记录 */
  const historyTable = async ({ current, pageSize }: PageInfo) => {
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      productID: id || productId,
      deviceNames: [deviceName || name],
      dataID,
      timeStart: timeRange?.[0]?.valueOf().toString() ?? '',
      timeEnd: timeRange?.[1]?.valueOf().toString() ?? '',
      page,
      order: 1,
    };

    const res = await postApiV1ThingsDeviceMsgPropertyLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取历史记录
  const { tableProps: historyTableProps } = useAntdTable(historyTable, {
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRange],
  });

  return (
    <>
      <Drawer
        title={dataID}
        placement="right"
        size="large"
        visible={visible}
        closable={false}
        width={800}
        onClose={handleClose}
        extra={
          <Space>
            <CloseOutlined className={styles['close-icon']} onClick={handleClose} />
          </Space>
        }
      >
        <TimeFilter onChange={(val) => setTimeRange(val)} />
        <div style={{ marginTop: 20 }}>
          <Table size="middle" rowKey="timestamp" columns={historyColumns} {...historyTableProps} />
        </div>
      </Drawer>
    </>
  );
};

export default ModelDetail;
