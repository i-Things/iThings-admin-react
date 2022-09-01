import {
  postThingsDeviceInfoIndex,
  postThingsDeviceInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeiguanli';
import { timestampToDateStr } from '@/utils/date';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Modal } from 'antd';

import React, { useRef, useState } from 'react';
import { history } from 'umi';
const { confirm } = Modal;

const showDeleteConfirm = (record: any) => {
  confirm({
    title: '你确定要删除该设备吗？',
    icon: <ExclamationCircleOutlined />,
    content: `该设备删除后无法恢复`,
    onOk() {
      const body = {
        projectID: record.projectID,
        isOnline: record.isOnline,
      };
      console.log(body);
      postThingsDeviceInfo__openAPI__delete(body).then((res) => {
        if (res.code === 200) {
          message.success('删除成功');
        }
      });
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const columns: any = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '设备密钥',
    dataIndex: 'secret',
    ellipsis: true,
  },
  {
    title: '固定版本',
    dataIndex: 'version',
  },
  {
    title: '日志级别',
    dataIndex: 'logLevel',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '关闭',
        status: '1',
      },
      2: {
        text: '错误',
        status: '2',
      },
      3: {
        text: '警告',
        status: '3',
      },
      4: {
        text: '信息',
        status: '4',
      },
      5: {
        text: '调试',
        status: '5',
      },
    },
  },
  {
    title: '在线状态',
    dataIndex: 'isOnline',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '离线',
        status: '1',
      },
      2: {
        text: '在线',
        status: '2',
      },
    },
  },
  {
    title: '激活时间',
    key: 'firstLogin',
    dataIndex: 'firstLogin',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    render: (text: any) => (['0', '-'].includes(text) ? '-' : timestampToDateStr(text)),
  },
  {
    title: '最后上线时间',
    key: 'lastLogin',
    dataIndex: 'lastLogin',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    render: (text: any) => (['0', '-'].includes(text) ? '-' : timestampToDateStr(text)),
  },
  {
    title: '创建时间',
    key: 'createdTime',
    dataIndex: 'createdTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    render: (text: any) => (['0', '-'].includes(text) ? '-' : timestampToDateStr(text)),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text: any, record: any, _: any, action: any) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a
        key="view"
        onClick={() => {
          history.push('/deviceManger/device/detail/123');
        }}
      >
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          if (key === 'delete') {
            showDeleteConfirm(record);
          }
        }}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [setCreateVisible] = useState(false);

  const openCreateModal = async () => {
    // @ts-ignore
    setCreateVisible(true);
  };

  const queryPage = async (params: any): Promise<any> => {
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      // productID: '246EUXwpfVu',
      // deviceName: '',
      // tags: []
    };
    const res = await postThingsDeviceInfoIndex(body);

    if (res instanceof Response) {
      return {
        data: [],
        total: 0,
      };
    }
    return {
      data: res.data.list,
      total: res.data.total,
    };
  };

  return (
    <PageContainer>
      <ProTable<any>
        rowKey="modelID"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={queryPage}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} onClick={openCreateModal} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default IndexPage;
