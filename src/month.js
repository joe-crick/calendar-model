import {getNWeeks, getNWeeksNested} from './week';
import numberToNameFinder from './name.finder';
import parse from './date-utils/parse';
import startOfMonth from './date-utils/start_of_month';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKS_IN_MONTH = 5;

/**
 * @description CONSTRUCTOR: Convenience method. Returns a set of weeks for a predefined month range. Specifically,
 * this returns a calendar month - i.e., 5 weeks/35 days. A calendar month includes days preceding and following
 * the actual days of the month.
 * @param {String | Date} startDate A date in the month. This function will convert any date passed into it
 * to the format: MM/01/YYYY.
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @param {number} weeksInMonth
 * @returns {Array<Day>} A one-dimensional array of Days
 */
export function getCalendarMonth({startDate, getEvents, formatDate, weeksInMonth = WEEKS_IN_MONTH}) {
  return getNWeeks({startDate: startOfMonth(startDate), getEvents, formatDate, numOfWeeks: weeksInMonth});
}


/**
 * @description Returns a nested array of Days. Each set of days is grouped in a week-long array.
 *
 * @param {String | Date} startDate A date in the month. This function will convert any date passed into it
 * to the format: MM/01/YYYY.
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @param {number} weeksInMonth
 * @returns {Array} A two-dimensional array of Days. Each sub-array contains a week's worth of days. Useful for tabular data representation.
 */
export function getNestedCalendarMonth({startDate, getEvents, formatDate, weeksInMonth = WEEKS_IN_MONTH}) {
  return getNWeeksNested({startDate: startOfMonth(startDate), getEvents, formatDate, numOfWeeks: weeksInMonth});
}


/**
 * @description Returns a month name, when given a month number
 * @param {[*]} monthNames
 * @returns {getName} A function that matches a number to a Month name (e.g., 0 === January)
 */
export function monthNameFinder(monthNames = MONTH_NAMES) {
  return numberToNameFinder(monthNames);
}

/**
 * @desc Returns the following month in a 12-month calendar
 * @return {number} A zero-based number representing the next month (e.g., 0 === January)
 * @param {String | Date} dirtyDate A date string or JS Date object
 */
export function getNextMonth(dirtyDate) {
  const date = parse(dirtyDate);
  const currentMonth = date.getMonth() + 1;
  return currentMonth < 12 ? (currentMonth + 1) : 1
}

/**
 * @desc Returns the previous month in a 12-month calendar
 * @return {number} A zero-based number representing the next month (e.g., 0 === January)
 * @param {String | Date} dirtyDate  A date string or JS Date object
 */
export function getPrevMonth(dirtyDate) {
  const date = parse(dirtyDate);
  const currentMonth = date.getMonth();
  return (currentMonth + 1) > 1 ? currentMonth : 12
}