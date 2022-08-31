import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import type { ActionType } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
const { confirm } = Modal;
const useTableDelete = () => {
  const deleteHanlder = (
    deleteApi: any,
    actionRef: React.MutableRefObject<ActionType | undefined>,
    record: { uid: string; name?: string },
  ) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined />,
      content: `所选记录: ${record?.name},  删除后无法恢复`,
      async onOk() {
        let res;
        try {
          res = await deleteApi({ id: record?.uid });
          if (res.code === 200) {
            actionRef.current?.reload();
            message.success('删除成功');
          }
        } catch (error) {
          message.error((error as Error)?.message);
        }
        return res;
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return {
    deleteHanlder,
  };
};

export default useTableDelete;
