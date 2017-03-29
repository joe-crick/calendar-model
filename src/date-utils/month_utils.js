import numberToNameFinder from '../utils/name.finder';
import parse from './parse';

const MONTH_NAMES = [undefined,'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * @desc Returns the following month in a 12-month calendar
 * @param {String | Date} dirtyDate A date string or JS Date object
 * @return {number} A one-based number representing the next month (e.g., 1 === January)
 */
export function getNextMonth(dirtyDate) {
  const date = parse(dirtyDate);
  const currentMonth = date.getMonth() + 1;
  return currentMonth < 12 ? (currentMonth + 1) : 1
}

/**
 * @desc Returns the previous month in a 12-month calendar
 * @param {String | Date} dirtyDate  A date string or JS Date object
 * @return {number} A one-based number representing the next month (e.g., 1 === January)
 */
export function getPrevMonth(dirtyDate) {
  const date = parse(dirtyDate);
  const currentMonth = date.getMonth();
  return (currentMonth + 1) > 1 ? currentMonth : 12
}

/**
 * @description Returns a month name, when given a month number (one-based)
 * @param {Object} monthNames
 * @returns {Function} A function that matches a number to a Month name (e.g., 1 === January)
 */
export function monthNameFinder(monthNames = MONTH_NAMES) {
  return numberToNameFinder(monthNames);
}
