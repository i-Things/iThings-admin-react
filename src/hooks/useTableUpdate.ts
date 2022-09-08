import type { ActionType } from '@ant-design/pro-table';
import message from 'antd/lib/message';
import { useState } from 'react';

const useTableUpdate = () => {
  const [editVisible, setEditVisible] = useState(false);
  const updateHandler = async <T extends Function, K>(
    updateApi: T,
    actionRef: React.MutableRefObject<ActionType | undefined>,
    body: K,
  ) => {
    let res;
    try {
      res = await updateApi(body);
      if (res.code === 200) {
        actionRef.current?.reload();
        setEditVisible(false);
        message.success('更新成功');
      }
    } catch (error) {
      message.error((error as Error)?.message);
    }
    return res.status === 200;
  };
  return {
    updateHandler,
    editVisible,
    setEditVisible,
  };
};

export default useTableUpdate;
