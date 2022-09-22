import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import { Modal } from 'antd';
const { confirm } = Modal;
const useTableDelete = () => {
  const deleteHandler = (
    deleteMap: { title: string; content: string },
    deleteOkHandler: () => void,
    deleteCancelHandler?: () => void,
  ) => {
    const { title, content } = deleteMap;
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      async onOk() {
        deleteOkHandler();
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
