import type { ActionType } from '@ant-design/pro-table';
import message from 'antd/lib/message';
import { useState } from 'react';

const useTableCreate = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const createHanlder = async <T>(
    createApi: any,
    actionRef: React.MutableRefObject<ActionType | undefined>,
    params: API.postSystemUserInfoCreateParams & {
      'iThings-guid'?: string;
    },
    body: T,
  ) => {
    let res;
    try {
      res = await createApi({ params, body });
      if (res.code === 200) {
        actionRef.current?.reload();
        setCreateVisible(false);
        message.success('创建成功');
      }
    } catch (error) {
      message.error((error as Error)?.message);
    }
    return res;
  };
  return {
    createHanlder,
    createVisible,
    setCreateVisible,
  };
};

export default useTableCreate;
