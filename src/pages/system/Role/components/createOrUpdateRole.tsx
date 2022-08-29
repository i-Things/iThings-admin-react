import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemRoleIndex } from '@/services/iThingsapi/jiaoseguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { apiParams } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Button } from 'antd';
import { useRef } from 'react';
import { RoleListItem } from '../types';
const CreateOrUpdateRole = (props: { flag: string; record?: any; actionRef: any }) => {
  const { flag, record, actionRef } = props;
  const { createHanlder, createVisible, setCreateVisible } = useTableCreate();
  const { updateHanlder, editVisible, setEditVisible } = useTableUpdate();
  const editFormRef = useRef<any>();
  return (
    <ModalForm<{
      name: string;
      remark: string;
      status: number;
    }>
      width={550}
      initialValues={record}
      key={Math.random()}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑用户信息' : '新建角色'}
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
              <PlusOutlined /> 新建用户
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
        const params = apiParams();
        const body = values;

        return flag === 'update'
          ? updateHanlder
          : createHanlder<Pick<RoleListItem, 'name' | 'remark' | 'status'>>(
              postSystemRoleIndex,
              actionRef,
              params,
              body,
            );
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
      {flag === 'update' && (
        <ProFormSelect
          width="md"
          name="status"
          label="状态"
          request={async () => [
            { label: '启用', value: 1 },
            { label: '禁用', value: 2 },
          ]}
        />
      )}
    </ModalForm>
  );
};

export default CreateOrUpdateRole;
