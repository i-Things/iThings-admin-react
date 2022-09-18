import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns } from '@ant-design/pro-table';
import type { DeviceInfo } from '../../data';
import styles from '../../index.less';
import EditForm from './editForm';

interface InfoProps {
  deviceInfo: DeviceInfo;
  refresh: () => void;
}

const useColumns = (deviceInfo: DeviceInfo, refresh: () => void) => {
  return [
    {
      title: '设备标签',
      key: 'deviceName',
      dataIndex: 'deviceName',
      render: (_, record) =>
        record?.tags?.map((item) => (
          <span className={styles.tags} key={item.key}>
            {item.key + ':' + item.value}
          </span>
        )) || '无标签信息',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [<EditForm refresh={refresh} key="link" deviceInfo={deviceInfo} />],
    },
  ] as ProColumns<DeviceInfo>[];
};

const TagsInfoPage: React.FC<InfoProps> = (props) => {
  const { deviceInfo, refresh } = props;

  const columns = useColumns(deviceInfo, refresh);

  return (
    <ProDescriptions
      className={`${styles.descriptions} ${styles['tags-info']}`}
      title="标签信息"
      dataSource={deviceInfo}
      colon={false}
      columns={columns}
    />
  );
};

export default TagsInfoPage;
