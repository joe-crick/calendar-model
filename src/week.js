import startOfWeek from './date-utils/start_of_week';
import {getDay, getNDays} from './day';
import adjustDays from './date-utils/adjust_days';
import _getWeekNumber from './date-utils/get_week_number';
import numberToNameFinder from './name.finder';

const WEEK_DAY_NAMES = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

/**
 * @desc Creates an array of dates that corresponds to a week range.
 * @param {String | Date} startDate  A date in the week. This function will convert any
 * date passed into it to the beginning of the week.
 * @param {Function} getEvents An event binding function. A default function is provided.
 * @param {Function} formatDate A date formatting function. A default function is provided.
 * @param {number} numOfDays The number of days in a week. Zero-based, i.e., the default
 * number of days is 6.
 * @example
 * // Get a week using all the defaults
 * const week = getWeek({startDate: '03/17/2016'});
 *
 * // Override a default (the date formatter)
 * function americanFormat(date) {
 *   const day = addLeadingZeroIfLessThanTen(date.getDate());
 *   const month = addLeadingZeroIfLessThanTen(date.getMonth() + 1);
 *   return `${month}/${day}/${date.getFullYear()}`;
 * }
 *
 * const week = getWeek({startDate: '03/17/2017', formatDate: americanFormat})
 *
 * @returns {Array<Day>} An array of Days.
 */
export function getWeek({startDate, getEvents, formatDate, numOfDays = 6}) {
  return getNDays({startDate: startOfWeek(startDate), numOfDays, getEvents, formatDate});
}

/**
 * @desc Returns a set of _n_ weeks, when given a start seed.
 * @param {String | Date} startDate  A date in the week. This function will convert any
 * date passed into it to the beginning of the week.
 * @param {Function} getEvents An event binding function. A default function is provided.
 * @param {Function} formatDate A date formatting function. A default function is provided.
 * @param {number} numOfWeeks The number of weeks to return.
 * @param {number} numOfDaysInWeek The number of days in the week
 * @example
 * // Get a week using all the defaults
 * const week = getNWeeks({startDate: '03/17/2016'});
 *
 * // Override a default (the days in a week)
 * const week = getWeek({startDate: '03/17/2017', numOfDaysInWeek: 5})
 *
 * @returns {Array<Day>} A one-dimensional array of Days
 */
export function getNWeeks({startDate, getEvents, formatDate, numOfWeeks, numOfDaysInWeek = 6}) {
  if (!startDate) {
    return [];
  }

  const week = getWeek({startDate, getEvents, formatDate, numOfDays: numOfDaysInWeek});

  return !numOfWeeks
    ? week
    : week.concat(getNWeeks({startDate: getNextWeek(startDate), getEvents, formatDate, numOfWeeks: --numOfWeeks}));
}

/**
 * @desc Returns a nested array of Days. Each set of days is grouped in a week-long array.
 * @param {string | Date} startDate  A date in the week. This function will convert any
 * date passed into it to the beginning of the week.
 * @param {Function} getEvents An event binding function. A default function is provided.
 * @param {Function} formatDate A date formatting function. A default function is provided.
 * @param {number} numOfWeeks The number of weeks to return.
 * @example
 * // Get a week using all the defaults
 * const week = getNWeeks({startDate: '03/17/2016'});
 *
 * // Override a default (the days in a week)
 * const week = getWeek({startDate: '03/17/2017', numOfDaysInWeek: 5})
 *
 * @returns {Array<Array<Day>>} A two-dimensional array of Days. Each sub-array contains a week's worth of days. Useful for tabular data representation.
 */
export function getNWeeksNested({startDate, getEvents, formatDate, numOfWeeks}) {
  const weeks = [];
  let _date = startDate;

  for (let week = 0; week < numOfWeeks; week++) {
    weeks.push(getNWeeks({startDate: _date, getEvents, formatDate, numOfWeeks: 0}));
    _date = getNextWeek(_date);
  }

  return weeks;
}

/**
 * @desc Returns a Date set to the corresponding day in the next week
 * @param date
 * @param daysInWeek
 * @return {Date}
 */
function getNextWeek(date, daysInWeek = 7) {
  return adjustDays(date, daysInWeek);
}

/**
 * @desc Returns the corresponding day in the next week
 * @param date
 * @param daysInWeek
 * @return {Day}
 */
export function getNextWeekDay(date, daysInWeek = 7) {
  return getDay({date: getNextWeek(date, daysInWeek)});
}

/**
 * @desc Returns a Date set to the corresponding day in the previous week
 * @param date
 * @param daysInWeek
 * @return {Date}
 */
function getPrevWeek(date, daysInWeek = 7) {
  return adjustDays(date, -daysInWeek);
}

/**
 * @desc Returns the corresponding day in the previous week
 * @param date
 * @param daysInWeek
 * @return {Day}
 */
export function getPrevWeekDay(date, daysInWeek = 7) {
  return getDay({date: getPrevWeek(date, daysInWeek)});
}

/**
 * @desc CONSTRUCTOR: Creates a function that returns week day names.
 * @param {Object} weekDayNames Optional. An object with numeric indices 0 - n with values
 * corresponding to the weeks of the month. For example, the default value is:
 * {
 *   0: 'Sunday',
 *   1: 'Monday',
 *   2: 'Tuesday',
 *   3: 'Wednesday',
 *   4: 'Thursday',
 *   5: 'Friday',
 *   6: 'Saturday'
 * };
 * @example
 *  const tagesnamen = {
 *   0: 'Sontag',
 *   1: 'Montag',
 *   2: 'Dienstag',
 *   3: 'Mittwoch',
 *   4: 'Donnerstag',
 *   5: 'Fritag',
 *   6: 'Samstag'
 * };
 * const nameFinden = weekDayNameFinder(tagesnamen);
 * @returns {Function} A function that will find a week day name when given a number.
 */
export function weekDayNameFinder(weekDayNames = WEEK_DAY_NAMES) {
  return numberToNameFinder(weekDayNames);
}

/**
 * @desc Getter for getWeekNumber
 * @param {string | Date} date A valid date or date string.
 * @returns {number} The week number in the year.
 */
export function getWeekNumber(date) {
  return _getWeekNumber(date);
}