import { postThingsDeviceInfoUpdate } from '@/services/iThingsapi/shebeiguanli';
import { InfoCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Col, Form, message, Row, Space, Tooltip } from 'antd';
import { useCallback, useRef, useState } from 'react';
import type { DeviceInfo, TagsInfo } from '../../data';
import styles from '../../index.less';

interface ModalProps {
  deviceInfo: DeviceInfo;
  refresh: () => void;
}

interface Tags {
  tags: TagsInfo[];
}

const modalTitle = (
  <Row>
    <Col>编辑标签</Col>
    <Col>
      <Tooltip title="每个设备的标签数量不得超过10个">
        <InfoCircleOutlined className={styles.icon} />
      </Tooltip>
    </Col>
  </Row>
);

const EditForm: React.FC<ModalProps> = (props) => {
  const { deviceInfo, refresh } = props;
  const formRef = useRef<ProFormInstance>();

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const openEditModal = () => {
    setVisible(true);
  };

  /** 校验标签key是否重复 */
  const checkRepeat = useCallback((_, value: string) => {
    const tags = formRef.current?.getFieldValue('tags');
    const result = tags.filter((item: TagsInfo) => item.key === value).length > 1;
    if (result) {
      return Promise.reject('标签key不能重复');
    }
    return Promise.resolve();
  }, []);

  const handleSubmit = async (value: Tags) => {
    const body = {
      ...value,
      productID: deviceInfo.productID ?? '',
      deviceName: deviceInfo.deviceName ?? '',
    };
    return postThingsDeviceInfoUpdate(body)
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
    <ModalForm<Tags>
      title={modalTitle}
      visible={visible}
      formRef={formRef}
      initialValues={{ tags: deviceInfo?.tags }}
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
      <Form.List
        name="tags"
        rules={[
          {
            validator: async (_, names) => {
              setDisabled(names.length >= 10);
              return Promise.resolve();
            },
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <ProFormText
                  {...restField}
                  name={[name, 'key']}
                  placeholder="请输入标签key"
                  rules={[{ required: true, message: '必填项' }, { validator: checkRepeat }]}
                />
                <ProFormText
                  {...restField}
                  name={[name, 'value']}
                  placeholder="请输入标签value"
                  rules={[{ required: true, message: '必填项' }]}
                />
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                className={styles['add-btn']}
                disabled={disabled}
                type="link"
                onClick={() => add()}
              >
                添加新标签
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </ModalForm>
  );
};

export default EditForm;
