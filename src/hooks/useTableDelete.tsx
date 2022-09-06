import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import type { ActionType } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
const { confirm } = Modal;
const useTableDelete = () => {
  const deleteHanlder = (
    deleteApi: any,
    actionRef: React.MutableRefObject<ActionType | undefined>,
    deleteMap: { title: string; content: string; body: { uid?: string; id?: number } },
  ) => {
    const { title, content, body } = deleteMap;
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      async onOk() {
        let res;
        try {
          res = await deleteApi(body);
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