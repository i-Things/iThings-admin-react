import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import {
  postApiV1SystemRoleCreate,
  postApiV1SystemRoleUpdate,
} from '@/services/iThingsapi/jiaoseguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { RoleListItem } from '../types';

const CreateOrUpdateRole: React.FC<{
  flag: string;
  record?: RoleListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}> = ({ flag, record, actionRef }) => {
  const { createHandler } = useTableCreate();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);

  const editFormRef = useRef<ProFormInstance>();
  type CreateProp = typeof postApiV1SystemRoleCreate;
  type UpdateProp = typeof postApiV1SystemRoleUpdate;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values: RoleListItem) => {
    const body = { ...values, id: record?.id as string };
    if (flag === 'update')
      await updateHandler<UpdateProp, RoleListItem>(postApiV1SystemRoleUpdate, actionRef, body);
    else await createHandler<CreateProp, RoleListItem>(postApiV1SystemRoleCreate, actionRef, body);
    onClose();
    editFormRef.current?.resetFields();
  };

  useEffect(() => {
    editFormRef.current?.setFieldsValue(record);
  }, [editFlag, record]);
  return (
    <ModalForm<RoleListItem>
      width={550}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑角色信息' : '创建角色'}
      trigger={
        <Button
          type={flag === 'update' ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? '编辑' : '新增'}
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
      <ProFormText
        name="name"
        width="md"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[
          {
            required: true,
            message: '角色名称是必填项！',
          },
        ]}
      />
      <ProFormTextArea name="remark" width="md" label="备注" placeholder="请输入备注" />
    </ModalForm>
  );
};

export default CreateOrUpdateRole;
