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
import React, { useRef, useState } from 'react';
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
  const [modalVisit, setModalVisit] = useState(false);
  const [initialValues, setInitialValues] = useState({
    productID: '',
    deviceName: '',
    createdTime: '',
    secret: '',
    firstLogin: '',
    lastLogin: '',
    version: '',
    logLevel: 1,
    tags: [],
    isOnline: 2,
    is_copy: false,
  });

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
          projectID: record.productID,
          isOnline: record.isOnline,
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
    console.log('编辑', record);
    restFormRef.current?.resetFields();
    setInitialValues(record);
    setModalVisit(true);
  };
  /**
   * 编辑
   * */
  const handlerCopy = (record: any) => {
    console.log('复制', record);
    restFormRef.current?.resetFields();
    setInitialValues({ ...record, is_copy: true });
    setModalVisit(true);
  };
  /**
   * 提交设备
   * */
  const createDeviceInfo = async (record: any): Promise<any> => {
    console.log('新增设备', initialValues, record);
    const res =
      initialValues.secret && !initialValues.is_copy
        ? await postThingsDeviceInfoUpdate({ ...initialValues, ...record })
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
      return [];
    }

    const list: any = [];
    res.data.list?.map((item) => {
      list.push({
        label: item.productName,
        value: item.productID,
      });
    });
    return list;
  };

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
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              restFormRef.current?.resetFields();
              setInitialValues({
                productID: '',
                deviceName: '',
                createdTime: '',
                secret: '',
                firstLogin: '',
                lastLogin: '',
                version: '',
                logLevel: 1,
                tags: [],
                isOnline: 2,
                is_copy: false,
              });
              setModalVisit(true);
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
        initialValues={initialValues}
        formRef={restFormRef}
      >
        <ProForm.Group>
          <ProFormSelect
            width="md"
            request={queryProjectList}
            name="productID"
            label="产品"
            placeholder="请选择产品"
            rules={[{ required: true, message: '请选择' }]}
          />

          <ProFormText
            name="deviceName"
            label="设备名称"
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
