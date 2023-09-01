import TimeFilter from '@/components/TimeFilter';
import { resetTimeRange } from '@/components/TimeFilter/utils';
import {
  postApiV1ThingsDeviceMsgEventLogIndex,
  postApiV1ThingsDeviceMsgHubLogIndex,
  postApiV1ThingsDeviceMsgPropertyLatestIndex,
} from '@/services/iThingsapi/shebeixiaoxi';
import { postApiV1ThingsProductSchemaIndex } from '@/services/iThingsapi/wumoxing';
import { DefaultPage, getInitialTime } from '@/utils/base';
import { EVENT_TYPE_DATA } from '@/utils/const';
import { SyncOutlined } from '@ant-design/icons';
import Switch from '@ant-design/pro-form/lib/components/Switch';
import { useAntdTable, useRequest } from 'ahooks';
import type { RadioChangeEvent } from 'antd';
import { Form, Input, Radio, Select, Space, Table } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-cn';
import type { ChangeEventHandler } from 'react';
import React, { useEffect, useState } from 'react';
import type { DeviceInfo, PageInfo } from '../../../data';
import type { AttrData } from './data';
import { LogType, ModelType } from './enum';
import {
  accessColumns,
  contentColumns,
  eventColumns,
  getAttrColumns,
  onofflineColumns,
} from './getColumns';
import styles from './index.less';
import ModelDetail from './modelDialog';

const { Search } = Input;
const { Option, OptGroup } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const DevicePage: React.FC<DeviceInfo> = (props) => {
  const { productID, deviceName, deviceIsChange } = props;

  const initialTime = getInitialTime();

  const [modelTYpe, setModelType] = useState('property');
  const [logType, setLogType] = useState('model');
  const [contentParams, setContentParams] = useState({ actions: '', topics: '' });
  const [dataID, setDataID] = useState('');
  const [historyDataID, setHistoryDataID] = useState('');
  const [isRefresh, setRefresh] = useState(false);
  const [eventType, setEventType] = useState<string>(null!);
  const [timeRangeInfo, setTimeRangeInfo] = useState({ timeRange: initialTime, type: 0 });
  const [attrList, setAttrList] = useState<Partial<AttrData>[]>([]);

  const [visible, setVisible] = useState(false);

  // 物模型日志-属性表格数据
  const [modelData, setModelData] = useState<Partial<AttrData>[]>([]);
  console.log(modelData);

  // 获取物模型日志 - 属性
  const {
    data: attrData,
    loading: attrLoading,
    refresh: attrRun,
  } = useRequest(
    async () => {
      const res = await postApiV1ThingsDeviceMsgPropertyLatestIndex({
        productID,
        deviceName,
        dataIDs: [],
      });
      return res.data;
    },
    {
      ready: logType === LogType.MODEL && modelTYpe === ModelType.PROPERTY && !!productID,
      refreshDeps: [isRefresh, logType, modelTYpe, deviceIsChange],
      pollingInterval:
        isRefresh && logType === LogType.MODEL && modelTYpe === ModelType.PROPERTY ? 5000 : 0,
    },
  );

  // 获取物模型列表
  const { data: modelList } = useRequest(
    async () => {
      const res = await postApiV1ThingsProductSchemaIndex({
        productID,
        type: 1,
      });
      return res.data;
    },
    {
      ready: logType === LogType.MODEL && modelTYpe === ModelType.PROPERTY && !!productID,
      refreshDeps: [isRefresh, logType, modelTYpe],
      pollingInterval:
        isRefresh && logType === LogType.MODEL && modelTYpe === ModelType.PROPERTY ? 5000 : 0,
    },
  );

  // 匹配物模型名称
  useEffect(() => {
    if (modelList && attrData) {
      const arr: Partial<AttrData>[] = [];
      modelList?.list?.forEach((item) => {
        attrData.list?.some((list) => {
          if (list.dataID === item.identifier) {
            arr.push({
              ...list,
              name: item.name,
              affordance: JSON.parse(item.affordance).define.type,
            });
          }
          return list.dataID === item.identifier;
        });
      });
      setAttrList(arr);
    }
  }, [attrData, modelList]);

  // 根据属性标识符筛选
  useEffect(() => {
    if (attrList.length >= 0) {
      setModelData(
        () => (dataID ? attrList?.filter((item) => item.dataID?.includes(dataID)) : attrList) || [],
      );
    }
  }, [dataID, attrList]);

  const getTime = () => {
    let startTime, endTime;
    if (isRefresh && timeRangeInfo.type <= 4) {
      const { startTime: start, endTime: end } = resetTimeRange(timeRangeInfo.type);
      startTime = moment(start);
      endTime = timeRangeInfo.type === 3 ? moment(end) : '0';
    } else {
      startTime = timeRangeInfo.timeRange[0];
      endTime = timeRangeInfo.timeRange[1];
    }
    return { startTime, endTime };
  };

  /** 获取物模型-事件 */
  const eventTable = async ({ current, pageSize }: PageInfo) => {
    const { startTime, endTime } = getTime();
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      deviceNames: [deviceName],
      types: eventType === 'all' ? null! : [eventType],
      productID,
      dataID: '',
      timeStart: startTime?.valueOf().toString() ?? '',
      timeEnd: endTime?.valueOf().toString() ?? '',
      page,
    };

    const res = await postApiV1ThingsDeviceMsgEventLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取物模型日志 - 事件
  const { tableProps: eventTableProps, refresh: eventRun } = useAntdTable(eventTable, {
    ready: logType === LogType.MODEL && modelTYpe === ModelType.EVENT && !!productID,
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRangeInfo, eventType, isRefresh, deviceIsChange],
    pollingInterval:
      isRefresh && logType === LogType.MODEL && modelTYpe === ModelType.EVENT ? 5000 : 0,
  });

  /** 获取内容日志 */
  const contentTable = async ({ current, pageSize }: PageInfo) => {
    const { startTime, endTime } = getTime();
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      actions: contentParams.actions ? [contentParams.actions] : ['property', 'event', 'action'],
      topics: contentParams.topics ? [contentParams.topics] : null!,
      deviceName,
      productID,
      timeStart: startTime?.valueOf().toString() ?? '',
      timeEnd: endTime?.valueOf().toString() ?? '',
      page,
    };

    const res = await postApiV1ThingsDeviceMsgHubLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };
  /** 获取授权日志 */
  const accessTable = async ({ current, pageSize }: PageInfo) => {
    const { startTime, endTime } = getTime();
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      actions: contentParams.actions ? [contentParams.actions] : ['subscribe', 'publish'],
      topics: contentParams.topics ? [contentParams.topics] : null!,
      deviceName,
      productID,
      timeStart: startTime?.valueOf().toString() ?? '',
      timeEnd: endTime?.valueOf().toString() ?? '',
      page,
    };

    const res = await postApiV1ThingsDeviceMsgHubLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取内容日志
  const { tableProps: contentTableProps, refresh: contentRun } = useAntdTable(contentTable, {
    ready: logType === LogType.CONTENT && !!productID,
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRangeInfo, contentParams, isRefresh, deviceIsChange],
    pollingInterval: isRefresh && logType === LogType.CONTENT ? 5000 : 0,
  });

  // 获取内容日志
  const { tableProps: accessTableProps, refresh: accessRun } = useAntdTable(accessTable, {
    ready: logType === LogType.ACCESS && !!productID,
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRangeInfo, contentParams, isRefresh, deviceIsChange],
    pollingInterval: isRefresh && logType === LogType.ACCESS ? 5000 : 0,
  });

  /** 获取上下线日志 */
  const onOffTable = async ({ current, pageSize }: PageInfo) => {
    const { startTime, endTime } = getTime();
    // 初始化参数
    const page = {
      page: current,
      size: pageSize,
    };
    const _params = {
      actions: ['connected', 'disconnected'],
      deviceName,
      productID,
      timeStart: startTime?.valueOf().toString() ?? '',
      timeEnd: endTime?.valueOf().toString() ?? '',
      page,
    };

    const res = await postApiV1ThingsDeviceMsgHubLogIndex(_params);
    const result = res?.data;
    return {
      list: result?.list || [],
      total: result.total || 0,
    };
  };

  // 获取上下线日志
  const { tableProps: onOffTableProps, refresh: onOffRun } = useAntdTable(onOffTable, {
    ready: logType === LogType.ONOFFLINE && !!productID,
    defaultPageSize: DefaultPage.size,
    refreshDeps: [timeRangeInfo, isRefresh, deviceIsChange],
    pollingInterval: isRefresh && logType === LogType.ONOFFLINE ? 5000 : 0,
  });

  /** 查看历史数据 */
  const handleHistory = (record: Partial<AttrData>) => {
    setVisible(true);
    setHistoryDataID(record.dataID ?? '');
  };

  const attrColumns = getAttrColumns(handleHistory);

  /** 改变日志类型 */
  const logTypeChange = (e: RadioChangeEvent) => {
    setLogType(e.target.value);
    /** 重置各个筛选条件 */
    setModelType('property');
    setEventType(null!);
    setContentParams({
      actions: '',
      topics: '',
    });
  };

  /** 修改物模型日志的类型 */
  const modelTypeLogChange = (e: RadioChangeEvent) => {
    setModelType(e.target.value);
    setEventType('all');
    if (e.target.value === 'event') setTimeRangeInfo({ timeRange: initialTime, type: 0 });
  };

  /** 是否自动刷新 */
  const refreshChange = (checked: boolean) => {
    setRefresh(checked);
  };

  /** 物模型属性-筛选标识符 */
  const attrSearch = (value: string) => {
    setDataID(value);
  };

  /** 修改物模型-事件-事件类型 */
  const handleEventChange = (value: string) => {
    setEventType(value);
  };

  /** 修改内容日志的日志类型 */
  const handleLogTypeChange = (value: string) => {
    setContentParams((val) => ({
      ...val,
      actions: value,
    }));
  };

  /** 修改内容日志topics */
  const handleChangeTopics: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContentParams((val) => ({
      ...val,
      topics: e.target.value,
    }));
  };

  /** 关闭查看历史抽屉 */
  const handleClose = () => {
    setVisible(false);
  };

  /** 手动刷新 */
  const refresh = () => {
    if (logType === LogType.MODEL && modelTYpe === ModelType.PROPERTY) attrRun();
    if (logType === LogType.MODEL && modelTYpe === ModelType.EVENT) eventRun();
    if (logType === LogType.CONTENT) contentRun();
    if (logType === LogType.ACCESS) accessRun();
    if (logType === LogType.ONOFFLINE) onOffRun();
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Radio.Group value={logType} onChange={logTypeChange}>
          <Radio.Button value="model">物模型日志</Radio.Button>
          <Radio.Button value="content">内容日志</Radio.Button>
          <Radio.Button value="onoffline">上下线日志</Radio.Button>
          <Radio.Button value="access">授权日志</Radio.Button>
        </Radio.Group>
        <div className={styles.refresh}>
          <SyncOutlined className={styles['refresh-icon']} onClick={refresh} />
          <Switch fieldProps={{ onChange: refreshChange }} />
          <span style={{ paddingLeft: 10 }}>自动刷新</span>
        </div>
      </Space>
      {logType === LogType.MODEL ? (
        <div>
          <Radio.Group value={modelTYpe} onChange={modelTypeLogChange} style={{ marginTop: 30 }}>
            <Radio.Button value="property">属性</Radio.Button>
            <Radio.Button value="event">事件</Radio.Button>
          </Radio.Group>
        </div>
      ) : (
        ''
      )}
      <div>
        {logType === LogType.ACCESS && (
          <Form {...layout} layout="inline" style={{ marginTop: 20 }}>
            <Form.Item name="actions" label="授权类型">
              <Select
                style={{ width: 200 }}
                onChange={handleLogTypeChange}
                placeholder="请选择"
                allowClear
              >
                <OptGroup label="物模型topic">
                  <Option value="publish">发布</Option>
                  <Option value="subscribe">订阅</Option>
                </OptGroup>
              </Select>
            </Form.Item>
          </Form>
        )}
        {logType === LogType.CONTENT && (
          <Form {...layout} layout="inline" style={{ marginTop: 20 }}>
            <Form.Item name="actions" label="日志类型">
              <Select
                style={{ width: 200 }}
                onChange={handleLogTypeChange}
                placeholder="请选择"
                allowClear
              >
                <OptGroup label="物模型topic">
                  <Option value="property">属性</Option>
                  <Option value="event">事件</Option>
                  <Option value="action">行为</Option>
                </OptGroup>
              </Select>
            </Form.Item>
            <Form.Item name="topics" label="topic">
              <Input
                style={{ width: 300 }}
                placeholder="请输入topic"
                onChange={debounce(handleChangeTopics, 300)}
                allowClear
              />
            </Form.Item>
          </Form>
        )}
      </div>
      <div className={styles.filter}>
        {logType === LogType.MODEL && modelTYpe === ModelType.EVENT && (
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <Select
              value={eventType}
              style={{ width: 150, marginRight: 20 }}
              onChange={handleEventChange}
              options={EVENT_TYPE_DATA}
            />
          </div>
        )}
        {(modelTYpe === ModelType.EVENT || logType !== LogType.MODEL) && (
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <TimeFilter
              onChange={(val, type) => {
                setTimeRangeInfo({ timeRange: val, type });
              }}
            />
          </div>
        )}
      </div>
      {logType === LogType.MODEL && modelTYpe === 'property' && (
        <div>
          <Search
            placeholder="属性标识符"
            onSearch={attrSearch}
            style={{ width: 200, marginBottom: 20, marginTop: 20 }}
            allowClear
          />
          <Table
            rowKey="dataID"
            pagination={false}
            size="middle"
            dataSource={modelData}
            columns={attrColumns}
            loading={attrLoading}
          />
        </div>
      )}

      {logType === LogType.MODEL && modelTYpe === 'event' && (
        <Table size="middle" rowKey="dataID" columns={eventColumns} {...eventTableProps} />
      )}
      {logType === LogType.ACCESS && (
        <Table size="middle" rowKey="tranceID" columns={accessColumns} {...accessTableProps} />
      )}
      {logType === LogType.CONTENT && (
        <Table size="middle" rowKey="tranceID" columns={contentColumns} {...contentTableProps} />
      )}
      {logType === LogType.ONOFFLINE && (
        <Table size="middle" rowKey="tranceID" columns={onofflineColumns} {...onOffTableProps} />
      )}
      {visible && (
        <ModelDetail
          visible={visible}
          dataID={historyDataID}
          handleClose={handleClose}
          deviceName={deviceName}
          productId={productID}
        />
      )}
    </Space>
  );
};

export default DevicePage;
