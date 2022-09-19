import { FlagStatus } from '@/utils/base';
import { FORMITEM_LAYOUT, LAYOUT_TYPE_VERTICAL } from '@/utils/const';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ModalForm, ProFormGroup, ProFormList, ProFormText } from '@ant-design/pro-form';
import type { TagProps } from 'antd';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import '../styles.less';
import type { GroupListItem } from '../types';
// const { Option } = Select;
const GroupTags: React.FC<{
  flag: string;
  setTagValues: React.Dispatch<
    React.SetStateAction<{
      tags: TagProps[];
    }>
  >;
  record?: GroupListItem;
}> = ({ flag, setTagValues }) => {
  // const { createHandler } = useTableCreate();
  // const { updateHandler } = useTableUpdate();
  // const [editFlag, setEditFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>();
  const tagFormRef = useRef<ProFormInstance>();

  // type CreateProp = typeof postSystemUserCreate;
  // type UpdateProp = typeof postSystemUserUpdate;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  // const initialValues = {
  //   ...record,
  //   groupType: '默认',
  // };

  const formSubmit = (values: { tags: TagProps[] }) => {
    const tagArr: string[] = [];
    values?.tags.map((item) => {
      tagArr.push(`${item.key}:${item.value}`);
    });
    const tagStr = tagArr.join(';');
    onClose();
    tagFormRef.current?.setFieldsValue({ tags: tagStr });
    setTagValues(values);
  };
  // useEffect(() => {
  //   editFormRef.current?.setFieldsValue(initialValues);
  // }, [editFlag, record]);

  return (
    <ModalForm<GroupListItem>
      formRef={editFormRef}
      width={650}
      title={flag === FlagStatus.CREATE ? '标签筛选' : '编辑标签'}
      trigger={
        <Button
          type="link"
          onClick={() => {
            // setEditFlag(true);
            onOpen();
          }}
        >
          {flag === 'update' ? (
            <>
              <EditOutlined /> 编辑
            </>
          ) : (
            <ProForm
              className="tagInput"
              formRef={tagFormRef}
              submitter={{
                // 配置按钮的属性
                resetButtonProps: {
                  style: {
                    // 隐藏重置按钮
                    display: 'none',
                  },
                },
                submitButtonProps: {},
                // 完全自定义整个区域
                render: () => [],
              }}
            >
              <ProFormText
                className="tags"
                name="tags"
                placeholder="请选择分组标签"
                fieldProps={{
                  suffix: <DownOutlined />,
                  readOnly: true,
                }}
              />
            </ProForm>
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
      layout={LAYOUT_TYPE_VERTICAL}
      onFinish={formSubmit}
    >
      <ProFormList
        name="tags"
        label="分组标签"
        initialValue={[
          {
            key: '',
            value: '',
          },
        ]}
        copyIconProps={false}
        creatorButtonProps={{
          type: 'link',
          icon: <PlusOutlined />,
          size: 'small',
          position: 'bottom',
          creatorButtonText: '新增标签',
        }}
      >
        <ProFormGroup key="group">
          <ProFormText
            name="key"
            placeholder="请输入标签key"
            rules={[
              {
                required: true,
                message: 'key值不可为空',
              },
            ]}
          />
          <ProFormText
            name="value"
            placeholder="请输入标签value"
            rules={[
              {
                required: true,
                message: 'value值不可为空',
              },
            ]}
          />
        </ProFormGroup>
      </ProFormList>
    </ModalForm>
  );
};

export default GroupTags;
