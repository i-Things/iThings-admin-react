import { levelMap } from '@/pages/alarmMangers/alarmConfiguration';
import { useSearchParams } from '@umijs/max';
import { Descriptions, Modal } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import ReactJson from 'react-json-view';
import type { AlarmLogInfo } from '../../data';

interface DetailsModalProps {
  open: boolean;
  data?: AlarmLogInfo;
  level: number;
  onCancel: () => void;
}
const DetailsModal: FC<DetailsModalProps> = (props) => {
  const { open, data, level, onCancel } = props;

  const [searchParams] = useSearchParams();
  const alarmName = searchParams.get('name');

  return (
    <Modal open={open} width={1000} onCancel={onCancel}>
      <Descriptions title="详情" bordered column={2}>
        <Descriptions.Item label="告警名称">{alarmName}</Descriptions.Item>
        <Descriptions.Item label="告警时间">
          {moment(data?.createdTime).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="告警级别">{levelMap.get(level)?.text}</Descriptions.Item>
        <Descriptions.Item label="告警说明">{data?.desc}</Descriptions.Item>
        <Descriptions.Item label="告警流水">
          <ReactJson
            src={data?.serial ? JSON.parse(data?.serial) : {}}
            enableClipboard={false}
            name={false}
          />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DetailsModal;
