import type { TagsInfo } from '@/pages/deviceMangers/product/data';
import { postApiV1ThingsProductInfoUpdate } from '@/services/iThingsapi/chanpinguanli';
import { FlagStatus } from '@/utils/base';
import type { PRODUCT_INFO } from '@/utils/const';
import { DownOutlined, InfoCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Col, Form, message, Row, Space, Tooltip } from 'antd';
import { useCallback, useRef, useState } from 'react';
import styles from '../index.less';

interface ModalProps {
  productInfo?: PRODUCT_INFO;
  refresh?: () => void;
  flag: FlagStatus;
  changeTags?: (val: TagsInfo[]) => void;
}

interface Tags {
  tags: TagsInfo[];
}

const ModalTitle: React.FC<{ flag: FlagStatus }> = ({ flag }) => {
  return (
    <>
      {flag === FlagStatus.CREATE ? (
        '标签筛选'
      ) : (
        <Row>
          <Col>编辑标签</Col>
          <Col>
            <Tooltip title="每个设备的标签数量不得超过10个">
              <InfoCircleOutlined className={styles.icon} />
            </Tooltip>
          </Col>
        </Row>
      )}
    </>
  );
};

const ProductTagsModal: React.FC<ModalProps> = (props) => {
  const { productInfo, refresh, flag, changeTags } = props;
  const formRef = useRef<ProFormInstance>();
  const tagFormRef = useRef<ProFormInstance>();

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const openEditModal = () => {
    setVisible(true);
  };

  /** 校验标签key是否重复 */
  const checkRepeat = useCallback((_, value: string) => {
    if (value) {
      const tagsVal = formRef.current?.getFieldValue('tags');
      const result = tagsVal?.filter((item: TagsInfo) => item?.key === value).length > 1;
      if (result) {
        return Promise.reject('标签key不能重复');
      }
    }
    return Promise.resolve();
  }, []);

  const handleSubmit = async (value: Tags) => {
    if (flag === FlagStatus.CREATE) {
      const tagArr = value?.tags?.map((item) => `${item.key}:${item.value}`);
      const tagStr = tagArr.join(';');
      tagFormRef.current?.setFieldsValue({ tags: tagStr });
      changeTags?.(value.tags);
      setVisible(false);
      return;
    }
    const body = {
      ...value,
      productID: productInfo?.productID ?? '',
    };
    return postApiV1ThingsProductInfoUpdate(body)
      .then((res) => {
        setVisible(false);
        if (res.code === 200) {
          message.success('提交成功');
          refresh?.();
        }
        return true;
      })
      .catch(() => {
        message.success('提交失败');
      });
  };

  return (
    <ModalForm<Tags>
      title={<ModalTitle flag={flag} />}
      visible={visible}
      formRef={formRef}
      initialValues={{ tags: productInfo?.tags }}
      width={550}
      modalProps={{
        onCancel: () => setVisible(false),
        destroyOnClose: flag === FlagStatus.UPDATE,
        wrapClassName: styles.modal,
      }}
      trigger={
        flag === FlagStatus.UPDATE ? (
          <Button type="link" onClick={openEditModal}>
            编辑
          </Button>
        ) : (
          <ProForm
            formRef={tagFormRef}
            onClick={openEditModal}
            submitter={{
              // 配置按钮的属性
              resetButtonProps: {
                style: {
                  // 隐藏重置按钮
                  display: 'none',
                },
              },
              submitButtonProps: {},
              // 完全自定义整个区域
              render: () => [],
            }}
          >
            <ProFormText
              name="tags"
              placeholder="请选择"
              fieldProps={{
                suffix: <DownOutlined />,
                readOnly: true,
              }}
            />
          </ProForm>
        )
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
        initialValue={[{}]}
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

export default ProductTagsModal;
