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
import { Button, message, Modal, Tag } from 'antd';
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
    else setEditError(false);
  }, 600);

  const editorChange = (value) => {
    onChangeError(value);
    setEditError(false);
    setMonacoData(value);
    setJsonSize(sizeof(value));
  };

  const editHandle = () => setEditFlag(!editFlag);

  const confirmHandle = () => {};

  const updateConfirm = () => {
    if ((!editFlag && editError) || (!editFlag && !monacoData))
      return message.error('json格式错误');
    else if (editFlag) {
      Modal.confirm({
        title: '是否确认对该产品下的所有设备进行批量远程配置更新？',
        width: 450,
        content: (
          <>
            <p className="remote-configuration-modal-text">
              注：该产品下的所有设备将自动更新该配置文件，设备端需订阅远程配置的topic
            </p>
            <p className="remote-configuration-modal-text">
              指定产品： {selectOptions?.find((v) => v.value === productSelect)?.label}
            </p>
            <p className="remote-configuration-modal-text">设备范围：所有设备</p>
          </>
        ),
        closable: true,
        cancelText: '取消',
        okText: '确认更新',
        onOk: confirmHandle,
      });
    }
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
              当前文件大小{' '}
              <Tag color="orange">
                {jsonSize / 1024 >= 1 ? (jsonSize / 1024).toFixed(2) : jsonSize}
                {jsonSize / 1024 >= 1 ? 'kb' : 'b'}
              </Tag>{' '}
              (上限 64KB)
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
            onClick={updateConfirm}
            disabled={jsonSize / 1024 >= 64}
          >
            {editFlag ? '批量更新' : '保存'}
          </Button>
          {/* <Modal
            title="Title"
            open={open}
            onOk={confirmHandle}
            confirmLoading={confirmLoading}
            onCancel={closeModal}
            footer={[
              <Button key="cancel" onClick={closeModal}>
                取消
              </Button>,
              <Button key="submit" type="primary" loading={confirmLoading} onClick={confirmHandle}>
                确认更新
              </Button>,
            ]}
          >
            124
          </Modal> */}
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
