import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemUserCreate, postSystemUserUpdate } from '@/services/iThingsapi/yonghuguanli';
import { FlagStatus } from '@/utils/base';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormCascader,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { GroupListItem, GroupOption } from '../types';

// const { Option } = Select;
const CreateOrUpdateUser: React.FC<{
  flag: string;
  record?: GroupListItem;
  actionRef?: React.MutableRefObject<ActionType | undefined>;
  cascaderOptions?: GroupOption[];
  flatOptions?: GroupListItem[];
}> = ({ flag, record, actionRef }) => {
  const { createHandler } = useTableCreate();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();
  const editFormRef = useRef<ProFormInstance>();
  // const options = cloneDeep(cascaderOptions);
  type CreateProp = typeof postSystemUserCreate;
  type UpdateProp = typeof postSystemUserUpdate;

  const GROUP_TYPE_OPTION = [
    { label: '默认', value: 1 },
    { label: '动态', value: 2 },
  ];

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const initialValues = {
    ...record,
    groupType: '默认',
  };

  const formSubmit = async (values: GroupListItem) => {
    const body = { ...values };
    if (flag === 'update')
      await updateHandler<UpdateProp, GroupListItem>(postSystemUserUpdate, actionRef, {
        ...body,
        tags: record?.tags,
        // uid: record?.uid as string,
      });
    else await createHandler<CreateProp, GroupListItem>(postSystemUserCreate, actionRef, body);
    onClose();
    editFormRef.current?.resetFields();
  };

  // const recursion = (pre: GroupOption[]) => {
  //   pre.map((item) => {
  //     if (item.children) recursion(item?.children);
  //     if (item.id === record?.id) item.disabled = true;
  //   });
  //   return pre;
  // };
  useEffect(() => {
    editFormRef.current?.setFieldsValue(initialValues);
  }, [editFlag, record]);
  return (
    <ModalForm<GroupListItem>
      formRef={editFormRef}
      width={550}
      title={flag === 'update' ? '编辑分组信息' : '新建分组'}
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
      {flag === FlagStatus.CREATE && (
        <ProFormSelect
          name="groupType"
          width="md"
          label="分组类型"
          placeholder="请选择分组类型"
          rules={[
            {
              required: true,
              message: '请选择分组类型',
            },
          ]}
          request={async () => GROUP_TYPE_OPTION}
          fieldProps={{ disabled: true }}
        />
      )}
      <ProFormCascader
        width="md"
        name="parentID"
        label="父组ID"
        fieldProps={{
          options:
            // flag === FlagStatus.UPDATE ? recursion(options as GroupOption[]) : cascaderOptions,
            GROUP_TYPE_OPTION,
          expandTrigger: 'hover',
          changeOnSelect: true,
        }}
      />
      <ProFormText
        name="groupName"
        width="md"
        label="分组名称"
        placeholder="请输入分组名称"
        rules={[
          {
            required: true,
            message: '请输入分组名称',
          },
        ]}
      />
      <ProFormTextArea name="desc" width="md" label="分组描述" placeholder="分组描述" />
    </ModalForm>
  );
};

export default CreateOrUpdateUser;
