import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemUserCreate, postSystemUserUpdate } from '@/services/iThingsapi/yonghuguanli';
import { FlagStatus } from '@/utils/base';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormGroup, ProFormList, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { GroupListItem, GroupOption } from '../types';

// const { Option } = Select;
const GroupTags: React.FC<{
  flag: string;
  record?: GroupListItem;
  actionRef?: React.MutableRefObject<ActionType | undefined>;
  cascaderOptions?: GroupOption[];
  flatOptions: GroupListItem[];
}> = ({ flag, record, actionRef }) => {
  const { createHandler } = useTableCreate();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();
  const editFormRef = useRef<ProFormInstance>();
  type CreateProp = typeof postSystemUserCreate;
  type UpdateProp = typeof postSystemUserUpdate;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const initialValues = {
    ...record,
    groupType: '默认',
  };

  const formSubmit = async (values: GroupListItem) => {
    const body = { ...values, reqType: 'pwd' };
    if (flag === 'update')
      await updateHandler<UpdateProp, GroupListItem>(postSystemUserUpdate, actionRef, {
        ...body,
        // uid: record?.uid as string,
      });
    else await createHandler<CreateProp, GroupListItem>(postSystemUserCreate, actionRef, body);
    onClose();
    editFormRef.current?.resetFields();
  };
  useEffect(() => {
    editFormRef.current?.setFieldsValue(initialValues);
  }, [editFlag, record]);
  return (
    <ModalForm<GroupListItem>
      formRef={editFormRef}
      width={550}
      title={flag === FlagStatus.CREATE ? '标签筛选' : '编辑标签'}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? (
            '编辑'
          ) : (
            <>
              <PlusOutlined /> 新建分组
            </>
          )}
        </Button>
      }
      visible={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: onClose,
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={formSubmit}
    >
      <ProFormList
        name="tags"
        label="分组标签"
        min={1}
        // deleteIconProps={{
        //   Icon: CloseCircleOutlined,
        //   tooltipText: '不需要这行了',
        // }}
        creatorButtonProps={{
          type: 'link',
          icon: <PlusOutlined />,
          size: 'small',
          position: 'top',
          creatorButtonText: '新增标签',
        }}
      >
        <ProFormGroup key="group">
          <ProFormText name="key" placeholder="请输入标签key" />
          <ProFormText name="value" placeholder="请输入标签value" />
        </ProFormGroup>
      </ProFormList>
    </ModalForm>
  );
};

export default GroupTags;
