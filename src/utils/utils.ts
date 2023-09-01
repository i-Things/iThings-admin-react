import type {
  GroupDeviceCreateListProps,
  GroupDeviceItem,
} from '@/pages/deviceMangers/group/types';
import type { MenuListItem } from '@/pages/systemMangers/menu/types';
import { isValidCron } from 'cron-validator';
import type { DEVICE_INFO } from './const';
import { GUIDKEY, KEYPREFIX, TOKENKEY } from './const';

// 判断是否为移动端
export const isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
};

export const TOKEN_PREFIX = 'iThings';
export const getLocal = (key: string) => localStorage.getItem(key);
export const setLocal = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const setToken = (token: string) => {
  localStorage.setItem(`${TOKEN_PREFIX}-token`, token);
};

export const getToken = () => {
  return localStorage.getItem(`${TOKEN_PREFIX}-token`) ?? '';
};

export const setUID = (userID: string) => {
  return localStorage.setItem(`${TOKEN_PREFIX}-UID`, userID);
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
export function spanTree(data: any, pid: string | number, key: 'parentID') {
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const i in data) {
    if (data[i][key] === pid || data[i][key] === String(pid)) {
      const temp = data[i];
      const children = spanTree(data, data[i].id || data[i].groupID, key);
      if (children.length) {
        temp.children = children;
      }
      result.push(temp);
    }
  }

  return result;
}

export function selectConfirm(record: GroupDeviceCreateListProps[]) {
  const selectRecord: GroupDeviceCreateListProps[] = Array.isArray(record) ? record : [record];
  const list = selectRecord.map((item) => {
    return {
      productID: item?.productID,
      deviceName: item?.deviceName,
    };
  });
  return list;
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

// 设备在线状态处理
export function isOnlineEnum(row: DEVICE_INFO | GroupDeviceItem) {
  return row?.firstLogin === '0'
    ? {
        2: {
          text: '未激活',
          status: 'Warning',
        },
      }
    : {
        1: { text: '在线', status: 'Success' },
        2: {
          text: '离线',
          status: 'Error',
        },
      };
}

// 设备部署状态
export function actionStatusEnum() {
  return {
    1: { text: '待部署', status: 'Default' },
    2: { text: '部署中', status: 'Processing' },
    3: { text: '部署成功', status: 'Success' },
    4: { text: '部署失败', status: 'Error' },
  };
}

/**
 * @function 数组转对象
 * @param {Array} original 原始数组
 * @param {String} key 键
 * @param {*} val 值
 * @return {Object} 返回对象
 * @example
 *
 const arr = [{ label: 'title_one', val: '参数值1' }, { label: 'title_two', val: '参数值2' }];
 console.log(arrTransferObj(arr, 'label', 'val'))
 */
export function arrTransferObj(
  original: Record<string, string>[],
  key: string,
  val: any,
): Record<string, string> {
  // 数组的reduce方法，使数组的obj初始值为{}，将数组中每一个对象所需的值，分别作为对象中的键与值
  return original.reduce((obj, item) => ((obj[item[key]] = item[val]), obj), {});
}

/**
 * @function 对象转数组
 * @param {Object} original 原始对象
 * @param {String} key 键
 * @param {*} val 值
 * @return {Array} 返回对象
 * @example
 *
 const obj = { title_one: '参数值1', title_two: '参数值2' };
 console.log(objTransferArr(obj, 'label', 'val'))
 */
export function objTransferArr(
  original: Record<string, string>,
  key: string,
  val: any,
): Record<string, string>[] {
  const result = [];
  for (const item in original) {
    result.push({
      [key]: item,
      [val]: original[item],
    });
  }
  return result;
}

/**
 *  判断是否为 合法的JSON
 *
 * @export
 * @param {string} str 待校验的 json 字符串
 * @return {*}
 */
export function isJSON(str: string) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
}

/**
 * 在前端创建html或json文件，并通过浏览器进行导出
 *
 * @export
 * @param {string} content 文件内容
 * @param {string} [filename='tsl.json'] 文件名
 */
export function downloadFunction(content: string, filename = 'tsl.json') {
  const eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  const blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
/**
 * 判断是否为合法的 corn 表达式
 *
 * @param {string} value
 * @return {*}
 */
export const isCorn = (value: string) => {
  if (!value) return Promise.reject('请输入 cron 表达式');
  console.log('value', value);

  const v0 = value.replace(/(^\s*)|(\s*$)/g, '').split(' ');
  const v = v0.filter(function (e: any) {
    return e && e.trim();
  });
  if (v.length !== 6) return Promise.reject('无效 Cron 表达式');
  return isValidCron(value, {
    alias: true,
    seconds: true,
    allowBlankDay: true,
    allowSevenAsSunday: true,
  })
    ? Promise.resolve('有效 Cron 表达式')
    : Promise.reject('无效 Cron 表达式');
};

/**
 * 存储本地缓存
 *
 * @param {string} key
 * @param {*} value
 */
export const setLocalStorage = (key: string, value: any) => {
  try {
    const valueOfString = JSON.stringify(value);
    localStorage.setItem(KEYPREFIX + key, valueOfString);
  } catch (error) {
    throw new Error(`存储本地缓存时报错了, ${error}`);
  }
};
/**
 * 获取本地缓存
 *
 * @param {string} key
 * @return {*}
 */
export const getLocalStoragByKey = (key: string) => {
  try {
    const valueOfString = localStorage.getItem(KEYPREFIX + key);
    if (valueOfString) {
      const value = JSON.parse(valueOfString);
      return value;
    }
  } catch (error) {
    throw new Error(`获取本地缓存时报错了, ${error}`);
  }
};

/**
 * 下载文件
 * @param url 下载链接
 * @param params 参数
 */
export const downloadFile = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = url.substring(url.lastIndexOf('/') + 1);
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 第一个首字母大写

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// 睡眠

export const sleep = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
