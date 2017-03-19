import {getNWeeks, getNWeeksNested} from './week';
import numberToNameFinder from './name.finder';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKS_IN_MONTH = 5;

/**
 * @description CONSTRUCTOR: Convenience method. Returns a set of weeks for a predefined month range. Specifically,
 * this returns a calendar month - i.e., 5 weeks/35 days. A calendar month includes days preceding and following
 * the actual days of the month.
 * @param {String | Date} startDate
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @param {number} weeksInMonth
 * @returns {Array<Day>}
 */
export function getCalendarMonth({startDate, getEvents, formatDate, weeksInMonth = WEEKS_IN_MONTH}) {
  return getNWeeks({startDate, getEvents, formatDate, numOfWeeks: weeksInMonth});
}


/**
 * @description Returns a nested array of Days. Each set of days is grouped in a week-long array.
 *
 * @param {String | Date} startDate
 * @param {Function} getEvents
 * @param {Function} formatDate
 * @param {number} weeksInMonth
 * @returns {Array}
 */
export function getNestedCalendarMonth({startDate, getEvents, formatDate, weeksInMonth = WEEKS_IN_MONTH}) {
  return getNWeeksNested({startDate, getEvents, formatDate, numOfWeeks: weeksInMonth});
}


/**
 * @description Returns a month name, when given a month number
 *
 * @param {any} monthNames
 * @returns {Function}
 */
export function monthNameFinder(monthNames = MONTH_NAMES) {
  return numberToNameFinder(monthNames);
}