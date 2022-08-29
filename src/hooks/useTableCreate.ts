import type { ActionType } from '@ant-design/pro-table';
import message from 'antd/lib/message';
import { useState } from 'react';
import { apiParams } from './../utils/utils';

const useTableCreate = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const [firstStepFormData, setFirstStepFormData] = useState<any>({});
  const createHanlder = async <T>(
    createApi: any,
    actionRef: React.MutableRefObject<ActionType | undefined>,

    body: T,
  ) => {
    let res;
    try {
      res = await createApi(apiParams(), body);
      if (res?.code === 200) {
        setFirstStepFormData(res?.data);
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
    firstStepFormData,
  };
};

export default useTableCreate;
