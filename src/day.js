import format from './format';
import {getJsDate} from './date';
import noOp from './no-op';
import getRangeOfDates from './date-utils/get_range_of_dates';
import addDays from './date-utils/adjust_days';
import getWeekNumber from './date-utils/get_week_number';

/**
 * @description CONSTRUCTOR: Returns a day object, which is a JS Date, a formatted string version of the date, and some convenience
 * methods that provide ISO Date, and Week Day Number. Also contains a set of Events for that day.
 * _getEvents-: A function that returns a set of events when given a date object.
 * _formatDate_: A function that returns a valid formatted date. Defaults to date-fns format function, International date format.
 *
 * @param {string | Date} date A valid date or date string.
 * @param {Function} getEvents An event binding function. A default function is provided.
 * @param {Function} formatDate A date formatting function. A default function is provided.
 * @param {Function} toISOString
 * @returns {Day}
 */
export function getDay({date, getEvents = noOp, formatDate = format, toISOString = Date.prototype.toISOString}) {
  return {
    date: getJsDate(date),
    /**
     * @return {string}
     */
    get formattedDate() {
      return formatDate(this.date);
    },
    /**
     * @desc Convenience method
     * @return {number}
     */
    get dayOfWeek() {
      return this.date.getDay();
    },
    /**
     * @desc Convenience method
     * @return {number}
     */
    get dayOfMonth() {
      return this.date.getDate();
    },
    /**
     * @return {number}
     */
    get weekNumber() {
      return getWeekNumber(this.date);
    },
    /**
     * @desc JS' Date object takes a 1-based scheme for date creation, but returns a 0-based scheme
     * on month queries. This interface adds a bit of sanity, so that we're only ever dealing with
     * one-based month schemes.
     * @return {number}
     */
    get month() {
      return this.date.getMonth() + 1;
    },
    /**
     * @desc Convenience method
     * @return {number}
     */
    get year() {
      return this.date.getFullYear();
    },
    /**
     * @return {string}
     */
    get isoDate() {
      return toISOString.call(this.date, this.date);
    },
    /**
     * @return {Array}
     */
    get events() {
      return getEvents(this.date);
    },
    isCalendarModelDay: true
  };
}

/**
 * @desc Creates an array of dates that corresponds to a range
 * @param {String | Date} startDate
 * @param {number} numOfDays
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @returns {Array<Day>}
 */
export function getNDays({startDate, numOfDays, getEvents, formatDate}) {
  const endDate = addDays(startDate, numOfDays);
  return getRangeOfDates(startDate, endDate).map(date => getDay({date, getEvents, formatDate}));
}