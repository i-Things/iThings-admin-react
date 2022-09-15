import type { RadioChangeEvent } from 'antd';
import { DatePicker, Form, Input, Radio, Select, Space, Switch, Table } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { useState } from 'react';
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
  const [modelTypeLog, setModelTypeLog] = useState<string>('attr');
  const [isRefresh, setRefresh] = useState<boolean>(false);
  const [eventType, setEventType] = useState<string>('0');
  const [timeType, setTimeType] = useState<number>(0);
  const [timeRange, setTimeRange] = useState<RangePickerProps['value']>([
    moment(moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm')),
    moment(),
  ]);
  const [attrKeys, setAttrKeys] = useState<string>('');
  const [behaviorKeys, setBehaviorKeys] = useState<string>('');

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
  };
  const modelTypeLogChange = (e: RadioChangeEvent) => {
    setModelTypeLog(e.target.value);
    setTimeType(0);
    resetTimeRange(0);
    setAttrKeys('');
    setBehaviorKeys('');
    setEventType('0');
  };
  const refreshChange = (checked: boolean) => {
    console.log(checked, isRefresh);
    setRefresh(checked);
    console.log(checked, isRefresh);
  };
  const attrSearch = (value: string) => {
    setAttrKeys(value);
    console.log(attrKeys);
  };
  const behaivorSearch = (value: string) => {
    setBehaviorKeys(value);
    console.log(behaviorKeys);
  };

  const dataSource: any[] = [];
  const attrColumns = [
    {
      title: '标识符',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '功能名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '历史数据',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '数据类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '最新值',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '通讯类型',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Topic',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '通信内容',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const onofflineColumns = [
    {
      title: '时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '动作',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '详细信息',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const handleEventChange = (value: string) => {
    setEventType(value);
  };

  const timeTypeLogChange = (e: RadioChangeEvent) => {
    const value: number = e.target.value;
    setTimeType(value);
    resetTimeRange(value);
  };

  const timeRangeChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setTimeType(-1);
    console.log(value, dateString);
  };

  const handleLogTypeChange = (value: string) => {
    console.log(`selected ${value}`);
  };

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
            <Radio.Button value="attr">属性</Radio.Button>
            <Radio.Button value="event">事件</Radio.Button>
            <Radio.Button value="behavior">行为</Radio.Button>
          </Radio.Group>
        </div>
      ) : (
        ''
      )}
      {logType == 'model' && modelTypeLog == 'attr' ? (
        <div>
          <Search
            placeholder="属性名称/属性标识符"
            onSearch={attrSearch}
            style={{ width: 200, marginBottom: 20, marginTop: 20 }}
            allowClear
          />
          <Table pagination={false} size="middle" dataSource={dataSource} columns={attrColumns} />
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
      {(logType == 'model' && modelTypeLog != 'attr') || logType != 'model' ? (
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
            showTime
            onChange={timeRangeChange}
            format="YYYY-MM-DD HH:mm"
          />
          {logType == 'model' && modelTypeLog == 'behavior' ? (
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
      {logType == 'model' && modelTypeLog == 'behavior' ? (
        <Table pagination={false} size="middle" dataSource={dataSource} columns={behaivorColumns} />
      ) : (
        ''
      )}
      {logType == 'content' ? (
        <Table pagination={false} size="middle" dataSource={dataSource} columns={contentColumns} />
      ) : (
        ''
      )}
      {logType == 'onoffline' ? (
        <Table
          pagination={false}
          size="middle"
          dataSource={dataSource}
          columns={onofflineColumns}
        />
      ) : (
        ''
      )}
    </Space>
  );
};

export default DevicePage;
