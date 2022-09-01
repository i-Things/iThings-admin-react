import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemMenuCreate, postSystemMenuUpdate } from '@/services/iThingsapi/caidanguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useRef } from 'react';
import type { RoleListItem } from '../types';
const CreateOrUpdateMenu: React.FC<{
  flag: string;
  record?: RoleListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}> = ({ flag, record, actionRef }) => {
  const { createHanlder, createVisible, setCreateVisible } = useTableCreate();
  const { updateHanlder, editVisible, setEditVisible } = useTableUpdate();
  const editFormRef = useRef<any>();
  return (
    <ModalForm<RoleListItem>
      width={550}
      initialValues={record}
      key={Math.random()}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑菜单信息' : '新建菜单'}
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
              <PlusOutlined /> 新建根菜单
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
        const body = { ...values, id: record?.uid };
        if (flag === 'update')
          return await updateHanlder<RoleListItem>(postSystemMenuUpdate, actionRef, body);
        else return await createHanlder<RoleListItem>(postSystemMenuCreate, actionRef, body);
      }}
    >
      <ProFormText
        name="parentID"
        width="md"
        label="父菜单ID"
        disabled
        fieldProps={{ defaultValue: '根菜单' }}
      />
      <ProFormText
        name="name"
        width="md"
        label="菜单名称"
        placeholder="请输入菜单名称"
        rules={[
          {
            required: true,
            message: '菜单名称是必填项！',
          },
        ]}
      />
      <ProFormText
        name="path"
        width="md"
        label="路由path"
        rules={[
          {
            required: true,
            message: '路由path是必填项！',
          },
        ]}
      />
      <ProFormText
        name="component"
        width="md"
        label="文件路径"
        rules={[
          {
            required: true,
            message: '文件路径是必填项！',
          },
        ]}
      />
      <ProFormText
        name="icon"
        width="md"
        label="图标"
        rules={[
          {
            required: true,
            message: '图标是必填项！',
          },
        ]}
      />
      <ProFormText name="redirect" width="md" label="路由重定向" />
      <ProFormText name="order" width="md" label="排序" />
    </ModalForm>
  );
};

export default CreateOrUpdateMenu;
