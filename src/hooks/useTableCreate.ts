import { ResponseCode } from '@/utils/base';
import type { ActionType } from '@ant-design/pro-table';
import message from 'antd/lib/message';

const useTableCreate = () => {
  const createHandler = async <T extends Function, k>(
    createApi: T,
    actionRef: React.MutableRefObject<ActionType | undefined> | undefined,

    body: k,
    createOkHandler?: () => void,
  ) => {
    let res;
    try {
      res = await createApi(body);
      if (res?.code === ResponseCode.SUCCESS) {
        actionRef?.current?.reload();
        message.success('创建成功');
        if (createOkHandler) createOkHandler();
      }
    } catch (error) {
      message.error((error as Error)?.message);
    }
    return res;
  };
  return {
    createHandler,
  };
};

export default useTableCreate;
