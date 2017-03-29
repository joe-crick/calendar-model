import {addLeadingZeroIfLessThanTen, formatDate as format} from './date-utils/format';
import {getJsDate} from './date-utils/get_date';
import noOp from './utils/no-op';
import getRangeOfDates from './date-utils/get_range_of_dates';
import addDays from './date-utils/adjust_days';
import getWeekNumber from './date-utils/get_week_number';
import {getTwelveHourTime} from './date-utils/time_utils';

/**
 * @description CONSTRUCTOR: Returns a day object, which is a JS Date, a formatted string version of the date, and some convenience
 * methods that provide ISO Date, and Week Day Number. Also contains a set of Events for that day.
 * _getEvents-: A function that returns a set of events when given a date object.
 * _formatDate_: A function that returns a valid formatted date. Defaults to date-fns format function, International date format.
 *
 * @param {string | Date} date A valid date or date string.
 * @param {Function} [getEvents=noOp] getEvents An event binding function. A default function is provided.
 * @param {Function} [formatDate=format] formatDate A date formatting function. A default function is provided.
 * @param {Function} [toISOString=Date.prototype.toISOString] toISOString
 * @returns {Day}
 */
export function getDay({date, getEvents = noOp, formatDate = format, toISOString = Date.prototype.toISOString}) {
  return {
    date: getJsDate(date),
    /**
     * @return {string} A date formatted in accordance with the format defined by the format function
     */
    get formattedDate() {
      return formatDate(this.date);
    },
    /**
     * @return {string} The date in 24-hour time
     */
    get twentyFourHourTime() {
      return this.date.toTimeString().split(' ')[0];
    },
    /**
     * @note Choosing to implement a more lengthy algorithm to support older browsers
     * @return {string} The date in 12 hour time
     */
    get twelveHourTime() {
      const date = this.date;
      const hours = addLeadingZeroIfLessThanTen(getTwelveHourTime(date.getHours()));
      const minutes = addLeadingZeroIfLessThanTen(date.getMinutes() );
      const seconds = addLeadingZeroIfLessThanTen(date.getSeconds());
      return `${hours}:${minutes}:${seconds}`;
    },
    /**
     * @desc Convenience method
     * @return {number} The day of the week
     */
    get dayOfWeek() {
      return this.date.getDay();
    },
    /**
     * @desc Convenience method
     * @return {number} The day of the month
     */
    get dayOfMonth() {
      return this.date.getDate();
    },
    /**
     * @return {number} The week of the year
     */
    get weekOfYear() {
      return getWeekNumber(this.date);
    },
    /**
     * @desc JS' Date object takes a 1-based scheme for date creation, but returns a 0-based scheme
     * on month queries. This interface adds a bit of sanity, so that we're only ever dealing with
     * one-based month schemes.
     * @return {number} The month (one-based)
     */
    get month() {
      return this.date.getMonth() + 1;
    },
    /**
     * @desc Convenience method
     * @return {number} The full year
     */
    get year() {
      return this.date.getFullYear();
    },
    /**
     * @return {string} The ISO date
     */
    get isoDate() {
      return toISOString.call(this.date, this.date);
    },
    /**
     * @return {Array} The events associated with this day
     */
    get events() {
      return getEvents(this.date);
    },
    isCalendarModelDay: true
  };
}

/**
 * @desc Creates an array of dates that corresponds to a range
 * @param {String | Date} startDate The day to begin collecting days from
 * @param {number} numOfDays The number of days to collect
 * @param {Function} getEvents An event binder
 * @param {Function} formatDate A date formatter
 * @returns {Array<Day>} A set of N Days
 */
export function getNDays({startDate, numOfDays, getEvents, formatDate}) {
  const endDate = addDays(startDate, numOfDays);
  return getRangeOfDates(startDate, endDate).map(date => getDay({date, getEvents, formatDate}));
}