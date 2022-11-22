import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';
import { EditForm } from './components/editForm';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '功能类型',
    width: 80,
    dataIndex: 'name',
  },
  {
    title: '功能名称',
    dataIndex: 'containers',
    align: 'right',
  },
  {
    title: '标识符',
    width: 80,
    dataIndex: 'status',
  },
  {
    title: '数据类型',
    width: 80,
    dataIndex: 'creator',
  },
  {
    title: '读写类型',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
  },
  {
    title: '数据定义',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
  },
];

export default () => {
  const [modalVisit, setModalVisit] = useState(false);
  return (
    <>
      <ProTable<TableListItem>
        dataSource={tableListDataSource}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        headerTitle="自定义功能"
        toolBarRender={() => [
          <Button
            key="show"
            type="primary"
            onClick={() => {
              setModalVisit(true);
            }}
          >
            新建自定义功能
          </Button>,
        ]}
      />
      <EditForm modalVisit={modalVisit} setModalVisit={setModalVisit} />
    </>
  );
};
