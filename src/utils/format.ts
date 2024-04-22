import { endOfDay, format, startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const formatDate = (date?: Date | string) =>
  date ? format(new Date(date), 'yyyy-MM-dd') : '-';

export const formatYear = (date: Date | string) => (date ? format(new Date(date), 'yyyy') : '-');

export const formatDateAndTime = (datetime?: Date | string) =>
  datetime ? format(new Date(datetime), 'yyyy-MM-dd HH:mm') : '-';

export const formatTime = (time: Date | string) => (time ? format(new Date(time), 'HH:mm') : '-');

export const adjustForUTCOffset = (date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

export const formatDateTo = (date: Date) => {
  return toZonedTime(endOfDay(new Date(date)), 'Europe/Vilnius');
};

export const formatDateFrom = (date: Date) => {
  return toZonedTime(startOfDay(new Date(date)), 'Europe/Vilnius');
};

export const formatArea = (value: number) =>
  value < 10000 ? value.toFixed(2) + ' m\u00B2' : (value / 1000000).toFixed(2) + ' km\u00B2';

export const formatDistanceLength = (value: number) =>
  value < 1000 ? value.toFixed(2) + ' m' : (value / 1000).toFixed(2) + ' km';
