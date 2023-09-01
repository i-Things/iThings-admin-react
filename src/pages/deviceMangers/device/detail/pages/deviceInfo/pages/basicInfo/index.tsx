import { timestampToDateStr } from '@/utils/date';
import { isOnlineEnum } from '@/utils/utils';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import type { DeviceInfo } from '../../data';
import styles from '../../index.less';
import EditForm from './editForm';
interface InfoProps {
  deviceInfo: Partial<DeviceInfo>;
  refresh: () => void;
}

const useColumns = (deviceInfo: Partial<DeviceInfo>, refresh: () => void) => {
  return [
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
      title: '设备别名',
      key: 'deviceAlias',
      dataIndex: 'deviceAlias',
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
      title: '移动运营商',
      key: 'mobileOperator',
      dataIndex: 'mobileOperator',
      valueType: 'select',
      valueEnum: {
        1: { text: '移动' },
        2: { text: '联通' },
        3: { text: '电信' },
        4: { text: '广电' },
      },
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'SIM卡卡号',
      key: 'iccid',
      dataIndex: 'iccid',
    },
    {
      title: '所属用户id',
      key: 'userID',
      dataIndex: 'userID',
    },
    {
      title: '设备状态',
      key: 'isOnline',
      dataIndex: 'isOnline',
      valueType: 'select',
      valueEnum: isOnlineEnum(deviceInfo),
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [<EditForm refresh={refresh} key="link" deviceInfo={deviceInfo} />],
    },
  ] as ProColumns<Partial<DeviceInfo>>[];
};

const BasicInfoPage: React.FC<InfoProps> = (props) => {
  const { deviceInfo, refresh } = props;

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

  const columns = useColumns(deviceInfo, refresh);

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
