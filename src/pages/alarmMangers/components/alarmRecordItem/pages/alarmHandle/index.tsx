import { postApiV1ThingsRuleAlarmDealRecordCreate } from '@/services/iThingsapi/chulijilu';
import { ResponseCode } from '@/utils/base';
import { ToolOutlined } from '@ant-design/icons';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message, Tooltip } from 'antd';
import styles from '../../index.less';

interface AlarmHandleProps {
  id?: number;
  state?: number;
  refresh: () => void;
}

interface AlarmHandleInfo {
  result: string;
}

/** 告警处理 */
const AlarmHandle: React.FC<AlarmHandleProps> = ({ id, state, refresh }) => {
  const handleFinish = async (val: AlarmHandleInfo) => {
    try {
      const { code } = await postApiV1ThingsRuleAlarmDealRecordCreate({
        ...val,
        alarmRecordID: id || 0,
      });
      if (code === ResponseCode.SUCCESS) {
        message.success('处理成功');
        refresh();
      }
    } catch (error) {
      message.error((error as Error).message);
    }
    return true;
  };

  return (
    <ModalForm<AlarmHandleInfo>
      title="告警处理"
      trigger={
        <Tooltip title={state !== 2 && '无告警'}>
          <Button disabled={state !== 2} className={styles.btn} icon={<ToolOutlined />}>
            告警处理
          </Button>
        </Tooltip>
      }
      onFinish={handleFinish}
    >
      <ProFormTextArea
        name="result"
        label="处理结果"
        placeholder="请输入处理结果"
        rules={[{ required: true }]}
      />
    </ModalForm>
  );
};

export default AlarmHandle;
