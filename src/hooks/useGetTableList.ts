import { spanTree } from '@/utils/utils';
import type { ParamsType } from '@ant-design/pro-components';
import message from 'antd/lib/message';
import { useState } from 'react';
import type { menuListItem } from './../pages/systemManagers/menus/types.d';
import type { Option } from './types';
const useGetTableList = () => {
  const [cascaderOptions, setCascaderOptions] = useState<Option[] & menuListItem[]>([]);
  const [flatOptions, setFlatOptions] = useState<menuListItem[]>([]);
  const queryPage = async (
    queryApi: any,
    params: ParamsType & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
  ): Promise<any> => {
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
      if (queryApi.prototype.constructor.name === 'postSystemMenuIndex') {
        setFlatOptions(res.data.list);
        const treeList = res.data.list.map((item: Option & menuListItem) => {
          return {
            ...item,
            key: item?.id + '',
            label: item?.name,
            value: item?.id,
          };
        });

        setCascaderOptions(spanTree(treeList, 1, 'parentID'));
      }

      if (res instanceof Response) {
        return {
          data: [],
          total: 0,
        };
      }
      if (res.code === 200) {
        return {
          data: res?.data?.list,
          total: res?.data?.total,
        };
      }
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };
  return {
    queryPage,
    cascaderOptions,
    flatOptions,
  };
};

export default useGetTableList;
