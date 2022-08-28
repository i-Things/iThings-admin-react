import { apiParams } from '@/utils/utils';
import type { ParamsType } from '@ant-design/pro-components';
import message from 'antd/lib/message';

const useGetTableList = () => {
  const queryPage = async (
    queryApi: any,
    params: ParamsType & {
      pageSize?: number | undefined;
      current?: number | undefined;
      keyword?: string | undefined;
    },
  ): Promise<any> => {
    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
    };
    let res;
    try {
      res = await queryApi(apiParams(), body);
      if (res instanceof Response) {
        return {
          data: [],
          total: 0,
        };
      }
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
  };
};

export default useGetTableList;
