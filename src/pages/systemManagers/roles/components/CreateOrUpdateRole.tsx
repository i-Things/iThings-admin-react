import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemRoleCreate, postSystemRoleUpdate } from '@/services/iThingsapi/jiaoseguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useRef } from 'react';
import type { RoleListItem } from '../types';
const CreateOrUpdateRole: React.FC<{
  flag: string;
  record?: RoleListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}> = ({ flag, record, actionRef }) => {
  const { createHandler, createVisible, setCreateVisible } = useTableCreate();
  const { updateHandler, editVisible, setEditVisible } = useTableUpdate();
  const editFormRef = useRef<any>();
  type CreateProp = typeof postSystemRoleCreate;
  type UpdateProp = typeof postSystemRoleUpdate;
  return (
    <ModalForm<RoleListItem>
      width={550}
      initialValues={record}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑角色信息' : '新建角色'}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            if (flag === 'update') setEditVisible(true);
            else setCreateVisible(true);
          }}
        >
          {flag === 'update' ? (
            '编辑'
          ) : (
            <>
              <PlusOutlined /> 新建角色
            </>
          )}
        </Button>
      }
      visible={flag === 'update' ? editVisible : createVisible}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => {
          if (flag === 'update') setEditVisible(false);
          else setCreateVisible(false);
        },
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={async (values) => {
        const body = { ...values, id: record?.id as string };
        if (flag === 'update')
          await updateHandler<UpdateProp, RoleListItem>(postSystemRoleUpdate, actionRef, body);
        else await createHandler<CreateProp, RoleListItem>(postSystemRoleCreate, actionRef, body);
        editFormRef.current?.resetFields();
      }}
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

      <ProFormSelect
        width="md"
        name="status"
        label="状态"
        request={async () => [
          { label: '启用', value: 1 },
          { label: '禁用', value: 2 },
        ]}
      />
    </ModalForm>
  );
};

export default CreateOrUpdateRole;
