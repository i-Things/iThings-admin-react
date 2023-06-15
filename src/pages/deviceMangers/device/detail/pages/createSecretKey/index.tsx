import CryptoJS from '@/assets/js/crypto-js.min';
import { postApiV1ThingsDeviceInfoRead } from '@/services/iThingsapi/shebeiguanli';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Form, Input, message, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './index.less';

const options = [
  {
    label: 'HMAC-SHA1',
    value: 'HMAC-SHA1',
  },
  {
    label: 'HMAC-SHA256',
    value: 'HMAC-SHA256',
  },
];

const CreateSecretKey = () => {
  const params = useParams() as { id: string; name: string };
  const { id = '', name = '' } = params;

  const [form] = Form.useForm();

  const [info, setInfo] = useState({
    calculatedUserName: '',
    calculatedPassword: '',
    calculatedClientId: '',
  });

  const { data, loading } = useRequest(postApiV1ThingsDeviceInfoRead, {
    defaultParams: [
      {
        productID: id,
        deviceName: name,
      },
    ],
    onError: (error) => {
      message.error('获取设备信息错误:' + error.message);
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data.data);
    }
  }, [data, form]);

  const randomString = (len: number, charSet?: string) => {
    const charSetVal = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomVal = '';
    let randomPoz: number;
    for (let i = 0; i < len; i++) {
      randomPoz = Math.floor(Math.random() * charSetVal.length);
      randomVal += charSetVal.substring(randomPoz, randomPoz + 1);
    }
    return randomVal;
  };

  const onFinish = () => {
    const value = form.getFieldsValue();

    const connid = randomString(5);
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 127;
    const clientId = value.productID + value.deviceName;
    const username = clientId + ';' + '12010126' + ';' + connid + ';' + expiry;
    let token = '';
    let password = '';
    if (value.signmethod === 'HMAC-SHA1') {
      token = (CryptoJS as any).HmacSHA1(
        username,
        (CryptoJS as any).enc.Base64.parse(value.secret),
      );
      password = token + ';' + 'hmacsha1';
    } else {
      token = (CryptoJS as any).HmacSHA256(
        username,
        (CryptoJS as any).enc.Base64.parse(value.secret),
      );
      password = token + ';' + 'hmacsha256';
    }

    setInfo({
      calculatedUserName: username,
      calculatedPassword: password,
      calculatedClientId: clientId,
    });
  };

  return (
    <div className={styles['create-secret-container']}>
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ signmethod: 'HMAC-SHA1' }}
          labelAlign="left"
        >
          <Form.Item label="产品ID" name="productID">
            <Input />
          </Form.Item>
          <Form.Item label="设备名称" name="deviceName">
            <Input />
          </Form.Item>
          <Form.Item label="设备密钥" name="secret">
            <Input />
          </Form.Item>
          <Form.Item label="Hmac签名算法:" name="signmethod">
            <Select options={options} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              生成
            </Button>
          </Form.Item>
        </Form>
        <div>
          <div className={styles['result-item']}>
            <span className={styles['result-text']}>产品ID:</span>
            <span>{data?.data.productID}</span>
          </div>
          <div className={styles['result-item']}>
            <span className={styles['result-text']}>设备名称:</span>
            <span>{data?.data.deviceName}</span>
          </div>
          <div className={styles['result-item']}>
            <span className={styles['result-text']}>客户端id:</span>
            <span>{info.calculatedClientId}</span>
          </div>
          <div className={styles['result-item']}>
            <span className={styles['result-text']}>账号:</span>
            <span>{info.calculatedUserName}</span>
          </div>
          <div className={styles['result-item']}>
            <span className={styles['result-text']}>密码:</span>
            <span>{info.calculatedPassword}</span>
          </div>
        </div>
        <CopyToClipboard
          text={JSON.stringify({
            客户端id: info.calculatedClientId,
            账号: info.calculatedUserName,
            密码: info.calculatedPassword,
          })}
          onCopy={() => {
            message.success('复制成功');
          }}
        >
          <Button type="link" className={styles.btn}>
            一键复制
          </Button>
        </CopyToClipboard>
      </Spin>
    </div>
  );
};

export default CreateSecretKey;
