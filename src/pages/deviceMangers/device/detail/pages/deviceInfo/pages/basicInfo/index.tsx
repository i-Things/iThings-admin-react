import { milliTdToDate } from '@/utils/date';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns } from '@ant-design/pro-table';
import type { DeviceInfo } from '../../data';
import styles from '../../index.less';

interface InfoProps {
  deviceInfo: DeviceInfo;
}

const STATUS = new Map([
  [1, '离线'],
  [2, '在线'],
]);

const columns: ProColumns<DeviceInfo>[] = [
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
    render: (_, record) => {
      return milliTdToDate(record.createdTime || '', 'YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '最后上线时间',
    key: 'lastLogin',
    dataIndex: 'lastLogin',
    render: (_, record) => {
      return milliTdToDate(record.lastLogin || '', 'YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '激活时间',
    key: 'firstLogin',
    dataIndex: 'firstLogin',
    render: (_, record) => {
      return milliTdToDate(record.firstLogin || '', 'YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '设备状态',
    key: 'isOnline',
    dataIndex: 'isOnline',
    valueType: 'select',
    render: (_, record) =>
      record.firstLogin === '0' ? '未激活' : STATUS.get(record.isOnline || 0),
  },
  {
    title: '固件版本',
    key: 'version',
    dataIndex: 'version',
  },
];

const BasicInfoPage: React.FC<InfoProps> = (props) => {
  const { deviceInfo } = props;
  return (
    <ProDescriptions
      className={styles.descriptions}
      title="设备信息"
      dataSource={deviceInfo}
      colon={false}
      columns={columns}
    />
  );
};

export default BasicInfoPage;
