import Editor from '@/components/MonacoEditor';
import {
  postApiV1ThingsProductCustomRead,
  postApiV1ThingsProductCustomUpdate,
} from '@/services/iThingsapi/zidingyi';
import { capitalizeFirstLetter } from '@/utils/utils';
import {
  DeliveredProcedureOutlined,
  ExclamationCircleFilled,
  ExclamationCircleTwoTone,
  PlayCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Cascader,
  Col,
  Descriptions,
  message,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Tabs,
  Tooltip,
} from 'antd';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';

import type { TabsProps } from 'antd';
import type { editor } from 'monaco-editor';
import type { ChangeHandler, MonacoEditorProps } from 'react-monaco-editor';

import './index.less';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const MessageAnalysisPage: React.FC<{ productID: string }> = ({ productID }) => {
  const [scriptMonacoData, setScriptMonacoData] = useState('');
  const [runScriptMonacoData, setRunScriptMonacoData] = useState('');
  const [runRes, setRunRes] = useState('');

  const [triggerMode, setTriggerMode] = useState('up');
  // const [triggerFormat, setTriggerFormat] = useState('hex');
  const [actiontype, setActionType] = useState<string[]>(['thing', 'property']);

  const [activeKey, setActiveKey] = useState('1');
  const [lang, setLang] = useState('');
  const [err, setErr] = useState(true);
  const [loading, setLoading] = useState(false);

  const monacoRef = useRef<MonacoEditorProps>();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const { data: scriptData } = useRequest(postApiV1ThingsProductCustomRead, {
    defaultParams: [
      {
        productID,
      },
    ],
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { run } = useRequest(postApiV1ThingsProductCustomUpdate, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功');
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const selectWidth = { width: 200 };

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

  // 数组转hex

  const arrayToHex = (arr: number[]) => {
    if (arr.length) {
      // 创建一个 ArrayBuffer
      const buffer = new ArrayBuffer(arr.length);
      // 创建一个类型化数组对象，将数据写入 ArrayBuffer 中
      const view = new DataView(buffer);
      arr.forEach((value, index) => view.setUint8(index, value));

      // 创建一个 Uint8Array 来获取大端字节序的二进制数据
      const uint8Arr = new Uint8Array(buffer);
      // 将 Uint8Array 转换为十六进制字符串
      const hexStr =
        '0x' +
        Array.from(uint8Arr)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

      return hexStr;
    }
    return '{}';
  };

  // 执行脚本
  const runSimulation = () => {
    setLoading(true);
    try {
      const params = lang === 'javascript' ? `'${runScriptMonacoData}'` : runScriptMonacoData;
      const upCode = `${scriptMonacoData}
      return ${actiontype?.[0]}${capitalizeFirstLetter(actiontype?.[1])}${capitalizeFirstLetter(
        triggerMode,
      )}(${params})
    `;
      const fn = new Function(upCode);
      setRunRes(
        triggerMode === 'down' && Array.isArray(fn())
          ? (arrayToHex(fn()) as string)
          : JSON.stringify(fn(), null, 2),
      );

      message.success('运行脚本成功');
    } catch (error) {
      message.error('请检查是否有脚本或脚本代码格式是否正确');
      setRunRes('{}');
    }

    setLoading(false);
    setActiveKey('2');
  };

  const jumpToDocument = () =>
    window.open(
      'https://ithings.net.cn/iThings/%E4%BA%91%E7%AB%AF%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/%E6%B6%88%E6%81%AF%E8%A7%A3%E6%9E%90.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%B6%88%E6%81%AF%E8%A7%A3%E6%9E%90',
    );

  const onTabsChange = async (k: string) => setActiveKey(k);

  // 底部编辑器捕获错误
  const onChangeError = debounce((value: string) => {
    const er = monacoRef?.current?.editor.getModelMarkers(value);
    const error = er.filter((r) => r.owner === 'javascript' || r.owner === 'json');

    if (!value) {
      return setErr(true);
    }
    if (/^0x[0-9a-fA-F]+$/.test(value) && lang === 'javascript') return setErr(false);
    else if (error.length && lang === 'javascript') {
      message.error('请检查模拟类型或代码格式是否正确');
      return setErr(true);
    } else if (error.length) {
      message.error('请检查代码格式是否正确');
      return setErr(true);
    } else return setErr(false);
  }, 600);

  const editorChange = (value: string) => {
    setScriptMonacoData(value);
  };

  const runScriptEditorChange: ChangeHandler = (value) => {
    onChangeError(value);
    setRunScriptMonacoData(value);
  };

  // 保存代码片段
  const saveCode = () => {
    Modal.confirm({
      title: '确认启用',
      icon: <ExclamationCircleFilled />,
      content: '保存后将会自动启用消息解析,请确认是否保存启用',
      onOk() {
        run({ productID, transformScript: scriptMonacoData });
      },
    });
  };

  // 顶部左侧标题
  const CardTitle: React.FC = () => (
    <>
      编辑脚本
      <Tooltip
        title={
          <>
            编写数据解析脚本，透传类设备上报数据时会自动调用脚本将数据解析为 ithings
            格式，您可以对脚本进行模拟和运行调试，运行正常后点击“提交”，发布该脚本，脚本文件大小上限是
            128KB，详细说明请参考 <a onClick={jumpToDocument}>文档</a>
          </>
        }
      >
        <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
      </Tooltip>
    </>
  );

  // 顶部右侧
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
  const analogEdit = () => (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {activeKey === '1' ? <SelectGroup /> : <Descript />}
        {activeKey === '1' && (
          <section style={{ backgroundColor: '#fff5ed' }}>
            <ExclamationCircleTwoTone style={{ marginRight: '10px' }} twoToneColor="#ed6a0c" />
            {triggerMode === 'up' ? '二进制数据以0x开头的十六进制表示' : '输入为 json 格式'}
          </section>
        )}
        <Editor
          height={'30vh'}
          value={activeKey === '1' ? runScriptMonacoData : runRes}
          onChange={runScriptEditorChange}
          language={lang}
          monacoRef={monacoRef as React.MutableRefObject<MonacoEditorProps>}
          editorRef={editorRef as React.MutableRefObject<editor.IStandaloneCodeEditor>}
          readOnly={activeKey === '2'}
        />
      </Space>
    </>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '模拟输入',
      children: analogEdit(),
    },
    {
      key: '2',
      label: '运行结果',
      children: analogEdit(),
    },
  ];

  // 编辑脚本
  useEffect(() => {
    setScriptMonacoData(scriptData?.data?.transformScript || '');
  }, [scriptData?.data?.transformScript]);

  // 语言切换,上下行切换
  useEffect(() => {
    if (triggerMode === 'up') setLang('javascript');
    if (triggerMode === 'down') setLang('json');
    setRunScriptMonacoData('');
    setRunRes('');
  }, [triggerMode]);

  return (
    <Skeleton loading={!scriptData?.data} active>
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
          <Editor height={'45vh'} value={scriptMonacoData} onChange={editorChange} />
          <Tabs activeKey={activeKey} items={items} onChange={onTabsChange} />
          <Space>
            <Button
              icon={<PlayCircleOutlined />}
              onClick={runSimulation}
              disabled={err}
              loading={loading}
            >
              执行
            </Button>
            <Button type="primary" icon={<DeliveredProcedureOutlined />} onClick={saveCode}>
              保存
            </Button>
          </Space>
        </Space>
      </Space>
    </Skeleton>
  );
};

export default MessageAnalysisPage;
