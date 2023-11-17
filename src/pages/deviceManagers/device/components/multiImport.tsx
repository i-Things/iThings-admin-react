// @ts-ignore
import url from '@/assets/template/iThings-设备导入模板.csv';
import type { DEVICE_INFO, PRODUCT_INFO } from '@/utils/const';
import { TOKENKEY } from '@/utils/const';
import { downloadFile, getToken } from '@/utils/utils';
import { ImportOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProFormRadio, ProFormUploadButton } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import { Badge, Button, Col, message, Row, Spin, Tooltip, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
interface Props {
  productValues?: PRODUCT_INFO[];
  onCommit: () => void;
}

interface ReturnFileData {
  total: number;
  headers: csvDataProps;
  errdata: csvDataProps[];
}
interface csvDataProps {
  row?: number;
  productName: string;
  deviceName: string;
  logLevel: string;
  tags: string;
  position: string;
  address: string;
  tips: string;
}

const { Text } = Typography;

export const MultiImport: React.FC<Props> = ({ onCommit }) => {
  const [importVisible, setImportVisible] = useState<boolean>(false);
  const [fileTypeData, setFileTypeData] = useState<{
    autoDeploy: boolean;
    fileType: 'xlsx' | 'csv';
  }>({
    autoDeploy: false,
    fileType: 'csv',
  });

  const [importLoading, setImportLoading] = useState(false);
  const [flag, setFlag] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);
  const [code, setCode] = useState<number>(0);
  const [errMessage, setErrMessage] = useState<csvDataProps[]>([]);
  const [headers, setHeaders] = useState<{ label: string; key: string }[]>([]);
  const [closeErrFlag, setCloseErrFlag] = useState(false);

  const formRef = useRef<ProFormInstance<DEVICE_INFO>>();

  const submitData = async (fileUrl: ReturnFileData) => {
    if (!!fileUrl) {
      setCloseErrFlag(false);
      setImportLoading(false);
      let dt = 0;
      const temp = fileUrl.total;
      dt += temp;
      setCount(dt);
      const headerArr: { label: string; key: string }[] = [];
      for (const key in fileUrl.headers) {
        if (key !== 'row') headerArr.push({ label: fileUrl.headers[key], key });
      }
      let errdata;
      if (fileUrl.errdata) {
        errdata = fileUrl.errdata
          .sort((a, b) => (a?.row as number) - (b?.row as number))
          .map((data) => {
            delete data.row;
            return data;
          });
      }

      setHeaders(headerArr);
      setErrMessage(errdata ?? []);
    } else {
      setImportLoading(false);
      message.error({ content: '请先上传文件' });
    }
  };

  const onCancel = () => {
    onCommit();
    setImportVisible(false);
  };

  const handleClick = () => setCloseErrFlag(true);

  useEffect(() => {
    setFlag(false);
    setCount(0);
  }, [importVisible, onCommit]);

  // 导入成功则关闭弹窗
  useEffect(() => {
    if (!errMessage.length && code === 200) onCancel();
  }, [errMessage.length, code]);

  const formItemLayout = {
    visible: importVisible,
    formRef: formRef,
    width: 520,
  };
  return (
    <>
      <ModalForm<DEVICE_INFO>
        {...formItemLayout}
        title="批量导入"
        layout="horizontal"
        modalProps={{
          onCancel: onCancel,
        }}
        trigger={
          <Button
            icon={<ImportOutlined />}
            onClick={() => {
              setImportVisible(true);
            }}
          >
            批量导入设备
          </Button>
        }
        submitTimeout={2000}
        submitter={{
          render: () => {
            return [
              <Button type="primary" key="extra-reset" onClick={onCancel}>
                关闭
              </Button>,
            ];
          },
        }}
      >
        <Spin spinning={importLoading}>
          <Row>
            <Col span={16} push={2}>
              <ProFormRadio.Group
                name="fileFormat"
                width="md"
                label="文件格式"
                options={[
                  {
                    label: 'csv',
                    value: 'csv',
                  },
                ]}
                rules={[
                  {
                    required: true,
                    message: '必填项！',
                  },
                ]}
                fieldProps={{
                  defaultValue: 'csv',
                  buttonStyle: 'solid',
                  optionType: 'button',
                  onChange: (e) => {
                    setFileTypeData({
                      ...fileTypeData,
                      fileType: e.target.value,
                    });
                  },
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col push={2}>
              <ProFormUploadButton
                name="upload"
                width="md"
                label={
                  <Tooltip title="单次最多添加1000台，文件大小小于700kb">
                    <span style={{ marginRight: '5px' }}>批量文件上传</span>
                    <QuestionCircleOutlined />
                  </Tooltip>
                }
                rules={[
                  {
                    required: true,
                    message: '必填项！',
                  },
                ]}
                action={`/api/v1/things/device/info/multi-import`}
                accept=".csv"
                fieldProps={{
                  headers: {
                    [TOKENKEY]: getToken(),
                  },
                  beforeUpload: (file) => {
                    const fileType = fileTypeData?.fileType === 'csv' ? 'csv' : 'xlsx';
                    const isCsv =
                      file.type === 'text/csv' || file.type === 'application/vnd.ms-excel';
                    const size = file.size;
                    if (size > 1024 * 700) {
                      message.warning({ content: '文件大小须小于5MB' });
                    }
                    if (!isCsv && file.name.split('.')[1] === 'csv') {
                      message.warning({ content: '请上传.csv格式文件' });
                    }

                    return isCsv && fileType === 'csv';
                  },
                  onChange: async (info) => {
                    setImportLoading(true);
                    if (info.file.status === 'done') {
                      const resp: any = (await info.file.response) || { result: '' };
                      setCode(resp?.code);
                      if (!resp?.data) return setFlag(true);
                      await submitData(resp?.data || '');
                    }
                  },
                  showUploadList: false,
                }}
                buttonProps={{
                  onClick: handleClick,
                }}
              />
            </Col>
            <Col push={2}>
              <div style={{ marginLeft: 20, height: '32px', lineHeight: '32px' }}>
                下载模板
                <a
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    downloadFile(url);
                  }}
                >
                  .csv
                </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col push={2}>
              {!!count && !closeErrFlag && (
                <>
                  <div style={{ display: 'flex', marginBottom: '15px' }}>
                    <Badge status="success" text="已完成" />

                    <div style={{ margin: '0 10px' }}>总数量：{count}</div>
                    <div>
                      (<Text type="success"> 成功：{count - errMessage?.length} </Text>
                      <Text type="danger"> 失败：{errMessage?.length} </Text>)
                    </div>
                  </div>
                  {!!errMessage?.length && (
                    <CSVLink
                      data={errMessage}
                      headers={headers}
                      style={{ marginLeft: '10px' }}
                      filename={`iThings批量导入错误信息|${moment().format('YYYY-MM-DD HH:mm:ss')}`}
                      // onClick={onCancel}
                    >
                      点击下载失败清单，修改后重新上传
                    </CSVLink>
                  )}
                </>
              )}
              {flag && <Text type="danger"> 最多只能导入1000条数据</Text>}
            </Col>
          </Row>
        </Spin>
      </ModalForm>
    </>
  );
};
