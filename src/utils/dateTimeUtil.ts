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

export const getStartAndEndOfMonth = () => {
  const startDate = dayjs().startOf('month').valueOf();
  const endDate = dayjs().endOf('month').valueOf();
  return {startDate, endDate};
};

export const getDatesInRange = (fromDate?: number, toDate?: number): Date[] => {
  if (!fromDate || !toDate) {
    return [];
  }

  const start = dayjs(fromDate).startOf('day');
  const end = dayjs(toDate).startOf('day');

  const dates: Date[] = [];
  let current = start;

  while (current.isSame(end) || current.isBefore(end)) {
    dates.push(current.toDate());
    current = current.add(1, 'day');
  }
  return dates;
};
