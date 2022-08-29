import { apiParams } from '@/utils/utils';
import type { ActionType } from '@ant-design/pro-table';
import message from 'antd/lib/message';
import { useState } from 'react';

const useTableUpdate = () => {
  const [editVisible, setEditVisible] = useState(false);
  const updateHanlder = async <T>(
    updateApi: any,
    actionRef: React.MutableRefObject<ActionType | undefined>,

    body: T,
  ) => {
    let res;
    try {
      res = await updateApi(apiParams(), body);
      if (res.code === 200) {
        actionRef.current?.reload();
        setEditVisible(false);
        message.success('更新成功');
      }
    } catch (error) {
      message.error((error as Error)?.message);
    }
    return res;
  };
  return {
    updateHanlder,
    editVisible,
    setEditVisible,
  };
};

export default useTableUpdate;
