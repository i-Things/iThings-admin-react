/* eslint-disable @typescript-eslint/no-shadow */
import {
  postApiV1ThingsProductSchemaIndex,
  postApiV1ThingsProductSchemaTslImport,
  postApiV1ThingsProductSchemaTslRead,
  postApiV1ThingsProductSchema__openAPI__delete,
} from '@/services/iThingsapi/wumoxing';
import { downloadFunction, isJSON } from '@/utils/utils';
import { CopyOutlined, DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Alert, Button, Input, message, Modal } from 'antd';
import { useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { DATA_TYPE_ENUM, MODE_ENUM, TYPE_ENUM } from './components/const';
import { EditForm } from './components/editForm';
import styles from './style.less';

type ProductSchemaInfo = {
  productID: string;
  type: number;
  tag?: number;
  identifier: string;
  name?: string;
  desc?: string;
  required: number;
  affordance: string;
};

type queryParam = {
  pageSize: number;
  current: number;
  productID?: string;
};

type MapType = 'bool' | 'int' | 'float' | 'string' | 'enum' | 'timestamp';

export default () => {
  const [modalVisit, setModalVisit] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [exportJSON, setExportJSON] = useState();
  const [tsl, setTsl] = useState('');
  const [jsonError, setJsonError] = useState(false);
  const urlParams = useParams() as { id: string };
  const productID = urlParams.id ?? '';
  const actionRef = useRef<ActionType>();
  const modelModalRef = useRef({
    clearModal: Function,
    createModel: Function,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setModelModalValue: (_: any, __: any) => {},
  });

  const boolRender = (record: ProductSchemaInfo) => {
    const mapping = JSON.parse(record?.affordance)?.define?.mapping;
    const array = Object.entries(mapping);
    return (
      <div>
        {array.map((item) => {
          return (
            <p key={item[0]}>
              {item[0]} - {item[1]}
            </p>
          );
        })}
      </div>
    );
  };

  const intRender = (record: ProductSchemaInfo) => {
    const { min, max, start, step, unit } = JSON.parse(record?.affordance)?.define;
    return (
      <div>
        <p>
          数值范围: {min} - {max}
        </p>
        <p>初始值: {start}</p>
        <p>步长: {step}</p>
        <p>单位: {unit}</p>
      </div>
    );
  };

  const stringRender = (record: ProductSchemaInfo) => {
    const { max } = JSON.parse(record?.affordance)?.define;
    return (
      <div>
        <p>
          字符串长度: {0} - {max}
        </p>
      </div>
    );
  };

  const timestampRender = () => {
    return (
      <div>
        <p>INT类型的UTC时间戳（秒）</p>
      </div>
    );
  };

  const renderMap = (type: MapType, record: ProductSchemaInfo) => {
    const map: { [key in MapType]: (record: ProductSchemaInfo) => JSX.Element } = {
      bool: boolRender,
      int: intRender,
      float: intRender,
      string: stringRender,
      enum: boolRender,
      timestamp: timestampRender,
    };
    if (!map[type]) {
      return '-';
    }
    return map[type](record) ?? '-';
  };

  const getDefinition = (record: ProductSchemaInfo) => {
    try {
      return JSON.parse(record?.affordance);
    } catch (e) {
      console.error(e);
      message.error('JSON 解析错误');
    }
  };

  const columns: ProColumns<ProductSchemaInfo>[] = [
    {
      title: '功能类型',
      width: 80,
      dataIndex: 'type',
      valueEnum: TYPE_ENUM,
    },
    {
      title: '功能名称',
      dataIndex: 'name',
    },
    {
      title: '标识符',
      dataIndex: 'identifier',
    },
    {
      title: '数据类型',
      width: 80,
      dataIndex: 'dataType',
      render: (_: any, record: ProductSchemaInfo) => {
        const dataType = getDefinition(record)?.define?.type as keyof typeof DATA_TYPE_ENUM;
        return DATA_TYPE_ENUM[dataType] ?? '-';
      },
    },
    {
      title: '读写类型',
      width: 80,
      key: 'mode',
      dataIndex: 'mode',
      render: (_: any, record: ProductSchemaInfo) => {
        const dataType = (getDefinition(record)?.mode ||
          getDefinition(record)?.define?.mode) as keyof typeof MODE_ENUM;
        return MODE_ENUM[dataType] ?? '-';
      },
    },
    {
      title: '数据定义',
      dataIndex: 'affordance',
      render: (_: any, record: ProductSchemaInfo) => {
        const type = getDefinition(record)?.define?.type;
        return renderMap(type, record);
      },
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (text, record: ProductSchemaInfo) => [
        <a
          key="view"
          onClick={() => {
            if (modelModalRef.current) {
              modelModalRef.current.setModelModalValue(record, true);
            }
          }}
        >
          查看
        </a>,
        <Button
          danger
          key="deleteProduct"
          onClick={async () => {
            Modal.confirm({
              title: '确定要删除该模板？',
              icon: <ExclamationCircleOutlined />,
              content: '你确定删除该功能吗？',
              async onOk() {
                const params = {
                  ...record,
                };
                const res = await postApiV1ThingsProductSchema__openAPI__delete(params);
                if (res instanceof Response) {
                  return;
                }
                message.success('删除成功');
                actionRef.current?.reload();
              },
              onCancel() {},
            });
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  const queryList = async (
    params: Partial<queryParam>,
  ): Promise<{ data?: ProductSchemaInfo[]; total?: number }> => {
    const param = {
      productID,
      page: {
        size: params.pageSize,
        page: params.current,
      },
    };
    const res = await postApiV1ThingsProductSchemaIndex(param);
    if (res instanceof Response) {
      return {
        data: [],
        total: 0,
      };
    }

    return {
      data: res?.data?.list,
      total: res?.data?.total,
    };
  };

  const handleOk = async () => {
    if (jsonError) {
      message.error('JSON输入存在错误，请检查格式');
      return;
    }
    const params = {
      productID,
      tsl,
    };
    const res = await postApiV1ThingsProductSchemaTslImport(params);
    if (res instanceof Response) {
      return;
    }
    setIsImportModalVisible(false);

    message.success('导入成功');
    actionRef.current?.reload();
    setTsl('');
  };

  const handleCancel = () => {
    setIsImportModalVisible(false);
    setTsl('');
  };

  const handleExportCancel = () => {
    setIsExportModalVisible(false);
  };

  const download = async () => {
    const filename = 'tls.json';
    const content = JSON.stringify(exportJSON);
    downloadFunction(content, filename);
  };

  const importModal = (
    <Modal title="导入物模型" open={isImportModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Alert message="注意：导入新的JSON后原产品的数据模板将会被覆盖" type="info" showIcon />
      <div style={{ margin: '10px 0' }}>
        <Input.TextArea
          value={tsl}
          rows={15}
          onChange={(e) => {
            const text = e.target.value;
            const flag = isJSON(text);
            setJsonError(!flag);
            setTsl(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
  const exportModal = (
    <Modal
      title="查看物模型JSON"
      footer={null}
      open={isExportModalVisible}
      onCancel={handleExportCancel}
    >
      <div className={styles['action-wrap']}>
        <div>下方是为标准功能和自定义功能自动生成的JSON格式协议</div>
        <div>
          <DownloadOutlined className={styles.btn} onClick={download} />
          <CopyToClipboard
            text={JSON.stringify(exportJSON)}
            onCopy={() => {
              message.success('复制成功');
            }}
          >
            <CopyOutlined className={styles.btn} />
          </CopyToClipboard>
        </div>
      </div>
      <div style={{ margin: '10px 0' }}>
        <JSONInput
          id="a_unique_id"
          viewOnly={true}
          colors={{
            default: '#000',
            background: '#fff',
            string: '#000',
            number: '#000',
            colon: '#000',
            keys: '#000',
          }}
          placeholder={exportJSON}
          style={{
            body: {
              border: '1px solid #000',
            },
          }}
          locale={locale}
          height="550px"
        />
      </div>
    </Modal>
  );

  return (
    <>
      <Button
        style={{ marginRight: 10 }}
        key="show"
        type="primary"
        onClick={() => {
          modelModalRef.current.createModel();
        }}
      >
        新建自定义功能
      </Button>
      <Button
        type="primary"
        style={{ marginRight: 10 }}
        onClick={() => {
          setIsImportModalVisible(true);
        }}
      >
        导入物模型
      </Button>
      <Button
        style={{ marginRight: 10 }}
        onClick={async () => {
          const res = await postApiV1ThingsProductSchemaTslRead({ productID });
          if (res instanceof Response) {
            return;
          }
          setExportJSON(JSON.parse(res?.data?.tsl) ?? {});

          setIsExportModalVisible(true);
        }}
      >
        查看物模型JSON
      </Button>
      <ProTable<ProductSchemaInfo>
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        actionRef={actionRef}
        dateFormatter="string"
        headerTitle="自定义功能"
        request={queryList}
      />
      <EditForm
        modalVisit={modalVisit}
        setModalVisit={setModalVisit}
        ref={modelModalRef}
        actionRef={actionRef}
      />
      {importModal} {exportModal}
    </>
  );
};
