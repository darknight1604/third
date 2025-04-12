import dayjs from 'dayjs';
import {DATE_TIME_FORMAT} from '../constants';

export function formatDate(
  date: Date,
  pattern: string = DATE_TIME_FORMAT.FORMAT1,
): string {
  return dayjs(date).format(pattern);
}

export function parse(
  value: string,
  pattern: string = DATE_TIME_FORMAT.FORMAT1,
): Date {
  return dayjs(value, pattern).toDate();
}
