// eslint-disable-next-line no-restricted-imports
import {
  addMinutes as _addMinutes,
  format,
  isValid,
  startOfMinute as _startOfMinute,
} from "date-fns";

export type DateParam = Date | number | string | undefined | null;

export const checkIsDateValid = (date: Date) => isValid(date);

export const getValidDateObject = (date: DateParam): Date | undefined => {
  if (date === undefined || date === null) return;
  date = date instanceof Date ? date : new Date(date);

  return checkIsDateValid(date) ? date : undefined;
};

export const formatDate = (
  date: DateParam,
  formatString: string,
  options: Parameters<typeof format>[2] = {},
) => {
  date = getValidDateObject(date);
  if (!date) return;
  return format(date, formatString, options);
};

export const addMinutes = (date: DateParam, amount: number) => {
  date = getValidDateObject(date);
  if (!date) return;
  return _addMinutes(date, amount);
};

export const startOfMinute = (date: DateParam) => {
  date = getValidDateObject(date);
  if (!date) return;
  return _startOfMinute(date);
};

export const stripTimezoneFromISODateString = (dateStr: string): string => {
  if (dateStr.length <= 16) return dateStr;
  return dateStr.replace(/([+-]\d{2}(:?\d{2})?|Z)$/, "");
};
