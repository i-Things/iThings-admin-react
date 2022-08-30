import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import type { ActionType } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
const { confirm } = Modal;
const useTableDelete = () => {
  const deleteHanlder = (
    deleteApi: any,
    actionRef: React.MutableRefObject<ActionType | undefined>,
    record: { uid: string; userName?: string },
  ) => {
    confirm({
      title: '你确定要删除该用户信息吗？',
      icon: <ExclamationCircleOutlined />,
      content: `所选用户名: ${record?.userName},删除后无法恢复`,
      async onOk() {
        let res;
        try {
          res = await deleteApi(params, record?.uid);
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
