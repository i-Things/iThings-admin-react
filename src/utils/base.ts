import moment from 'moment';

export enum FlagStatus {
  ADD = 'add',
  CREATE = 'create',
  UPDATE = 'update',
}
export enum ResponseCode {
  SUCCESS = 200,
  FAIL = 500,
}

export const DefaultPage = { page: 1, size: 20 };

export const ColumnConfig = { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };

export const getInitialTime = () => {
  return [moment(moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')), '0'];
};
