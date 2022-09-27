import useGetTableList from '@/hooks/useGetTableList';
import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import {
  postThingsGroupInfoCreate,
  postThingsGroupInfoIndex,
  postThingsGroupInfoUpdate,
} from '@/services/iThingsapi/shebeifenzu';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormCascader, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import type { GroupListItem, GroupOption } from '../types';
import type { TagProps } from './types';

const CreateOrUpdateGroup: React.FC<{
  flag: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  cascaderOptions: GroupOption[];
  record?: GroupListItem;
  flatOptions?: GroupListItem[];
  setUpdateFlag?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ flag, record, actionRef, cascaderOptions, setUpdateFlag }) => {
  const { queryPage } = useGetTableList();
  const { createHandler } = useTableCreate();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);

  const editFormRef = useRef<ProFormInstance>();

  type QueryProp = typeof postThingsGroupInfoIndex;
  type CreateProp = typeof postThingsGroupInfoCreate;
  type UpdateProp = typeof postThingsGroupInfoUpdate;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const initialValues = {
    ...record,
    parentID: record?.parentID === '1' ? '根节点' : record?.parentID,
  };

  const formSubmit = async (values: GroupListItem) => {
    const body = { ...values };
    if (flag === 'update') {
      await updateHandler<UpdateProp, GroupListItem>(postThingsGroupInfoUpdate, actionRef, {
        ...body,
        groupID: record?.groupID as string,
        parentID: '',
        tags: record?.tags as TagProps,
      });
      (setUpdateFlag as React.Dispatch<React.SetStateAction<boolean>>)(true);
    } else {
      const parentID = values.parentID[values.parentID.length - 1];
      await createHandler<CreateProp, GroupListItem>(postThingsGroupInfoCreate, actionRef, {
        ...body,
        parentID,
      });
      const queryList = await queryPage<QueryProp, GroupListItem>(postThingsGroupInfoIndex, {
        page: {
          page: 1,
          size: 10,
        },
        ...values,
        parentID,
      });
      history.push(`/deviceMangers/group/detail/${queryList?.data[0]?.groupID}`);
    }
    onClose();
    editFormRef.current?.resetFields();
  };

  useEffect(() => {
    if (flag === 'update') {
      setEditFlag(false);
      editFormRef.current?.setFieldsValue(initialValues);
    }
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
      <ProFormCascader
        width="md"
        name="parentID"
        label="父组ID"
        fieldProps={{
          options: cascaderOptions,
          expandTrigger: 'hover',
          changeOnSelect: true,
        }}
        disabled={flag === 'update'}
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

export default CreateOrUpdateGroup;
