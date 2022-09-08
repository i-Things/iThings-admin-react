import useTableCreate from '@/hooks/useTableCreate';
import useTableUpdate from '@/hooks/useTableUpdate';
import { postSystemUserCreate, postSystemUserUpdate } from '@/services/iThingsapi/yonghuguanli';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_HORIZONTAL } from '@/utils/const';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useRef } from 'react';
import type { UserListItem } from '../types';

// const { Option } = Select;
const CreateOrUpdateUser: React.FC<{
  flag: string;
  record?: UserListItem;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}> = ({ flag, record, actionRef }) => {
  const { createHandler, createVisible, setCreateVisible } = useTableCreate();
  const { updateHandler, editVisible, setEditVisible } = useTableUpdate();
  // const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();
  const editFormRef = useRef<ProFormInstance<UserListItem>>();
  type CreateProp = typeof postSystemUserCreate;
  type UpdateProp = typeof postSystemUserUpdate;
  // const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result as string));
  //   reader.readAsDataURL(img);
  // };

  // const beforeUpload = (file: RcFile) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  // const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
  //   if ((info.file.size as number) / 1024 / 1024 >= 2) return null;

  //   if (info.file.status === 'uploading') {
  //     return setLoading(true);
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }} defaultValue="86">
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );
  return (
    <ModalForm<UserListItem>
      initialValues={record}
      formRef={editFormRef}
      title={flag === 'update' ? '编辑用户信息' : '新建用户'}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            if (flag === 'update') setEditVisible(true);
            setCreateVisible(true);
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
          setCreateVisible(false);
        },
      }}
      submitTimeout={2000}
      {...FORMITEM_LAYOUT}
      layout={LAYOUT_TYPE_HORIZONTAL}
      onFinish={async (values) => {
        // const modalFlag: boolean = false;
        const body = { ...values, reqType: 'pwd' };
        if (flag === 'update')
          return await updateHandler<UpdateProp, UserListItem>(postSystemUserUpdate, actionRef, {
            ...body,
            uid: record?.uid as string,
          });
        else
          return await createHandler<CreateProp, UserListItem>(
            postSystemUserCreate,
            actionRef,
            body,
          );
      }}
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
              pattern: /^.*(?=.{9,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
              message: '密码强度必须为字⺟⼤⼩写+数字+符号，9位以上！',
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
        request={async () => [
          { label: 'admin', value: 1 },
          { label: '供应商', value: 2 },
          { label: 'user', value: 3 },
        ]}
      />
      <ProFormText name="nickName" width="md" label="昵称" placeholder="请输入昵称" />
      {/* <ProFormText
        name="Email"
        label="邮箱"
        width="md"
        placeholder="请输入邮箱"
        fieldProps={{ defaultValue: record?.email ?? '' }}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      />
      <ProFormText
        name="Phone"
        label="手机号"
        width="md"
        fieldProps={{
          addonBefore: prefixSelector,
          defaultValue: record?.phone ?? '',
        }}
      /> */}
      <ProFormText name="wechat" label="微信ID" width="md" />
      <ProFormSelect
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
      <ProFormText name="language" width="md" label="语言" placeholder="请输入使用语言" />
      {/* <ProFormUploadButton
        name="headImgUrl"
        label="头像"
        icon=" "
        max={1}
        action=""
        fieldProps={{
          onChange: handleChange,
          beforeUpload: beforeUpload,
          listType: 'picture-card',
        }}
        extra="请上传jpg/png格式图片,且大小小于2M"
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </ProFormUploadButton> */}

      {/* <Form.Item label="头像" name="headImgUrl">
        <ImgCrop rotate>
          <Upload
            listType="picture-card"
            showUploadList={false}
            action=""
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
      </Form.Item> */}
    </ModalForm>
  );
};

export default CreateOrUpdateUser;
