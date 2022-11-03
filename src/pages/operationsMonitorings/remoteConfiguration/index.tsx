import Editor from '@/components/MonacoEditor';
import useGetSelectOptions from '@/hooks/useGetSelectOption';
import useGetTableList from '@/hooks/useGetTableList';
import { postThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import { PROTABLE_OPTIONS } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import sizeof from 'object-sizeof';
import { useEffect, useRef, useState } from 'react';
import '../../systemMangers/menu/styles.less';
import './styles.less';
import type { RemoteConfigurationItem } from './types';

const debounce = require('lodash.debounce');

const RemoteConfiguration = () => {
  const { dataList } = useGetTableList();
  const { querySelectOptions, selectOptions } = useGetSelectOptions();

  const [productSelect, setProductSelect] = useState('');
  const [monacoData, setMonacoData] = useState('');
  const [jsonSize, setJsonSize] = useState(0);
  const [editFlag, setEditFlag] = useState(true);
  const [editError, setEditError] = useState(false);

  const actionRef = useRef<ActionType>();
  const monacoRef = useRef();
  const editorRef = useRef();

  type QueryProductProp = typeof postThingsProductInfoIndex;

  const onChangeError = debounce((value) => {
    const error = monacoRef?.current.editor.getModelMarkers(value);
    if (error.length) setEditError(true);
  }, 600);

  const editorChange = (value) => {
    onChangeError(value);
    setEditError(false);
    setMonacoData(value);
    setJsonSize(sizeof(value));
  };

  const editHandle = () => setEditFlag(!editFlag);

  const updateHandle = () => {
    if (!editFlag && editError) return message.error('json格式错误');
  };

  const columns: ProColumns<RemoteConfigurationItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '版本更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      search: false,
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <Button type="primary" onClick={() => {}}>
          查看
        </Button>
      ),
    },
  ];

  const tableListDataSource = [];
  for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
      key: i,
      id: i,
      updateTime: '1667371986422' + i,
    });
  }

  // useEffect(() => {
  //   console.log(monacoRef?.current.editor.getModelMarkers(editorRef?.current?.getValue?.()));

  //   setEditError(false);
  //   if (monacoRef?.current.editor.getModelMarkers(editorRef?.current?.getValue?.()))
  //     setEditError(true);
  // }, [editorRef?.current?.getValue?.()]);

  useEffect(() => {
    setProductSelect(selectOptions[0]?.value);
    querySelectOptions<QueryProductProp>(postThingsProductInfoIndex, {
      page: { page: 1, size: 99999 },
      label: 'productName',
      value: 'productID',
    });
  }, [selectOptions.length]);

  return (
    <PageContainer>
      <div style={{ backgroundColor: 'white', padding: '24px' }}>
        <ProFormSelect
          name="productID"
          width={150}
          label="产品"
          placeholder="请选择产品"
          showSearch
          options={selectOptions}
          fieldProps={{
            value: productSelect,
            onChange: (v: string) => setProductSelect(v),
          }}
        />
        <section className="menu-tool-tip">
          <ExclamationCircleTwoTone className="menu-icon" twoToneColor="#ed6a0c" />
          平台支持远程更新设备的配置文件（JSON
          格式），您可以在下方编辑配置模板，对设备的系统参数、网络参数等进行远程配置，通过批量更新对设备进行批量远程维护和管理，详细说明请参见
          <a>文档</a>
        </section>
        <div className="editor">
          <header className="editor-header">
            <span className="header-tittle">配置模版</span>
            <span className="header-content">
              当前文件大小 {jsonSize / 1024 >= 1 ? jsonSize / 1024 : jsonSize}
              {jsonSize / 1024 >= 1 ? 'kb' : 'b'} (上限 64KB)
            </span>
            <span className="header-submit-time">
              提交于：
              {dataList?.list?.[0]?.updateTime
                ? Number(timestampToDateStr(Number(dataList?.list?.[0].updateTime)))
                : ''}
            </span>
          </header>
          <Editor
            height={'35vh'}
            value={monacoData}
            onChange={editorChange}
            language={'json'}
            monacoRef={monacoRef}
            editorRef={editorRef}
            readOnly={editFlag ? true : false}
          />
        </div>
        <div className="remote-configuration-btn">
          <Button onClick={editHandle}>{editFlag ? '编辑' : '取消'}</Button>
          <Button
            className="remote-configuration-btn-update"
            type="primary"
            onClick={updateHandle}
            disabled={jsonSize / 1024 > 64}
          >
            {editFlag ? '批量更新' : '保存'}
          </Button>
        </div>
      </div>
      <ProTable<RemoteConfigurationItem>
        headerTitle={'配置版本记录'}
        actionRef={actionRef}
        rowKey="deviceName"
        options={{ ...PROTABLE_OPTIONS }}
        search={false}
        // request={(params) =>
        //   queryPage<any, any>(postThingsGroupDeviceIndex, {
        //     ...params,
        //   })
        // }
        request={() =>
          Promise.resolve({
            data: tableListDataSource,
            success: true,
          })
        }
        columns={columns}
        pagination={{ pageSize: 10 }}
        size={'middle'}
      />
    </PageContainer>
  );
};

export default RemoteConfiguration;
