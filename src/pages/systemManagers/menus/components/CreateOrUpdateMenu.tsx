import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemMenuCreate, postSystemMenuUpdate } from '@/services/iThingsapi/caidanguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { ExclamationCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormCascader, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { useRef } from 'react';
import { flagStatus } from '..';
import '../styles.less';
import type { MenuListItem, MenuOption } from '../types';

const CreateOrUpdateMenu: React.FC<{
  flag: flagStatus;
  record?: MenuListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  cascaderOptions?: MenuOption[];
  flatOptions: MenuListItem[];
}> = ({ flag, record, actionRef, cascaderOptions, flatOptions }) => {
  const { createHanlder, createVisible, setCreateVisible } = useTableCreate();
  const { updateHanlder, editVisible, setEditVisible } = useTableUpdate();
  const editFormRef = useRef<any>();

  const options = cloneDeep(cascaderOptions);
  // const rootFlag = flag === flagStatus.CREATE || record?.parentID === 1;

  type CreateProp = typeof postSystemMenuCreate;
  type UpdateProp = typeof postSystemMenuUpdate;
  const initialValues = {
    ...record,
    parentID: flag === flagStatus.CREATE ? '根节点' : record?.name,
  };

  const recursion = (pre: MenuOption[]) => {
    pre.map((item) => {
      if (item.children) recursion(item?.children);
      if (item.id === record?.id) item.disabled = true;
    });
    return pre;
  };

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
    <ModalForm<MenuListItem>
      width={550}
      initialValues={initialValues}
      formRef={editFormRef}
      title={flag === flagStatus.UPDATE ? '编辑菜单' : '新建菜单'}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            if (flag === flagStatus.UPDATE) setEditVisible(true);
            setCreateVisible(true);
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
          setCreateVisible(false);
        },
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={async (values) => {
        let parentID: number = 1;
        if (values.parentID === '根节点') parentID = 1;
        else if (Array.isArray(values.parentID) && (values.parentID as number[]).length === 2)
          parentID = values.parentID[1];
        else {
          if (typeof values.parentID === 'string') {
            const name = values.parentID as string;
            parentID = flatOptions.filter((item) => item.name === name)[0].id;
          } else parentID = values.parentID[0];
        }
        const body = {
          ...values,
          order: Number(values?.order),
          id: record?.id as number,
          parentID,
        };
        if (flag === flagStatus.UPDATE)
          return await updateHanlder<UpdateProp, MenuListItem>(
            postSystemMenuUpdate,
            actionRef,
            body,
          );
        else
          return await createHanlder<CreateProp, MenuListItem>(
            postSystemMenuCreate,
            actionRef,
            body,
          );
      }}
    >
      <section className="menu-tool-tip">
        <ExclamationCircleTwoTone className="menu-icon" twoToneColor="#ed6a0c" />
        新增菜单，需要在角色管理内配置权限才可使用
      </section>
      <ProFormCascader
        width="md"
        name="parentID"
        label="父节点ID"
        rules={[
          {
            required: true,
            message: '父菜单是必填项！',
          },
        ]}
        fieldProps={{
          options:
            flag === flagStatus.UPDATE ? recursion(options as MenuOption[]) : cascaderOptions,
          disabled: flag !== flagStatus.UPDATE,
          expandTrigger: 'hover',
          changeOnSelect: true,
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
        placeholder="如：/deviceMangers"
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
        placeholder="如：./deviceMangers/index.tsx"
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
        placeholder="如：icon_system"
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
