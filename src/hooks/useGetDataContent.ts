import { ResponseCode } from '@/utils/base';
import message from 'antd/lib/message';
import { useState } from 'react';
const useGetDataContent = <S>() => {
  const [dataContent, setDataContent] = useState<S>();
  const queryData = async <T extends Function, K>(queryApi: T, params: K): Promise<any> => {
    const body = {
      ...params,
    };
    let res;
    try {
      res = await queryApi(body);
      if (res instanceof Response) {
        return {
          data: [],
          total: 0,
        };
      }
      if (res.code === ResponseCode.SUCCESS) setDataContent(res?.data);
    } catch (error) {
      message.error((error as Error)?.message);
    }
    return res;
  };
  return {
    queryData,
    dataContent,
    setDataContent,
  };
};

export default useGetDataContent;
