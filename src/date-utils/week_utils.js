import adjustDays from './adjust_days';
import _getWeekNumber from './get_week_number';
import numberToNameFinder from '../utils/name.finder';
import {getDay} from '../day';

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
 * @desc Returns a Date set to the corresponding day in the next week
 * @param date
 * @param daysInWeek
 * @return {Date}
 */
export function getNextWeek(date, daysInWeek = 7) {
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
export function getPrevWeek(date, daysInWeek = 7) {
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