import { timestampToDateStr } from '@/utils/date';
import { isOnlineEnum } from '@/utils/utils';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import type { DeviceInfo } from '../../data';
import styles from '../../index.less';

interface InfoProps {
  deviceInfo: Partial<DeviceInfo>;
}

const BasicInfoPage: React.FC<InfoProps> = (props) => {
  const { deviceInfo } = props;

  /** 要复制的内容 */
  const copyText = useMemo(() => {
    return deviceInfo
      ? JSON.stringify({
          设备名称: deviceInfo.deviceName,
          产品ID: deviceInfo.productID,
          密钥: deviceInfo.secret,
        })
      : '';
  }, [deviceInfo]);

  const columns: ProColumns<Partial<DeviceInfo>>[] = [
    {
      title: '设备名称',
      key: 'deviceName',
      dataIndex: 'deviceName',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '产品ID',
      key: 'productID',
      dataIndex: 'productID',
      copyable: true,
    },
    {
      title: '设备密钥',
      key: 'secret',
      dataIndex: 'secret',
      copyable: true,
    },
    {
      title: '设备创建时间',
      key: 'createdTime',
      dataIndex: 'createdTime',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '最后上线时间',
      key: 'lastLogin',
      dataIndex: 'lastLogin',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: '激活时间',
      key: 'firstLogin',
      dataIndex: 'firstLogin',
      renderText: (text: string) => timestampToDateStr(Number(text)),
    },
    {
      title: 'IMEI',
      key: 'imei',
      dataIndex: 'imei',
    },
    {
      title: 'MAC',
      key: 'mac',
      dataIndex: 'mac',
    },
    {
      title: '固件版本',
      key: 'version',
      dataIndex: 'version',
    },
    {
      title: '硬件信息',
      key: 'hardInfo',
      dataIndex: 'hardInfo',
    },
    {
      title: '软件信息',
      key: 'softInfo',
      dataIndex: 'softInfo',
    },
    {
      title: '设备状态',
      key: 'isOnline',
      dataIndex: 'isOnline',
      valueType: 'select',
      valueEnum: isOnlineEnum(deviceInfo),
    },
  ];
  return (
    <ProDescriptions
      className={styles.descriptions}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>设备信息</div>
          <CopyToClipboard
            text={copyText}
            onCopy={() => {
              message.success('复制成功');
            }}
          >
            <Button type="link">一键复制</Button>
          </CopyToClipboard>
        </div>
      }
      dataSource={deviceInfo}
      colon={false}
      columns={columns}
    />
  );
};

export default BasicInfoPage;
