import type { Moment } from 'moment';
import moment from 'moment';
export function timestampToDateStr(
  timestamp: number,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (timestamp == 0) {
    return '-';
  }
  const m = timestampToDate(timestamp);
  if (m.isValid()) {
    return m.format(format);
  } else {
    return '-';
  }
}

//毫秒时间戳格式化成字符串
export function milliTdToDate(date: string, fmt: string = 'YYYY-MM-DD HH:mm:ss.SSS'): string {
  if (date === '0') {
    return date;
  } else {
    return moment(Number(date)).format(fmt) || '-';
  }
}

export function dateStrToTimestamp(date: string): number {
  return moment(date, 'YYYY-MM-DD HH:mm:ss').valueOf();
}

export function timestampToDate(timestamp: number): Moment {
  if (timestamp < 9999999999) {
    // eslint-disable-next-line no-param-reassign
    timestamp *= 1000;
  }
  return moment(timestamp);
}

// 获取当前年月日 星期 以及 当前时间
export function curTime() {
  const date = new Date();
  let str = '';

  // 获取日期：年月日
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  str += year + '年' + month + '月' + day + '日' + ' ';

  // 获取星期几
  const weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  str += weeks[new Date().getDay()] + ' ';

  // 获取时间：时分秒
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const secound = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  str += hour + ':' + minute + ':' + secound;

  return '现在是：' + str;
}
