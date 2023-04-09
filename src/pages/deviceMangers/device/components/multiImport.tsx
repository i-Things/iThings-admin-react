// @ts-ignore
import url from '@/assets/template/iThings-设别导入模板.csv';
import type { DEVICE_INFO, PRODUCT_INFO } from '@/utils/const';
import { TOKENKEY } from '@/utils/const';
import { downloadFile, getToken } from '@/utils/utils';
import { ImportOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProFormRadio, ProFormUploadButton } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { Badge, Button, Col, message, Row, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  productValues?: PRODUCT_INFO[];
  onCommit: () => void;
}

interface ReturnFileData {
  total: number;
  errdata: errMessageProps[];
}
interface errMessageProps {
  row: number;
  msg: string;
}

export const MultiImport: React.FC<Props> = ({ onCommit, productValues }) => {
  const [importVisible, setImportVisible] = useState<boolean>(false);
  const [fileTypeData, setFileTypeData] = useState<{
    autoDeploy: boolean;
    fileType: 'xlsx' | 'csv';
  }>({
    autoDeploy: false,
    fileType: 'csv',
  });

  const [productForm, setProductForm] = useState<{ label: string; value: string }[]>();

  const [importLoading, setImportLoading] = useState(false);
  const [flag, setFlag] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [errMessage, setErrMessage] = useState<errMessageProps[] | null>([]);

  const formRef = useRef<ProFormInstance<DEVICE_INFO>>();

  const initForm = () => {
    if (productValues === undefined || productValues.length == 0) {
      return;
    }
    const ret: { label: string; value: string }[] = [];
    productValues?.map((item) => {
      if (item.productID != undefined) {
        ret.push({ label: item?.productName ?? '-', value: item?.productID ?? '-' });
      }
    });
    setProductForm(ret);
    formRef.current?.setFieldsValue({
      productID: productValues[0].productID,
      logLevel: 1,
    });
  };

  const submitData = async (fileUrl: ReturnFileData) => {
    setCount(0);
    setErrMessage([]);
    setFlag(true);
    // const autoDeploy = !!fileTypeData?.autoDeploy || false;
    setImportLoading(true);
    if (!!fileUrl) {
      setFlag(false);
      let dt = 0;
      const temp = fileUrl.total;
      dt += temp;
      setCount(dt);
      setErrMessage(fileUrl.errdata.sort((a, b) => a.row - b.row));
    } else {
      message.error({ content: '请先上传文件' });
    }
  };
  useEffect(() => {
    initForm();
    setImportLoading(false);
  }, [productValues, importVisible]);

  useEffect(() => {
    console.log(errMessage);

    if (errMessage === null) {
      setImportVisible(false);
      onCommit();
    }
  }, [errMessage, onCommit]);

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
          onCancel: () => setImportVisible(false),
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
              <Button
                type="primary"
                key="extra-reset"
                onClick={() => {
                  setImportVisible(false);
                }}
              >
                关闭
              </Button>,
            ];
          },
        }}
      >
        <Row>
          <Col push={2}>
            <ProFormSelect
              name="productID"
              width="md"
              label="产品名称"
              disabled={productValues?.length == 1}
              rules={[
                {
                  required: true,
                  message: '必填项！',
                },
              ]}
              request={async () => (productForm == undefined ? [] : productForm)}
            />
          </Col>
        </Row>

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
                  // props.onChange({
                  //   ...data,
                  //   fileType: e.target.value,
                  // });
                },
              }}
            />
          </Col>
          {/* <Col pull={6}>
            <ProFormCheckbox
              fieldProps={{
                onChange: (e) => {
                  setFileTypeData({
                    ...fileTypeData,
                    fileType: e.target.value,
                  });
                  // props.onChange({
                  //   ...data,
                  //   autoDeploy: e.target.checked,
                  // });
                },
              }}
            >
              自动启用
            </ProFormCheckbox>
          </Col> */}
        </Row>
        <Row>
          <Col push={2}>
            <ProFormUploadButton
              name="upload"
              width="md"
              label={
                <Tooltip title="单次最多添加10000台，文件大小小于700kb">
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
                  console.log('-----', file);
                  const fileType = fileTypeData?.fileType === 'csv' ? 'csv' : 'xlsx';
                  const isCsv = file.type === 'text/csv';
                  const size = file.size;
                  if (size > 1024 * 700) {
                    message.warning({ content: '文件大小须小于700kb' });
                  }
                  if (!isCsv) {
                    message.warning({ content: '请上传.csv格式文件' });
                  }

                  return isCsv && fileType === 'csv';
                },
                onChange: async (info) => {
                  if (info.file.status === 'done') {
                    const resp: any = info.file.response || { result: '' };
                    await submitData(resp?.data || '');
                  }
                },
                showUploadList: false,
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
        <div>
          {importLoading && (
            <div style={{ marginLeft: 20 }}>
              {flag ? (
                <Badge status="processing" text="进行中" />
              ) : (
                <Badge status="success" text="已完成" />
              )}
              <span style={{ marginLeft: 15 }}>总数量:{count}</span>
              {errMessage?.length &&
                Array.isArray(errMessage) &&
                errMessage.map((item) => (
                  <p style={{ color: 'red' }} key={item?.msg}>{`第${item?.row}行: ${item?.msg}`}</p>
                ))}
            </div>
          )}
        </div>
      </ModalForm>
    </>
  );
};
