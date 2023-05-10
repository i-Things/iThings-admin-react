import { FileOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Badge, Button, Col, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { useState } from 'react';
import { levelMap } from '../../alarmConfiguration';
import recordImg from '../../img/alarm-record.png';
import type { RecordList } from './data';
import styles from './index.less';
import AlarmHandle from './pages/alarmHandle';
import HandleRecordModal from './pages/handleRecordModal';

interface AlarmRecordItemProps {
  recordData: Partial<RecordList>;
  alarmName: string;
  refresh: () => void;
}

const statusMap = new Map([
  [1, { node: <Badge status="default" />, text: '无告警', color: 'currentcolor' }],
  [2, { node: <Badge status="error" />, text: '告警中', color: 'rgb(229, 0, 18)' }],
  [3, { node: <Badge status="success" />, text: '已处理', color: '#52c41a' }],
]);

const AlarmRecordItem: React.FC<AlarmRecordItemProps> = ({ recordData, alarmName, refresh }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={styles['alarm-item']}>
        <div className={styles['alarm-content']}>
          <div className={styles['alarm-head']}>
            <div className={styles['alarm-title']}>{alarmName}</div>
            <div
              className={classNames(styles.status)}
              style={{ backgroundColor: levelMap.get(recordData.level || 0)?.bgColor }}
            >
              <div style={{ transform: 'skewX(-45deg)' }}>
                {levelMap.get(recordData.level || 0)?.text}
              </div>
            </div>
          </div>
          <Row className={styles['alarm-info']} gutter={12}>
            <Col className={styles['alarm-type']} span={11}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={recordImg} width={70} height={70} />
                <div style={{ flex: 1, overflow: 'hidden', marginLeft: '12px' }}>
                  <Tooltip title={recordData.deviceName}>
                    <div className={styles['device-name']}>
                      {Number(recordData.triggerType) === 1
                        ? `设备触发(${recordData.deviceName})`
                        : '其他'}
                    </div>
                  </Tooltip>
                  <div className={styles['scene-name']}>{recordData.sceneName}</div>
                </div>
              </div>
            </Col>
            <Col span={9} style={{ paddingLeft: '20px' }}>
              <div className={styles['alarm-text']}>最近告警时间</div>
              <div style={{ marginTop: '4px' }}>
                {moment(recordData.lastAlarm).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </Col>
            <Col span={4}>
              <div className={styles['alarm-text']}>状态</div>
              <div style={{ marginTop: '4px' }}>
                {statusMap.get(recordData.dealState || 0)?.node}
                <span
                  style={{
                    color: statusMap.get(recordData.dealState || 0)?.color,
                    marginLeft: '4px',
                  }}
                >
                  {statusMap.get(recordData.dealState || 0)?.text}
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.operation}>
          <AlarmHandle id={recordData.id} state={recordData.dealState} refresh={refresh} />
          <Link
            style={{ flex: 1 }}
            to={`/alarmMangers/alarmConfiguration/log/detail/${recordData.id}/${recordData.level}?name=${alarmName}`}
          >
            <Button className={styles.btn} icon={<FileOutlined />}>
              告警日志
            </Button>
          </Link>
          <Button className={styles.btn} icon={<FileTextOutlined />} onClick={() => setOpen(true)}>
            处理记录
          </Button>
        </div>
      </div>
      <HandleRecordModal open={open} id={recordData.id} onCancel={() => setOpen(false)} />
    </div>
  );
};

export default AlarmRecordItem;
