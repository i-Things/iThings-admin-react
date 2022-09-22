import { MenuListItem } from '@/pages/systemMangers/menu/types';
import { spanTree } from '@/utils/utils';
import type { ParamsType } from '@ant-design/pro-components';
import message from 'antd/lib/message';
import { useState } from 'react';
const useGetTableList = () => {
  // const [cascaderOptions, setCascaderOptions] = useState<MenuOption[]>([]);
  const [flatOptions, setFlatOptions] = useState<MenuListItem[]>([]);
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
      setFlatOptions(res.data.list);
      // if (queryApi.prototype.constructor.name === 'postSystemMenuIndex') {
      //   setFlatOptions(res.data.list);
      //   const treeList = res.data.list.map((item: MenuOption) => {
      //     return {
      //       ...item,
      //       key: item?.id + '',
      //       label: item?.name,
      //       value: item?.id,
      //     };
      //   });
      //   treeList.unshift({
      //     id: 0,
      //     label: '根节点',
      //     parentID: 1,
      //     value: 1,
      //   });
      //   // setCascaderOptions(spanTree(treeList, 1, 'parentID'));
      // }

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
      data:
        queryApi.prototype.constructor.name === 'postSystemMenuIndex' &&
        !params.name &&
        !params.path
          ? spanTree(res.data.list, 1, 'parentID')
          : res?.data?.list,
      total: res?.data?.total,
    };
  };
  return {
    queryPage,
    // cascaderOptions,
    // setCascaderOptions,
    flatOptions,
  };
};

export default useGetTableList;
