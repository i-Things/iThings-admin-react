import { ResponseCode } from '@/utils/base';
import type { ParamsType } from '@ant-design/pro-components';
import message from 'antd/lib/message';
import { useState } from 'react';
const useGetSelectOptions = () => {
  const [selectOptions, setSelectOptions] = useState<{ label: string; value: string }[]>([]);
  const querySelectOptions = async <T extends Function>(
    queryApi: T,
    params: ParamsType & {
      pageSize?: number;
      current?: number;
      keyword?: string;
      label: string;
      value: string;
    },
  ): Promise<{ label: string; value: number | string }[]> => {
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
      if (res.code === ResponseCode.SUCCESS) {
        setSelectOptions(
          res?.data?.list?.map((item) => {
            return {
              label: item[params?.label],
              value: item[params?.value],
            };
          }),
        );
      }
    } catch (error) {
      message.error((error as Error)?.message);
    }
    return res;
  };
  return {
    querySelectOptions,
    selectOptions,
  };
};

export default useGetSelectOptions;
