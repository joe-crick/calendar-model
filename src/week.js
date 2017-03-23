import startOfWeek from './date-utils/start_of_week';
import {getNDays} from './day';
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
 * @returns {Array.<Day>} An array of Days.
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
 * @returns {Array<Day>} A one-dimensional array of Days
 */
export function getNWeeks({startDate, getEvents, formatDate, numOfWeeks}) {
  if (!startDate) {
    return [];
  }

  const week = getWeek({startDate, getEvents, formatDate});

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
 * @returns {Array} A two-dimensional array of Days. Each sub-array contains a week's worth of days. Useful for tabular data representation.
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
 * @desc Returns the date one week later when given a date.
 * @param {String | Date} date A valid date or date string.
 * @param {number} daysInWeek Optional. Defaults to 7. Can be overridden.
 * @returns {Date} A date one week in the future from the date provided.
 */
export function getNextWeek(date, daysInWeek = 7) {
  return adjustDays(date, daysInWeek);
}

/**
 * @desc Returns the date one week earlier when given a date.
 * @param {String | Date} date A valid date or date string.
 * @param {number} daysInWeek The number of days in the week. Defaults to 7.
 * @returns {Date} A date one week in the past from the date provided.
 */
export function getPrevWeek(date, daysInWeek = 7) {
  return adjustDays(date, -daysInWeek);
}

/**
 * @desc CONSTRUCTOR: Creates a function that returns week day names.
 * @param {Object} weekDayNames Optional. An object with numeric indices 0 - n with values
 * corresponding to the weeks of the month. For example, the default value is:
 * {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};
 * @returns {getName} A function that will find a week day name when given a number.
 */
export function weekDayNameFinder(weekDayNames = WEEK_DAY_NAMES) {
  return numberToNameFinder(weekDayNames);
}

/**
 * @desc Proxy for getWeekNumber
 * @param {string | Date} date A valid date or date string.
 * @returns {number} The week number in the year.
 */
export function getWeekNumber(date) {
  return _getWeekNumber(date);
}