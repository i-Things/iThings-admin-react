import { postApiV1ThingsDeviceInfoUpdate } from '@/services/iThingsapi/shebeiguanli';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect, ProFormSwitch } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DeviceInfo } from '../../data';
import styles from '../../index.less';

interface ModalProps {
  deviceInfo: Partial<DeviceInfo>;
  refresh: () => void;
}

interface LogInfo {
  log: boolean;
  logLevel: number;
}

const LOG_LEVEL = [
  {
    label: 'Level1（错误）',
    value: 2,
  },
  {
    label: 'Level2（告警）',
    value: 3,
  },
  {
    label: 'Level3（信息）',
    value: 4,
  },
  {
    label: 'Level4（调试）',
    value: 5,
  },
];

const EditForm: React.FC<ModalProps> = (props) => {
  const { deviceInfo, refresh } = props;
  const formRef = useRef<ProFormInstance>();

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const openEditModal = () => {
    setVisible(true);
  };

  // 等级为1 日志关闭
  useEffect(() => {
    if (deviceInfo?.logLevel) {
      setDisabled(deviceInfo.logLevel === 1);
    }
  }, [deviceInfo]);

  const initialValues = useMemo(() => {
    if (deviceInfo?.logLevel) {
      return {
        log: deviceInfo.logLevel !== 1,
        logLevel: deviceInfo.logLevel !== 1 ? deviceInfo.logLevel : undefined,
      };
    }
    return undefined;
  }, [deviceInfo]);

  const handleSubmit = async (value: LogInfo) => {
    const body = {
      logLevel: value.log ? value.logLevel : 1,
      productID: deviceInfo.productID ?? '',
      deviceName: deviceInfo.deviceName ?? '',
    };
    return postApiV1ThingsDeviceInfoUpdate(body)
      .then((res) => {
        setVisible(false);
        if (res.code === 200) {
          message.success('提交成功');
          refresh();
        }
        return true;
      })
      .catch(() => {
        message.success('提交失败');
      });
  };

  return (
    <ModalForm<LogInfo>
      title="设置日志配置"
      layout="horizontal"
      open={visible}
      formRef={formRef}
      initialValues={initialValues}
      width={550}
      modalProps={{
        onCancel: () => setVisible(false),
        destroyOnClose: true,
        wrapClassName: styles.modal,
      }}
      trigger={
        <Button type="link" onClick={openEditModal}>
          编辑
        </Button>
      }
      submitTimeout={2000}
      onFinish={handleSubmit}
    >
      <ProFormSwitch
        name="log"
        label="调试日志"
        fieldProps={{ onChange: (value) => setDisabled(!value) }}
      />
      <ProFormSelect
        disabled={disabled}
        width="md"
        name="logLevel"
        label="日志等级"
        request={async () => LOG_LEVEL}
        placeholder="请选择"
      />
    </ModalForm>
  );
};

export default EditForm;
