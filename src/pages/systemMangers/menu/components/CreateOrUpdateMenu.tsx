import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import {
  postApiV1SystemMenuCreate,
  postApiV1SystemMenuUpdate,
} from '@/services/iThingsapi/caidanguanli';
import { FlagStatus } from '@/utils/base';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { ICON_OPTION } from '@/utils/iconMap';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormCascader, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useRef, useState } from 'react';
import '../styles.less';
import type { MenuListItem, MenuOption } from '../types';

const CreateOrUpdateMenu: React.FC<{
  flag: FlagStatus;
  record?: MenuListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  cascaderOptions?: MenuListItem[];
  flatOptions: MenuListItem[];
}> = ({ flag, record, actionRef, cascaderOptions, flatOptions }) => {
  const { createHandler } = useTableCreate();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>();
  const options = cloneDeep(cascaderOptions);

  type CreateProp = typeof postApiV1SystemMenuCreate;
  type UpdateProp = typeof postApiV1SystemMenuUpdate;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const recursion = (pre: MenuOption[]) => {
    pre?.map((item) => {
      item.value = item.id;
      if (item.children) recursion(item?.children);
      if (item.id === record?.id) item.disabled = true;
    });
    return pre;
  };

  const returnTitle = {
    [FlagStatus.ADD]: '添加子菜单',
    [FlagStatus.UPDATE]: '编辑',
    [FlagStatus.CREATE]: '新建根菜单',
  };

  const HIDE_IN_MENU_OPTION = [
    { label: '是', value: 1 },
    { label: '否', value: 2 },
  ];

  const formSubmit = async (values: MenuListItem) => {
    console.log(values);

    let parentID = 1;
    if (Array.isArray(values.parentID)) {
      if (values.parentID[0] === 0) parentID = 1;
      else parentID = values.parentID[values.parentID.length - 1];
    } else {
      if (values.parentID === '根节点') parentID = 1;
      else parentID = flatOptions.filter((item) => item.name === values.parentID)[0].id;
    }
    const body = {
      ...values,
      order: values.order ? Number(values?.order) : 1,
      id: record?.id as number,
      parentID,
    };

    if (flag === FlagStatus.UPDATE)
      await updateHandler<UpdateProp, MenuListItem>(postApiV1SystemMenuUpdate, actionRef, body);
    else await createHandler<CreateProp, MenuListItem>(postApiV1SystemMenuCreate, actionRef, body);
    onClose();
    editFormRef.current?.resetFields();
  };

  useEffect(() => {
    const parentIDFlag = {
      [FlagStatus.CREATE]: '根节点',
      [FlagStatus.ADD]: record?.name,
      [FlagStatus.UPDATE]:
        record?.parentID === 1
          ? '根节点'
          : flatOptions.filter((item) => item.id === record?.parentID)[0]?.name,
    };
    const initialValues = {
      ...record,
      //parentID: flag === FlagStatus.CREATE ? '根节点' : parentIDFlag(),
      parentID: parentIDFlag[flag],
    };
    editFormRef.current?.setFieldsValue(initialValues);
  }, [editFlag, record]);
  console.log('flag', flag);
  console.log('option', recursion(options as MenuOption[]));

  return (
    <ModalForm<MenuListItem>
      width={550}
      formRef={editFormRef} /*  */
      title={flag === FlagStatus.UPDATE ? '编辑菜单' : '创建菜单'}
      trigger={
        <Button
          type={flag === FlagStatus.UPDATE || flag === FlagStatus.ADD ? 'link' : 'primary'}
          onClick={() => {
            setEditFlag(true);
            onOpen();
          }}
        >
          {returnTitle[flag]}
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
            flag === FlagStatus.UPDATE ? recursion(options as MenuOption[]) : cascaderOptions,
          disabled: flag !== FlagStatus.UPDATE,
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
      <ProFormSelect
        width="md"
        name="icon"
        label="图标"
        placeholder="请选择"
        request={async () => ICON_OPTION}
        fieldProps={{
          defaultValue: 'icon_data_01',
        }}
      />
      <ProFormText name="redirect" width="md" label="路由重定向" />
      <ProFormText name="order" width="md" label="排序" />
      <ProFormSelect
        width="md"
        name="hideInMenu"
        label="是否隐藏"
        placeholder="是否在列表隐藏"
        request={async () => HIDE_IN_MENU_OPTION}
        fieldProps={{
          defaultValue: 2,
        }}
      />
    </ModalForm>
  );
};

export default CreateOrUpdateMenu;
