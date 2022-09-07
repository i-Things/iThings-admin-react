import {
  postThingsDeviceMsgHubLogIndex,
  postThingsDeviceMsgSchemaLatestIndex,
} from '@/services/iThingsapi/shebeixiaoxi';
import type { RadioChangeEvent } from 'antd';
import { DatePicker, Form, Input, Radio, Select, Space, Switch, Table } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { useEffect, useState } from 'react';
import type { attrType, logParamsType, modelType, onoffType } from './data';
const { Search } = Input;
const { Option, OptGroup } = Select;

const eventTypeData = [
  { id: 0, name: '全部事件类型' },
  { id: 1, name: '告警' },
  { id: 2, name: '故障' },
  { id: 3, name: '信息' },
];
const timeTypeData = [
  { id: 0, name: '30分钟' },
  { id: 1, name: '1小时' },
  { id: 2, name: '今天' },
  { id: 3, name: '昨天' },
  { id: 4, name: '近7天' },
];
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const DevicePage: React.FC = () => {
  const [logType, setLogType] = useState<string>('model');
  const [modelTypeLog, setModelTypeLog] = useState<string>('property');
  const [isRefresh, setRefresh] = useState<boolean>(false);
  const [eventType, setEventType] = useState<string>('0');
  const [timeType, setTimeType] = useState<number>(0);
  const [timeRange, setTimeRange] = useState<RangePickerProps['value']>([
    moment(moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm')),
    moment(),
  ]);
  const [attrKeys, setAttrKeys] = useState<string>('');
  const [behaviorKeys, setBehaviorKeys] = useState<string>('');

  // 表格数据
  const [modelData, setModelData] = useState<attrType[]>([]);
  const [onoffData, setOnOffData] = useState<onoffType[]>([]);
  const [contentData, setContentData] = useState<onoffType[]>([]);

  const dataSource: any[] = [];

  // 获取物模型属性日志
  const fetchModelData = async () => {
    const body: modelType = {
      productID: '24EGnrP01ig',
      deviceName: 'test5',
      method: modelTypeLog,
    };
    if (attrKeys) {
      body.dataID = [attrKeys];
    }
    postThingsDeviceMsgSchemaLatestIndex(body).then((res) => {
      setModelData(res?.data?.list ?? []);
    });
  };

  // 获取上下线日志
  const fetchOnOffData = async () => {
    const body: logParamsType = {
      productID: '24EGnrP01ig',
      deviceName: 'test5',
      actions: ['connected', 'disconnected'],
      timeStart: moment(timeRange[0]).valueOf() + '',
      timeEnd: moment(timeRange[1]).valueOf() + '',
      page: {
        page: 1,
        size: 20,
      },
    };
    postThingsDeviceMsgHubLogIndex(body).then((res) => {
      setOnOffData(res?.data?.list ?? []);
    });
  };

  // 获取内容日志
  const fetchContentData = async () => {
    const body: logParamsType = {
      productID: '24EGnrP01ig',
      deviceName: 'test5',
      actions: ['property', 'event', 'action'],
      timeStart: moment(timeRange[0]).valueOf() + '',
      timeEnd: moment(timeRange[1]).valueOf() + '',
      page: {
        page: 1,
        size: 20,
      },
    };
    postThingsDeviceMsgHubLogIndex(body).then((res) => {
      setContentData(res?.data?.list ?? []);
    });
  };

  // 设置时间范围
  const resetTimeRange = (value: number) => {
    let startTime: string = '';
    let endTime: string = moment().format('YYYY-MM-DD HH:mm');
    switch (value) {
      case 0:
        startTime = moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm');
        break;
      case 1:
        startTime = moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm');
        break;
      case 2:
        startTime = moment().format('YYYY-MM-DD') + ' 00: 00';
        endTime = moment().format('YYYY-MM-DD') + ' 23: 59';
        break;
      case 3:
        startTime = moment().add(-1, 'd').format('YYYY-MM-DD') + ' 00: 00';
        endTime = moment().add(-1, 'd').format('YYYY-MM-DD') + ' 23: 59';
        break;
      case 4:
        startTime = moment().add(-6, 'd').format('YYYY-MM-DD') + ' 00: 00';
        endTime = moment().format('YYYY-MM-DD') + ' 23: 59';
        break;
    }
    setTimeRange([moment(startTime), moment(endTime)]);
  };

  const logTypeChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setLogType(value);
    setTimeType(0);
    resetTimeRange(0);
    if (value === 'model') {
      fetchModelData();
    } else if (value === 'onoffline') {
      fetchOnOffData();
    } else {
      fetchContentData();
    }
  };
  const modelTypeLogChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setModelTypeLog(value);
    setTimeType(0);
    resetTimeRange(0);
    setAttrKeys('');
    setBehaviorKeys('');
    setEventType('0');
    console.log('fqq', value, modelTypeLog);
  };
  const refreshChange = (checked: boolean) => {
    console.log(checked, isRefresh);
    setRefresh(checked);
  };
  const attrSearch = (value: string) => {
    setAttrKeys(value);
  };
  const behaivorSearch = (value: string) => {
    setBehaviorKeys(value);
    console.log(behaviorKeys);
  };
  const handleEventChange = (value: string) => {
    setEventType(value);
  };

  const timeTypeLogChange = (e: RadioChangeEvent) => {
    const value: number = e.target.value;
    setTimeType(value);
    resetTimeRange(value);
    if (logType === 'onoffline') {
      fetchOnOffData();
    } else if (logType === 'content') {
      fetchContentData();
    }
  };

  const timeRangeChange = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    setTimeType(-1);
    setTimeRange(value);
    if (logType === 'onoffline') {
      fetchOnOffData();
    } else if (logType === 'content') {
      fetchContentData();
    }
  };

  const handleLogTypeChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const disabledRangeDate = (current: any) => {
    return current > moment() || current < moment().add(-7, 'd');
  };

  const attrColumns = [
    {
      title: '数据ID',
      dataIndex: 'dataID',
      key: 'dataID',
      render: (val: string) => val || '-',
    },
    {
      title: '发送的参数',
      dataIndex: 'sendValue',
      key: 'sendValue',
      render: (val: string) => val || '-',
    },
    {
      title: '事件类型',
      dataIndex: 'type',
      key: 'type',
      render: (val: string) => val || '-',
    },
    {
      title: '最新值',
      dataIndex: 'getValue',
      key: 'getValue',
      render: (val: string) => val || '-',
    },
    {
      title: '发生时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (val: string) => {
        if (val === '0') {
          return val;
        } else {
          return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss.SSS') || '-';
        }
      },
    },
  ];
  const eventColumns = [
    {
      title: '时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '日志类型',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '事件信息',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const behaivorColumns = [
    {
      title: '行为名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '行为标识符',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '调用时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '输入参数',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '输出参数',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const contentColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (val: string) => {
        if (val === '0') {
          return val;
        } else {
          return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss.SSS') || '-';
        }
      },
    },
    {
      title: '操作类型',
      dataIndex: 'action',
      key: 'action',
      render: (val: string) => val || '-',
    },
    {
      title: '请求ID',
      dataIndex: 'requestID',
      key: 'requestID',
      render: (val: string) => val || '-',
    },
    {
      title: '主题',
      dataIndex: 'topic',
      key: 'topic',
      render: (val: string) => val || '-',
    },
    {
      title: '详细信息',
      dataIndex: 'content',
      key: 'content',
      render: (val: string) => val || '-',
    },
    {
      title: '请求结果状态',
      dataIndex: 'resultType',
      key: 'resultType',
      render: (val: string) => val || '-',
    },
  ];
  const onofflineColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (val: string) => {
        if (val === '0') {
          return val;
        } else {
          return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss.SSS') || '-';
        }
      },
    },
    {
      title: '操作类型',
      dataIndex: 'action',
      key: 'action',
      render: (val: string) => val || '-',
    },
    {
      title: '请求ID',
      dataIndex: 'requestID',
      key: 'requestID',
      render: (val: string) => val || '-',
    },
    {
      title: '详细信息',
      dataIndex: 'content',
      key: 'content',
      render: (val: string) => val || '-',
    },
    {
      title: '请求结果状态',
      dataIndex: 'resultType',
      key: 'resultType',
      render: (val: string) => val || '-',
    },
  ];

  useEffect(() => {
    if (modelTypeLog === 'property') {
      fetchModelData();
    }
  }, [modelTypeLog, attrKeys]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Radio.Group value={logType} onChange={logTypeChange}>
          <Radio.Button value="model">物模型日志</Radio.Button>
          <Radio.Button value="content">内容日志</Radio.Button>
          <Radio.Button value="onoffline">上下线日志</Radio.Button>
        </Radio.Group>
        <div style={{ marginLeft: 50 }}>
          <Switch onChange={refreshChange} />
          <span style={{ paddingLeft: 10 }}>自动刷新</span>
        </div>
      </Space>
      {logType == 'model' ? (
        <div>
          <Radio.Group value={modelTypeLog} onChange={modelTypeLogChange} style={{ marginTop: 30 }}>
            <Radio.Button value="property">属性</Radio.Button>
            <Radio.Button value="event">事件</Radio.Button>
            <Radio.Button value="action">行为</Radio.Button>
          </Radio.Group>
        </div>
      ) : (
        ''
      )}
      {logType == 'model' && modelTypeLog == 'property' ? (
        <div>
          <Search
            placeholder="属性名称/属性标识符"
            onSearch={attrSearch}
            style={{ width: 200, marginBottom: 20, marginTop: 20 }}
            allowClear
          />
          <Table pagination={false} size="middle" dataSource={modelData} columns={attrColumns} />
        </div>
      ) : (
        ''
      )}
      <div>
        {logType == 'content' ? (
          <Form {...layout} layout="inline" style={{ marginTop: 20 }}>
            <Form.Item name="note" label="日志类型">
              <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleLogTypeChange}>
                <OptGroup label="Manager">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </OptGroup>
                <OptGroup label="Engineer">
                  <Option value="Yiminghe">yiminghe</Option>
                </OptGroup>
              </Select>
            </Form.Item>
            <Form.Item name="gender" label="topic">
              <Select placeholder="Select a option and change input text above">
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Form>
        ) : (
          ''
        )}
      </div>
      {(logType == 'model' && modelTypeLog != 'property') || logType != 'model' ? (
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          {modelTypeLog == 'event' ? (
            <Select
              value={eventType}
              style={{ width: 150, marginRight: 20 }}
              onChange={handleEventChange}
            >
              {eventTypeData.map((type) => (
                <Option key={type.id}>{type.name}</Option>
              ))}
            </Select>
          ) : (
            ''
          )}
          <Radio.Group value={timeType} onChange={timeTypeLogChange} style={{ marginRight: 20 }}>
            {timeTypeData.map((type) => (
              <Radio.Button value={type.id} key={type.id}>
                {type.name}
              </Radio.Button>
            ))}
          </Radio.Group>
          <DatePicker.RangePicker
            value={timeRange}
            allowClear={false}
            disabledDate={disabledRangeDate}
            showTime
            onChange={timeRangeChange}
            format="YYYY-MM-DD HH:mm"
          />
          {logType == 'model' && modelTypeLog == 'action' ? (
            <Search
              placeholder="行为标识符"
              onSearch={behaivorSearch}
              style={{ width: 200, float: 'right' }}
              allowClear
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {logType == 'model' && modelTypeLog == 'event' ? (
        <Table pagination={false} size="middle" dataSource={dataSource} columns={eventColumns} />
      ) : (
        ''
      )}
      {logType == 'model' && modelTypeLog == 'action' ? (
        <Table pagination={false} size="middle" dataSource={dataSource} columns={behaivorColumns} />
      ) : (
        ''
      )}
      {logType == 'content' ? (
        <Table pagination={false} size="middle" dataSource={contentData} columns={contentColumns} />
      ) : (
        ''
      )}
      {logType == 'onoffline' ? (
        <Table pagination={false} size="middle" dataSource={onoffData} columns={onofflineColumns} />
      ) : (
        ''
      )}
    </Space>
  );
};

export default DevicePage;
