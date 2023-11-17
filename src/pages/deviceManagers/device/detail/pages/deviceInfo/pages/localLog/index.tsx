import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns } from '@ant-design/pro-table';
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
      title: '调试日志',
      key: 'logLevel',
      dataIndex: 'logLevel',
      valueType: 'select',
      valueEnum: {
        1: { text: '关闭' },
        2: { text: '打开' },
        3: { text: '打开' },
        4: { text: '打开' },
        5: { text: '打开' },
      },
    },
    {
      title: '日志等级',
      key: 'logLevel',
      dataIndex: 'logLevel',
      valueType: 'select',
      valueEnum: {
        1: { text: '无' },
        2: { text: 'Level1（错误）' },
        3: { text: 'Level2（告警）' },
        4: { text: 'Level3（信息）' },
        5: { text: 'Level4（调试）' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [<EditForm refresh={refresh} key="link" deviceInfo={deviceInfo} />],
    },
  ] as ProColumns<Partial<DeviceInfo>>[];
};

const LocalLogPage: React.FC<InfoProps> = (props) => {
  const { deviceInfo, refresh } = props;

  const columns = useColumns(deviceInfo, refresh);

  return (
    <ProDescriptions
      className={`${styles.descriptions} ${styles['tags-info']}`}
      title="设备本地日志信息"
      dataSource={deviceInfo}
      colon={false}
      columns={columns}
      column={1}
    />
  );
};

export default LocalLogPage;
