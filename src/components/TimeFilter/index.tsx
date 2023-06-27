import { TIME_TYPE_DATA } from '@/utils/const';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import DatePicker from '../DatePicker';
import { resetTimeRange } from './utils';

interface TimeFilterProps {
  onChange: (val: any, type: number) => void;
}

const { RangePicker }: any = DatePicker;

const TimeFilter: React.FC<TimeFilterProps> = (props) => {
  const { onChange } = props;
  const [timeType, setTimeType] = useState(0);
  const [timeRange, setTimeRange] = useState([
    moment(moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm')),
    moment(),
  ]);

  const timeTypeChange = (e: RadioChangeEvent) => {
    setTimeType(e.target.value);
    const { startTime, endTime } = resetTimeRange(e.target.value);
    onChange([moment(startTime), e.target.value === 3 ? moment(endTime) : '0'], e.target.value);
    const value: moment.Moment[] = [
      startTime == '0' ? moment() : moment(startTime),
      endTime == '0' ? moment() : moment(endTime),
    ];
    setTimeRange(value);
  };

  const timeRangeChange = (value: moment.Moment[]) => {
    setTimeType(6);
    setTimeRange(value);
    onChange(value, timeType);
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
        format="YYYY-MM-DD HH:mm:ss"
      />
    </>
  );
};

export default TimeFilter;
