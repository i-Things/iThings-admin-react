import { postThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import {
  postThingsDeviceInfoCreate,
  postThingsDeviceInfoIndex,
  postThingsDeviceInfoUpdate,
  postThingsDeviceInfo__openAPI__delete,
} from '@/services/iThingsapi/shebeiguanli';
import { timestampToDateStr } from '@/utils/date';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProFormInstance } from '@ant-design/pro-components';
import { ProFormRadio, ProTable, TableDropdown } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Modal } from 'antd';

import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

const { confirm } = Modal;

/**
 * 在线状态列表
 * */
const isOnlineList: any = [
  {
    label: '离线',
    value: 1,
  },
  {
    label: '在线',
    value: 2,
  },
];

/**
 * 日志级别列表
 * */
const logLevelList: any = [
  {
    label: '关闭',
    value: 1,
  },
  {
    label: '错误',
    value: 2,
  },
  {
    label: '警告',
    value: 3,
  },
  {
    label: '信息',
    value: 4,
  },
  {
    label: '调试',
    value: 5,
  },
];

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const restFormRef = useRef<ProFormInstance>(null);
  const [modalDisabled, setModalDisabled] = useState(false);
  const [modalVisit, setModalVisit] = useState(false);
  const [opStatus, setOpStatus] = useState('0'); // 0新增 1编辑 2复制
  const [projectList, setProjectList] = useState([]);

  /**
   * 删除
   * */
  const showDeleteConfirm = (record: any) => {
    confirm({
      title: '你确定要删除该设备吗？',
      icon: <ExclamationCircleOutlined />,
      content: `该设备删除后无法恢复`,
      onOk() {
        console.log(record, '删除');
        const body = {
          productID: record.productID,
          deviceName: record.deviceName,
        };
        postThingsDeviceInfo__openAPI__delete(body).then((res) => {
          if (res.code === 200) {
            message.success('删除成功');
            actionRef.current?.reload();
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  /**
   * 编辑
   * */
  const handlerEdit = (record: any) => {
    setModalVisit(true);
    setModalDisabled(true);
    setOpStatus('1');
    restFormRef?.current?.setFieldsValue(record);
  };
  /**
   * 复制
   * */
  const handlerCopy = (record: any) => {
    setModalVisit(true);
    setOpStatus('2');
    setModalDisabled(false);
    restFormRef?.current?.setFieldsValue(record);
  };
  /**
   * 提交设备
   * */
  const createDeviceInfo = async (record: any): Promise<any> => {
    const res =
      opStatus === '1'
        ? await postThingsDeviceInfoUpdate(record)
        : await postThingsDeviceInfoCreate(record);
    if (res.code === 200) {
      message.success('提交成功');
      actionRef.current?.reload();
    }
    return true;
  };

  /**
   * 列信息
   * */
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
    },
    {
      title: '产品名称',
      dataIndex: 'projectId',
      ellipsis: true,
      render: (_: any, row: any) => {
        const find_row = projectList.find((item: any) => item.value === row.productID);
        return (find_row as any)?.label;
      },
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
      render: (text: any, record: any) => [
        <a
          key="editable"
          onClick={() => {
            handlerEdit(record);
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
            } else if (key === 'copy') {
              handlerCopy(record);
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
  /**
   * 查询数据
   * */
  const queryPage = async (params: any): Promise<any> => {
    console.log(123, params);
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
      productID: params.productID,
      deviceName: params.deviceName,
      logLevel: params.logLevel,
      isOnline: params.isOnline,
      version: params.version,
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
  /**
   * 查询数据
   * */
  const queryProjectList = async (): Promise<any> => {
    const body = {
      page: {
        size: 9999999,
        page: 1,
      },
      deviceType: 1,
    };
    const res = await postThingsProductInfoIndex(body);

    if (res instanceof Response) {
      setProjectList([]);
    }

    const list: any = [];
    res.data.list?.map((item) => {
      list.push({
        label: item.productName,
        value: item.productID,
      });
    });
    setProjectList(list);
  };

  /**
   * 监听
   * */
  useEffect(() => {
    queryProjectList();
  }, []);

  return (
    <PageContainer>
      <ProTable<any>
        rowKey="secret"
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
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setModalVisit(true);
              setOpStatus('0');
              setModalDisabled(false);
              restFormRef?.current?.setFieldsValue({
                productID: '',
                deviceName: '',
                logLevel: 1,
                tags: [],
                isOnline: 2,
              });
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />

      <ModalForm
        title="新增设备"
        visible={modalVisit}
        onFinish={createDeviceInfo}
        onVisibleChange={setModalVisit}
        formRef={restFormRef}
      >
        <ProForm.Group>
          <ProFormSelect
            width="md"
            options={projectList}
            name="productID"
            label="产品"
            disabled={modalDisabled}
            placeholder="请选择产品"
            rules={[{ required: true, message: '请选择' }]}
          />

          <ProFormText
            name="deviceName"
            label="设备名称"
            disabled={modalDisabled}
            placeholder="请输入设备名称"
            rules={[{ required: true, message: '请输入' }]}
          />
        </ProForm.Group>

        <ProFormRadio.Group name="logLevel" label="日志级别" options={logLevelList} />

        <ProFormRadio.Group width="md" name="isOnline" label="在线状态" options={isOnlineList} />
      </ModalForm>
    </PageContainer>
  );
};

export default IndexPage;
