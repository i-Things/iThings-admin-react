import generatePicker from 'antd/es/date-picker/generatePicker';
import type { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/es/generate/moment';

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export default DatePicker;
