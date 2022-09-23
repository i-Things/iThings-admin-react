import type { MenuListItem } from '@/pages/systemMangers/menu/types';
import { GUIDKEY, TOKENKEY } from './const';

// 判断是否为移动端
export const isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
};

export const TOKEN_PREFIX = 'iThings';

export const setToken = (token: string) => {
  localStorage.setItem(`${TOKEN_PREFIX}-token`, token);
};

export const getToken = () => {
  return localStorage.getItem(`${TOKEN_PREFIX}-token`) ?? '';
};

export const setUID = (uid: string) => {
  return localStorage.setItem(`${TOKEN_PREFIX}-UID`, uid);
};

export const getUID = () => {
  return localStorage.getItem(`${TOKEN_PREFIX}-UID`) ?? '';
};

// 获取当前的时间戳，单位为 毫秒
export const getTimestamp = () => {
  return new Date().getTime() + '';
};

export const apiParamsGUID = () => {
  return {
    [GUIDKEY]: new Date().getTime() + '',
  };
};

export const apiParams = () => {
  return {
    [GUIDKEY]: new Date().getTime() + '',
    [TOKENKEY]: getToken(),
  };
};

/**
 * 递归树
 * @param {*} data 文件名
 * @param {*} pid 父级id
 * @param key
 */
export function spanTree(data: any, pid = 1, key = 'pid') {
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const i in data) {
    if (data[i][key] === pid) {
      const temp = data[i];
      const children = spanTree(data, data[i].id, key);
      if (children.length) {
        temp.children = children;
      }
      result.push(temp);
    }
  }

  return result;
}

export function recursionTree(pre: MenuListItem[]) {
  pre.map((item) => {
    if (item.children) recursionTree(item?.children);
    item.key = item?.id + '';
    item.label = item?.name + '';
    item.title = item?.name + '';
  });
  return pre;
}
