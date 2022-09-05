import type { Option } from '@/hooks/types';
import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemMenuCreate, postSystemMenuUpdate } from '@/services/iThingsapi/caidanguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { ExclamationCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormCascader, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useRef } from 'react';
import { flagStatus } from '..';
import '../styles.less';
import type { menuListItem } from '../types';

const CreateOrUpdateMenu: React.FC<{
  flag: flagStatus;
  record?: menuListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  cascaderOptions?: menuListItem[] & Option[];
  flatOptions: menuListItem[];
  setCascaderOptions?: React.Dispatch<React.SetStateAction<Option[] & menuListItem[]>>;
}> = ({ flag, record, actionRef, cascaderOptions, setCascaderOptions, flatOptions }) => {
  const { createHanlder, createVisible, setCreateVisible } = useTableCreate();
  const { updateHanlder, editVisible, setEditVisible } = useTableUpdate();
  const editFormRef = useRef<any>();

  const rootFlag =
    flatOptions.filter((item) => item.name === record?.name)[0]?.parentID === 1 ||
    flag === flagStatus.CREATE;

  const initialValues = {
    ...record,
    // parentID: flag === flagStatus.CREATE ? '根节点' : record?.name,
    parentID: rootFlag
      ? '根节点'
      : flatOptions.filter((item) => item.id === record?.parentID)[0]?.name,
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
    <ModalForm<menuListItem>
      width={550}
      initialValues={initialValues}
      formRef={editFormRef}
      title={flag === flagStatus.UPDATE ? '编辑菜单' : '新建菜单'}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            const recursion = (pre: Option[] & menuListItem[]) => {
              pre.map((item) => {
                if (item.children) recursion(item?.children);
                if (item.id === record?.id) item.disabled = true;
              });
              return pre;
            };
            if (flag === flagStatus.UPDATE)
              (
                setCascaderOptions as React.Dispatch<
                  React.SetStateAction<Option[] & menuListItem[]>
                >
              )((pre: Option[] & menuListItem[]) => {
                return recursion(pre);
              });

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
        console.log(values);
        console.log(flatOptions);
        let parentID: number = 1;
        if (values.parentID === '根节点') parentID = 1;
        else if (Array.isArray(values.parentID) && (values.parentID as number[]).length === 2)
          parentID = values.parentID[1];
        else {
          // const name = values.parentID as string;
          // parentID = flatOptions.filter((item) => item.name === name)[0].id;
          parentID = values.parentID[0];
        }
        const body = {
          ...values,
          order: Number(values?.order),
          id: record?.id as number,
          parentID,
        };
        if (flag === flagStatus.UPDATE)
          return await updateHanlder<menuListItem>(postSystemMenuUpdate, actionRef, body);
        else return await createHanlder<menuListItem>(postSystemMenuCreate, actionRef, body);
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
          options: cascaderOptions,
          disabled: flag !== flagStatus.UPDATE,
          expandTrigger: 'hover',
          changeOnSelect: true,
          // onChange: (value, option) => {
          //   console.log(value[0]);
          //   console.log(option[0]);

          //   if (value[0] === option[0].id) {
          //     value = '';
          //     return message.error('不能选择本身');
          //   }
          // },
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
