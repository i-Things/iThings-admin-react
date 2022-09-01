import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemMenuCreate, postSystemMenuUpdate } from '@/services/iThingsapi/caidanguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormCascader, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useRef } from 'react';
import { flagStatus } from '..';
import type { menuListItem } from '../types';
const CreateOrUpdateMenu: React.FC<{
  flag: flagStatus;
  record?: menuListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  cascaderOptions: any;
}> = ({ flag, record, actionRef, cascaderOptions }) => {
  const { createHanlder, createVisible, setCreateVisible } = useTableCreate();
  const { updateHanlder, editVisible, setEditVisible } = useTableUpdate();
  const editFormRef = useRef<any>();

  const returnTitle = {
    [flagStatus.ADD]: (
      <>
        <PlusOutlined /> 添加子菜单
      </>
    ),
    [flagStatus.UPDATE]: '编辑',
    [flagStatus.CREATE]: (
      <>
        <PlusOutlined /> 新建根菜单
      </>
    ),
  };
  return (
    <ModalForm<menuListItem>
      width={550}
      initialValues={record}
      key={Math.random()}
      formRef={editFormRef}
      title={flag === flagStatus.UPDATE ? '编辑' : '新建菜单'}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            if (flag === flagStatus.UPDATE) setEditVisible(true);
            else setCreateVisible(true);
          }}
        >
          {returnTitle[flag]}
        </Button>
      }
      visible={flag === flagStatus.UPDATE ? editVisible : createVisible}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => {
          if (flag === flagStatus.UPDATE) setEditVisible(false);
          else setCreateVisible(false);
        },
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={async (values) => {
        // parentID要取 parentID[1]
        const body = { ...values, id: record?.uid as number };
        if (flag === flagStatus.UPDATE)
          return await updateHanlder<menuListItem>(postSystemMenuUpdate, actionRef, body);
        else return await createHanlder<menuListItem>(postSystemMenuCreate, actionRef, body);
      }}
    >
      <ProFormCascader
        width="md"
        name="parentID"
        label="父菜单ID"
        rules={[
          {
            required: true,
            message: '父菜单是必填项！',
          },
        ]}
        fieldProps={{
          options: cascaderOptions,
          disabled: flag !== flagStatus.UPDATE,
          defaultValue: record?.name ?? '',
        }}
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
