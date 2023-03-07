import { TIME_TYPE_DATA } from '@/utils/const';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import DatePicker from '../DatePicker';

interface TimeFilterProps {
  onChange: (val: any) => void;
}

const { RangePicker }: any = DatePicker;

const TimeFilter: React.FC<TimeFilterProps> = (props) => {
  const { onChange } = props;
  const [timeType, setTimeType] = useState(0);
  const [timeRange, setTimeRange] = useState([
    moment(moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm')),
    moment(),
  ]);

  // 设置时间范围
  const resetTimeRange = (value: number) => {
    let startTime: string = '';
    let endTime: string = moment().format('YYYY-MM-DD HH:mm');
    switch (value) {
      case 0:
        startTime = moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm');
        break;
      case 1:
        startTime = moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm');
        break;
      case 2:
        startTime = moment().format('YYYY-MM-DD') + ' 00: 00';
        endTime = moment().format('YYYY-MM-DD') + ' 23: 59';
        break;
      case 3:
        startTime = moment().add(-1, 'd').format('YYYY-MM-DD') + ' 00: 00';
        endTime = moment().add(-1, 'd').format('YYYY-MM-DD') + ' 23: 59';
        break;
      case 4:
        startTime = moment().add(-6, 'd').format('YYYY-MM-DD') + ' 00: 00';
        endTime = moment().format('YYYY-MM-DD') + ' 23: 59';
        break;
    }
    onChange([moment(startTime), moment(endTime)]);
  };

  const timeTypeChange = (e: RadioChangeEvent) => {
    setTimeType(e.target.value);
    resetTimeRange(e.target.value);
  };

  const timeRangeChange = (value: moment.Moment[]) => {
    setTimeType(-1);
    setTimeRange(value);
    onChange(value);
  };

  const disabledRangeDate = (current: any) => {
    return current > moment() || current < moment().add(-7, 'd');
  };

  return (
    <>
      <Radio.Group
        value={timeType}
        onChange={timeTypeChange}
        style={{ marginRight: 20 }}
        optionType="button"
        options={TIME_TYPE_DATA}
      />
      <RangePicker
        value={timeRange}
        allowClear={false}
        disabledDate={disabledRangeDate}
        showTime
        onChange={timeRangeChange}
        format="YYYY-MM-DD HH:mm"
      />
    </>
  );
};

export default TimeFilter;
