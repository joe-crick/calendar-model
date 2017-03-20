import startOfWeek from './date-utils/start_of_week';
import {getNDays} from './day';
import adjustDays from './date-utils/adjust_days';
import _getWeekNumber from './date-utils/get_week_number';
import numberToNameFinder from './name.finder';
import parse from './date-utils/parse';

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
 * @desc Creates an array of dates that corresponds to a week range
 * @param {String | Date} startDate
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @param {number} numOfDays
 * @returns {Array.<Day>}
 */
export function getWeekForDate({startDate, getEvents, formatDate, numOfDays = 6}) {
  return getNDays({startDate: startOfWeek(startDate), numOfDays, getEvents, formatDate});
}

/**
 * @desc Returns the date one week later when given a date
 * @param dirtyDate
 * @param {number} daysInWeek
 * @returns {Date}
 */
export function getNextWeek(dirtyDate, daysInWeek = 7) {
  const date = parse(dirtyDate);
  return adjustDays(date, daysInWeek);
}

/**
 * @desc Returns the date one week earlier when given a date
 * @param dirtyDate
 * @param daysInWeek
 * @returns {Date}
 */
export function getPrevWeek(dirtyDate, daysInWeek = -7) {
  const date = parse(dirtyDate);
  return adjustDays(date, daysInWeek);
}

/**
 * @desc Returns a set of _n_ weeks, when given a start seed.
 * @param {String | Date} startDate
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @param {number} numOfWeeks
 * @returns {Array<Day>}
 */
export function getNWeeks({startDate, getEvents, formatDate, numOfWeeks}) {
  if (!startDate) {
    return [];
  }

  const week = getWeekForDate({startDate, getEvents, formatDate});

  return !numOfWeeks
    ? week
    : week.concat(getNWeeks({startDate: getNextWeek(startDate), getEvents, formatDate, numOfWeeks: --numOfWeeks}));
}

/**
 * @desc Returns a nested array of Days. Each set of days is grouped in a week-long array.
 * @param {String | Date} startDate
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @param {number} numOfWeeks
 * @returns {Array}
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
 * @desc CONSTRUCTOR: Creates a function that returns Week DAy names.
 * @param {any} weekDayNames
 */
export function weekDayNameFinder(weekDayNames = WEEK_DAY_NAMES) {
  return numberToNameFinder(weekDayNames);
}

/**
 * @desc Proxy for getWeekNumber
 * @param date
 */
export function getWeekNumber(date) {
  return _getWeekNumber(date);
}