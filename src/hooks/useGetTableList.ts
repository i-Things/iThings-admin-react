import { ResponseCode } from '@/utils/base';
import type { ParamsType } from '@ant-design/pro-components';
import message from 'antd/lib/message';
import { useState } from 'react';
const useGetTableList = () => {
  const [dataList, setDataList] = useState<ParamsType>();
  const queryPage = async <T extends Function, K>(
    queryApi: T,
    params: ParamsType & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
  ): Promise<{ data: K[]; total: number }> => {
    const body = {
      ...params,
      page: {
        size: params.pageSize,
        page: params.current,
      },
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

      if (res.code === ResponseCode.SUCCESS) setDataList(res?.data);
    } catch (error) {
      message.error((error as Error)?.message);
    }
    return {
      data: res?.data?.list,
      total: res?.data?.total,
    };
  };
  return {
    queryPage,
    dataList,
    setDataList,
  };
};

export default useGetTableList;
