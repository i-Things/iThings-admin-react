import moment from 'moment';

// 设置时间范围
export const resetTimeRange = (value: number) => {
  let startTime: string = '';
  let endTime: string = '0';
  switch (value) {
    case 0:
      startTime = moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
      break;
    case 1:
      startTime = moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
      break;
    case 2:
      startTime = moment().format('YYYY-MM-DD') + ' 00:00:00';
      break;
    case 3:
      startTime = moment().add(-1, 'd').format('YYYY-MM-DD') + ' 00:00:00';
      endTime = moment().add(-1, 'd').format('YYYY-MM-DD') + ' 23:59:59';
      break;
    case 4:
      startTime = moment().add(-6, 'd').format('YYYY-MM-DD HH:mm:ss');
      break;
  }
  return { startTime, endTime };
};
