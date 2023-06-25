import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import {
  postApiV1SystemUserCreate,
  postApiV1SystemUserUpdate,
} from '@/services/iThingsapi/yonghuguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { ProFormSelect } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { UserListItem } from '../types';

const CreateOrUpdateUser: React.FC<{
  flag: string;
  record?: UserListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  selectOptions: { value: string; label: string }[];
}> = ({ flag, record, actionRef, selectOptions }) => {
  const { createHandler } = useTableCreate();
  const { updateHandler } = useTableUpdate();
  const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();
  const editFormRef = useRef<ProFormInstance>();
  type CreateProp = typeof postApiV1SystemUserCreate;
  type UpdateProp = typeof postApiV1SystemUserUpdate;

  const ROLE_OPTION = selectOptions;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values: UserListItem) => {
    const body = { ...values, reqType: 'pwd' };
    if (flag === 'update')
      await updateHandler<UpdateProp, UserListItem>(postApiV1SystemUserUpdate, actionRef, {
        ...body,
        userID: record?.userID as string,
      });
    else await createHandler<CreateProp, UserListItem>(postApiV1SystemUserCreate, actionRef, body);
    onClose();
    editFormRef.current?.resetFields();
  };

  useEffect(() => {
    editFormRef.current?.setFieldsValue(record);
  }, [editFlag, record]);

  return (
    <ModalForm<UserListItem>
      width={550}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑用户信息' : '创建用户'}
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
        name="userName"
        width="md"
        label="用户名"
        placeholder="请输入用户名"
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z][a-zA-Z0-9_-]{6,20}$/,
            message:
              '账号必须以大小写字母开头，且账号只能包含大小写字母，数字，下划线和减号。 长度为6到20位之间',
          },
        ]}
      />
      {flag === 'create' && (
        <ProFormText.Password
          name="password"
          width="md"
          label="密码"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              pattern: /^.*(?=.{9,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?+-/,.·~|'" ]).*$/,
              message: '密码强度必须为字⺟⼤⼩写+数字+特殊字符，9位以上！',
            },
          ]}
        />
      )}
      <ProFormSelect
        width="md"
        name="role"
        label="用户角色"
        rules={[
          {
            required: true,
            message: '用户角色是必填项！',
          },
        ]}
        request={async () => ROLE_OPTION}
      />
      <ProFormText name="nickName" width="md" label="昵称" placeholder="请输入昵称" />
      {/* <ProFormSelect
        width="md"
        name="sex"
        label="性别"
        request={async () => [
          { label: '男性', value: 1 },
          { label: '女性', value: 2 },
        ]}
      />
      <ProFormText name="country" width="md" label="国家" placeholder="请输入所在国家" />
      <ProFormText name="province" width="md" label="省份" placeholder="请输入所在省份" />
      <ProFormText name="city" width="md" label="城市" placeholder="请输入所在城市" />
      <ProFormText name="language" width="md" label="语言" placeholder="请输入使用语言" /> */}
    </ModalForm>
  );
};

export default CreateOrUpdateUser;
