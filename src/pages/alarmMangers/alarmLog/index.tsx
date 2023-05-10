import type { PageInfo } from '@/pages/deviceMangers/device/data';
import { postApiV1ThingsRuleAlarmLogIndex } from '@/services/iThingsapi/gaojingrizhi';
import { DefaultPage } from '@/utils/base';
import { timestampToDateStr } from '@/utils/date';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams, useSearchParams } from '@umijs/max';
import { useAntdTable } from 'ahooks';
import { Button, Card, Table } from 'antd';
import { useState } from 'react';
import DetailsModal from './components/DetailsModal';
import type { AlarmLogInfo } from './data';

const AlarmLog = () => {
  const params = useParams();

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  const [open, setOpen] = useState(false);
  const [lookDate, setLookData] = useState<AlarmLogInfo>();

  /** 获取告警日志列表 */
  const getLogListTable = async ({ current, pageSize }: PageInfo) => {
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      alarmRecordID: Number(params.id),
      page,
    };

    const res = await postApiV1ThingsRuleAlarmLogIndex(_params);
    return {
      list: res.data.list || [],
      total: res.data.total || 0,
    };
  };

  const { tableProps } = useAntdTable(getLogListTable, {
    defaultPageSize: DefaultPage.size,
  });

  const columns = [
    {
      title: '告警时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      render: (val: string) => timestampToDateStr(Number(val), 'YYYY-MM-DD HH:mm:ss.SSS'),
      width: 300,
    },
    {
      title: '告警名称',
      dataIndex: 'action',
      key: 'action',
      render: () => name || '-',
    },
    {
      title: '说明',
      dataIndex: 'desc',
      key: 'desc',
      render: (val: string) => val || '-',
    },
    {
      title: '操作',
      dataIndex: 'content',
      key: 'content',
      render: (_: string, record: AlarmLogInfo) => (
        <Button
          onClick={() => {
            setLookData(record);
            setOpen(true);
          }}
          type="link"
        >
          查看
        </Button>
      ),
      width: 300,
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Table size="middle" rowKey="id" columns={columns} {...tableProps} />
      </Card>
      <DetailsModal
        open={open}
        data={lookDate}
        level={Number(params.level)}
        onCancel={() => setOpen(false)}
      />
    </PageContainer>
  );
};

export default AlarmLog;
