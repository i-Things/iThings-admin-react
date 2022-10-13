import { ResponseCode } from '@/utils/base';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import type { ActionType } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
const { confirm } = Modal;
const useTableDelete = () => {
  const deleteHandler = <T,>(
    deleteApi: (
      body: T,
      options?: Record<string, any> | undefined,
    ) => Promise<{
      code: number;
      msg: string;
    }>,
    actionRef: React.MutableRefObject<ActionType | undefined>,
    deleteMap: { title: string; content: string; body: T },
    deleteOkHandler?: () => void,
    deleteCancelHandler?: () => void,
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
          if (res.code === ResponseCode.SUCCESS) {
            actionRef.current?.reloadAndRest?.();
            message.success('删除成功');
            if (deleteOkHandler) deleteOkHandler();
          }
        } catch (error) {
          message.error((error as Error)?.message);
        }
        return res;
      },
      onCancel() {
        if (deleteCancelHandler) deleteCancelHandler();
      },
    });
  };
  return {
    deleteHandler,
  };
};

export default useTableDelete;
