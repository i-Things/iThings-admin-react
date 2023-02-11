import useTableUpdate from '@/hooks/useTableUpdate';
import { postApiV1ThingsGroupInfoUpdate } from '@/services/iThingsapi/shebeifenzu';
import { FlagStatus } from '@/utils/base';
import { LAYOUT_TYPE_VERTICAL } from '@/utils/const';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ModalForm, ProFormGroup, ProFormList, ProFormText } from '@ant-design/pro-form';
import { Button } from 'antd';
import PubSub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import '../styles.less';
import type { GroupDescriptonProps, groupSearchParmasProps, TagProps } from './types';

const GroupTags: React.FC<{
  flag: FlagStatus;
  searchParamsHandler?: (
    cb: groupSearchParmasProps | ((pre: groupSearchParmasProps) => groupSearchParmasProps),
  ) => void;
  record?: GroupDescriptonProps;
  updateFlagHandler?: () => void;
}> = ({ flag, searchParamsHandler, record, updateFlagHandler }) => {
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);
  const [groupInfoList, setGroupInfoList] = useState({ groupName: '' });
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>();
  const tagFormRef = useRef<ProFormInstance>();

  type UpdateProp = typeof postApiV1ThingsGroupInfoUpdate;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values: { tags: TagProps[] }) => {
    const tagArr = values?.tags?.map((item) => `${item.key}:${item.value}`);
    const tagStr = tagArr.join(';');
    onClose();
    PubSub.publish('tags', values.tags);
    const body = {
      ...(changeFlag
        ? {
            ...groupInfoList,
            parentID: record?.parentID as string,
            groupID: record?.groupID as string,
          }
        : (record as GroupDescriptonProps)),
      tags: values?.tags || [],
    };
    tagFormRef.current?.setFieldsValue({ tags: tagStr });
    if (flag === FlagStatus.CREATE && searchParamsHandler)
      searchParamsHandler((pre) => {
        return { ...pre, ...values };
      });
    else {
      await updateHandler<UpdateProp, GroupDescriptonProps>(
        postApiV1ThingsGroupInfoUpdate,
        undefined,
        body,
      );
      updateFlagHandler?.();
    }
  };
  useEffect(() => {
    if (searchParamsHandler)
      searchParamsHandler({
        tags: [],
        groupName: '',
      } as groupSearchParmasProps);
    editFormRef.current?.setFieldsValue(record?.tags);
  }, [editFlag, record]);

  useEffect(() => {
    setChangeFlag(false);
    editFormRef.current?.resetFields();
    const token = PubSub.subscribe('groupInfo', (_, data: GroupDescriptonProps) => {
      setChangeFlag(true);
      setGroupInfoList(data);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return (
    <ModalForm<{ tags: TagProps[] }>
      formRef={editFormRef}
      width={550}
      title={flag === FlagStatus.CREATE ? '标签筛选' : '编辑标签'}
      trigger={
        flag === FlagStatus.UPDATE ? (
          <Button
            type="primary"
            onClick={() => {
              setEditFlag(true);
              onOpen();
            }}
          >
            编辑
          </Button>
        ) : (
          <ProForm
            formRef={tagFormRef}
            onClick={onOpen}
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
              className="tags"
              name="tags"
              placeholder="请选择分组标签"
              fieldProps={{
                suffix: <DownOutlined />,
                readOnly: true,
              }}
            />
          </ProForm>
        )
      }
      visible={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: onClose,
      }}
      submitTimeout={2000}
      layout={LAYOUT_TYPE_VERTICAL}
      onFinish={formSubmit}
    >
      <ProFormList
        name="tags"
        label="分组标签"
        initialValue={flag === FlagStatus.UPDATE ? record?.tags : [{ key: '', value: '' }]}
        copyIconProps={false}
        creatorButtonProps={{
          type: 'link',
          icon: <PlusOutlined />,
          size: 'small',
          position: 'bottom',
          creatorButtonText: '新增标签',
        }}
      >
        <ProFormGroup key="group">
          <ProFormText
            name="key"
            placeholder="请输入标签key"
            rules={[
              {
                required: true,
                message: 'key值不可为空',
              },
            ]}
          />
          <ProFormText
            name="value"
            placeholder="请输入标签value"
            rules={[
              {
                required: true,
                message: 'value值不可为空',
              },
            ]}
          />
        </ProFormGroup>
      </ProFormList>
    </ModalForm>
  );
};

export default GroupTags;
