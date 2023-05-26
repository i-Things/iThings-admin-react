import { postApiV1ThingsDeviceInfoUpdate } from '@/services/iThingsapi/shebeiguanli';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { useMemo, useRef, useState } from 'react';
import type { DeviceInfo } from '../../data';
import styles from '../../index.less';

interface ModalProps {
  deviceInfo: Partial<DeviceInfo>;
  refresh: () => void;
}

const EditForm: React.FC<ModalProps> = (props) => {
  const { deviceInfo, refresh } = props;
  const formRef = useRef<ProFormInstance>();

  const [visible, setVisible] = useState(false);

  const openEditModal = () => {
    setVisible(true);
  };

  const initialValues = useMemo(() => {
    if (deviceInfo?.deviceAlias) {
      return {
        deviceAlias: deviceInfo.deviceAlias,
      };
    }
    return undefined;
  }, [deviceInfo]);

  const handleSubmit = async (value: DeviceInfo) => {
    const body = {
      deviceAlias: value.deviceAlias,
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
    <ModalForm<DeviceInfo>
      title="设置设备信息"
      layout="horizontal"
      visible={visible}
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
      <ProFormText
        width="md"
        name="deviceAlias"
        label="设备别名"
        placeholder="请选择输入设备别名"
      />
    </ModalForm>
  );
};

export default EditForm;
