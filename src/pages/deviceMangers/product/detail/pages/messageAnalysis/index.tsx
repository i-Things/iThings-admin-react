import Editor from '@/components/MonacoEditor';
import {
  DeliveredProcedureOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Cascader, Col, Descriptions, Row, Select, Space, Tabs, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

import type { TabsProps } from 'antd';
import type { editor } from 'monaco-editor';
import type { ChangeHandler, MonacoEditorProps } from 'react-monaco-editor';

import { capitalizeFirstLetter } from '@/utils/utils';
import './index.less';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const MessageAnalysisPage: React.FC = () => {
  const [scriptMonacoData, setScriptMonacoData] = useState('');

  const [triggerMode, setTriggerMode] = useState('up');
  // const [triggerFormat, setTriggerFormat] = useState('hex');
  const [actiontype, setActionType] = useState<string[]>(['thing', 'property']);

  const [key, setKey] = useState('1');

  const runScriptMonacoDataRef = useRef('// 二进制数据以0x开头的十六进制表示');
  const monacoRef = useRef<MonacoEditorProps>();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const selectWidth = { width: 200 };

  const SCRIPT_DEMO = `
  /*
  示例数据：
  设备上报属性数据：
  传入参数：
      0x000000000100320100000000
  输出结果：
      {"method":"report","clientToken":"1","params":{"prop_int16":50,"prop_bool":1,"prop_float":0}}

  属性设置的返回结果：
  传入参数：
      0x0300223344c8
  输出结果：
      {"code":0,"data":{},"id":"2241348"}
  */
  function ${actiontype?.[0]}${capitalizeFirstLetter(actiontype?.[1])}Up(bytes) {
      var uint8Array = new Uint8Array(bytes.length);
      for (var i = 0; i < bytes.length; i++) {
          uint8Array[i] = bytes[i] & 0xff;
      }
      var dataView = new DataView(uint8Array.buffer, 0);
      var jsonMap = new Object();
      var fHead = uint8Array[0]; // command
      if (fHead == COMMAND_REPORT) {
          jsonMap['method'] = iThings_PROP_REPORT_METHOD; //iThings JSON格式，属性上报topic。
          jsonMap['clientToken'] = '' + dataView.getInt32(1); //iThings JSON格式，标示该次请求id值。
          var params = {};
          params['prop_int16'] = dataView.getInt16(5); //对应产品属性中prop_int16。
          params['prop_bool'] = uint8Array[7]; //对应产品属性中prop_bool。
          params['prop_float'] = dataView.getFloat32(8); //对应产品属性中prop_float。
          jsonMap['params'] = params; //iThings JSON格式，params标准字段。
      } else if(fHead == COMMAND_SET_REPLY) {
          jsonMap['version'] = '1.0'; //iThings JSON格式，协议版本号固定字段。
          jsonMap['clientToken'] = '' + dataView.getInt32(1); //iThings JSON格式，标示该次请求id值。
          jsonMap['code'] = ''+ dataView.getUint8(5);
      }

      return jsonMap;
  }
  /*
  示例数据：
  云端下发属性设置指令：
  传入参数：
      {"method":"control","clientToken":"12345","version":"1.0","params":{"prop_float":123.452, "prop_int16":333, "prop_bool":1}}
  输出结果：
      0x0100003039014d0142f6e76d

  设备上报的返回结果：
  传入数据：
      {"method":"reportReply","clientToken":"12345","code":0,"data":{}}
  输出结果：
      0x0200003039c8
  */
  function ${actiontype?.[0]}${capitalizeFirstLetter(actiontype?.[1])}Down(json) {
      var method = json['method'];
      var id = json['clientToken'];
      var payloadArray = [];
      if (method == iThings_PROP_SET_METHOD) //属性设置。
      {
          var params = json['params'];
          var prop_float = params['prop_float'];
          var prop_int16 = params['prop_int16'];
          var prop_bool = params['prop_bool'];
          //按照自定义协议格式拼接 rawData。
          payloadArray = payloadArray.concat(buffer_uint8(COMMAND_SET)); //command字段。
          payloadArray = payloadArray.concat(buffer_int32(parseInt(id))); //iThings JSON格式 'id'。
          payloadArray = payloadArray.concat(buffer_int16(prop_int16)); //属性'prop_int16'的值。
          payloadArray = payloadArray.concat(buffer_uint8(prop_bool)); //属性'prop_bool'的值。
          payloadArray = payloadArray.concat(buffer_float32(prop_float)); //属性'prop_float'的值。
      } else if (method ==  iThings_PROP_REPORT_REPLY_METHOD) { //设备上报数据返回结果。
          var code = json['code'];
          payloadArray = payloadArray.concat(buffer_uint8(COMMAND_REPORT_REPLY)); //command字段。
          payloadArray = payloadArray.concat(buffer_int32(parseInt(id))); //iThings JSON格式'id'。
          payloadArray = payloadArray.concat(buffer_uint8(code));
      } else { //未知命令，对于这些命令不做处理。
          var code = json['code'];
          payloadArray = payloadArray.concat(buffer_uint8(COMMAD_UNKOWN)); //command字段。
          payloadArray = payloadArray.concat(buffer_int32(parseInt(id))); //iThings JSON格式'id'。
          payloadArray = payloadArray.concat(buffer_uint8(code));
      }
      return payloadArray;
  }


  //以下是部分辅助函数。
  function buffer_uint8(value) {
      var uint8Array = new Uint8Array(1);
      var dv = new DataView(uint8Array.buffer, 0);
      dv.setUint8(0, value);
      return [].slice.call(uint8Array);
  }
  function buffer_int16(value) {
      var uint8Array = new Uint8Array(2);
      var dv = new DataView(uint8Array.buffer, 0);
      dv.setInt16(0, value);
      return [].slice.call(uint8Array);
  }
  function buffer_int32(value) {
      var uint8Array = new Uint8Array(4);
      var dv = new DataView(uint8Array.buffer, 0);
      dv.setInt32(0, value);
      return [].slice.call(uint8Array);
  }
  function buffer_float32(value) {
      var uint8Array = new Uint8Array(4);
      var dv = new DataView(uint8Array.buffer, 0);
      dv.setFloat32(0, value);
      return [].slice.call(uint8Array);
  }
`;

  // up | down
  const triggerModeOptions = [
    { value: 'up', label: '设备上报数据' },
    { value: 'down', label: '设备接收数据' },
  ];
  // 解析格式
  // const triggerFormatOptions = [
  //   { value: 'text', label: '文本', disabled: true },
  //   { value: 'hex', label: '二进制' },
  // ];

  // action
  const actionOptions = [
    { value: 'thing', label: '物模型' },
    { value: 'gateway', label: '网关子设备' },
    { value: 'log', label: '设备本地日志上报' },
    { value: 'config', label: '设备远程配置' },
  ];

  // type
  const typeOptions = new Map([
    [
      'thing',
      [
        { value: 'property', label: '属性' },
        { value: 'event', label: '事件' },
        { value: 'action', label: '行为' },
      ],
    ],
    [
      'gateway',
      [
        { value: 'operation', label: '拓扑关系管理' },
        { value: 'status', label: '子设备上下线' },
      ],
    ],
    [
      'log',
      [
        { value: 'operation', label: '查询日志等级' },
        { value: 'report', label: '日志上报' },
      ],
    ],
    [
      'config',
      [
        { value: 'update', label: '服务器端主动推送修改日志等级' },
        { value: 'get', label: '远程配置订阅' },
        { value: 'push', label: '云平台主动下发' },
      ],
    ],
  ]);

  const jumpToDocument = () =>
    window.open(
      'https://ithings.net.cn/iThings/%E4%BA%91%E7%AB%AF%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/%E6%B6%88%E6%81%AF%E8%A7%A3%E6%9E%90.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%B6%88%E6%81%AF%E8%A7%A3%E6%9E%90',
    );

  const onTabsChange = (k: string) => {
    setKey(k);
    if (k === '1') {
      runScriptMonacoDataRef.current = '// 二进制数据以0x开头的十六进制表示';
    } else if (k === '2') {
      runScriptMonacoDataRef.current = '';
    }
  };

  const editorChange = () => {};

  const runScriptEditorChange: ChangeHandler = (value) => {
    runScriptMonacoDataRef.current = value;
  };

  // 左侧标题
  const CardTitle: React.FC = () => (
    <>
      编辑脚本
      <Tooltip
        title={
          <>
            编写数据解析脚本，透传类设备上报数据时会自动调用脚本将数据解析为 Alink JSON
            格式，您可以对脚本进行模拟和运行调试，运行正常后点击“提交”，发布该脚本，脚本文件大小上限是
            128KB，详细说明请参考 <a onClick={jumpToDocument}>文档</a>
          </>
        }
      >
        <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
      </Tooltip>
    </>
  );

  // 右侧
  const CardExtra: React.FC = () => (
    <>
      脚本语言：<span> Javascript( ECMAScript 5 ) </span>
      <Tooltip title="使用脚本">
        <QuestionCircleOutlined style={{ marginLeft: '10px' }} onClick={jumpToDocument} />
      </Tooltip>
    </>
  );

  // 模拟输入选项组
  const SelectGroup: React.FC = () => {
    const handleTriggerChange = (v: string) => setTriggerMode(v);

    // const handleFormatChange = (v: string) => setTriggerFormat(v);

    const handleactionTypeChange = (v: string[]) => setActionType(v);

    const getActionTypeOptions = (): Option[] =>
      actionOptions.map((act) => ({
        value: act.value,
        label: act.label,
        children: typeOptions.get(act.value)?.map((tp) => ({
          value: tp.value,
          label: tp.label,
        })),
      }));

    return (
      <Space wrap>
        <Select
          className="trigger-mode"
          value={triggerMode}
          onChange={handleTriggerChange}
          style={selectWidth}
          options={triggerModeOptions}
        />
        {/* {triggerMode === 'up' && (
          <Select
            className="trigger-format"
            value={triggerFormat}
            onChange={handleFormatChange}
            style={selectWidth}
            options={triggerFormatOptions}
          />
        )} */}
        <Cascader
          className="action-type"
          allowClear={false}
          showSearch
          options={getActionTypeOptions()}
          value={actiontype}
          onChange={handleactionTypeChange}
        />
      </Space>
    );
  };

  const Descript: React.FC = () => (
    <Descriptions column={6}>
      <Descriptions.Item label="模拟类型">
        {triggerModeOptions.find((tm) => tm.value === triggerMode)?.label}
      </Descriptions.Item>
      <Descriptions.Item label="Topic">
        {actionOptions.find((act) => act.value === actiontype?.[0])?.label} /{' '}
        {typeOptions.get(actiontype?.[0])?.find((ty) => ty.value === actiontype?.[1])?.label}
      </Descriptions.Item>
    </Descriptions>
  );

  // 模拟输入运行
  const AnalogEdit: React.FC = () => (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {key === '1' ? <SelectGroup /> : <Descript />}
        <Editor
          height={'30vh'}
          value={runScriptMonacoDataRef.current}
          onChange={runScriptEditorChange}
          language={'javascript'}
          monacoRef={monacoRef as React.MutableRefObject<MonacoEditorProps>}
          editorRef={editorRef as React.MutableRefObject<editor.IStandaloneCodeEditor>}
          readOnly={key === '2'}
        />
      </Space>
    </>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '模拟输入',
      children: <AnalogEdit />,
    },
    {
      key: '2',
      label: '运行结果',
      children: <AnalogEdit />,
    },
  ];

  // 编辑脚本
  useEffect(() => {
    setScriptMonacoData(SCRIPT_DEMO);
  }, [SCRIPT_DEMO, actiontype]);

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row justify="space-between">
        <Col>
          <CardTitle />
        </Col>
        <Col>
          <CardExtra />
        </Col>
      </Row>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Editor
          height={'45vh'}
          value={scriptMonacoData}
          onChange={editorChange}
          language={'javascript'}
          monacoRef={monacoRef as React.MutableRefObject<MonacoEditorProps>}
          editorRef={editorRef as React.MutableRefObject<editor.IStandaloneCodeEditor>}
        />
        <Tabs defaultActiveKey="1" items={items} onChange={onTabsChange} />
        <Space>
          <Button icon={<PlayCircleOutlined />}>执行</Button>
          <Button type="primary" icon={<DeliveredProcedureOutlined />}>
            保存
          </Button>
        </Space>
      </Space>
    </Space>
  );
};

export default MessageAnalysisPage;
