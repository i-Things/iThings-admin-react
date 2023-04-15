import { postApiV1ThingsRuleAlarmDealRecordIndex } from '@/services/iThingsapi/chulijilu';
import { timestampToDateStr } from '@/utils/date';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import type { FC } from 'react';
import type { HandleListInfo } from '../../data';

interface HandleRecordProps {
  open: boolean;
  id?: number;
  onCancel: () => void;
}

type queryParam = {
  pageSize: number;
  current: number;
};

const columns: ProColumns<HandleListInfo>[] = [
  {
    title: '处理时间',
    dataIndex: 'createdTime',
    render: (_, record) =>
      timestampToDateStr(Number(record.createdTime), 'YYYY-MM-DD HH:mm:ss.SSS'),
    width: 300,
  },
  {
    title: '处理类型',
    dataIndex: 'type',
    valueEnum: {
      1: { text: '人工' },
      2: { text: '系统' },
    },
    width: 300,
  },
  {
    title: '告警时间',
    dataIndex: 'alarmTime',
    render: (_, record) => timestampToDateStr(Number(record.alarmTime), 'YYYY-MM-DD HH:mm:ss.SSS'),
    width: 300,
  },
  {
    title: '处理结果',
    dataIndex: 'result',
    width: 300,
  },
];

const HandleRecordModal: FC<HandleRecordProps> = (props) => {
  const { open, id, onCancel } = props;

  const queryList = async (
    params: Partial<queryParam>,
  ): Promise<{ data?: HandleListInfo[]; total?: number }> => {
    const param = {
      alarmRecordID: Number(id),
      page: {
        size: params.pageSize,
        page: params.current,
      },
    };
    const res = await postApiV1ThingsRuleAlarmDealRecordIndex(param);
    if (res instanceof Response) {
      return {
        data: [],
        total: 0,
      };
    }

    return {
      data: res?.data?.list,
      total: res?.data?.total,
    };
  };

  return (
    <Modal open={open} onCancel={onCancel} title="处理记录" width={1000}>
      <ProTable<HandleListInfo>
        rowKey="id"
        search={false}
        columns={columns}
        pagination={{
          showQuickJumper: true,
        }}
        dateFormatter="string"
        request={queryList}
      />
    </Modal>
  );
};

export default HandleRecordModal;
