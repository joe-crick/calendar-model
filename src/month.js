import {getNWeeks, getNWeeksNested} from './week';
import startOfMonth from './date-utils/start_of_month';

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
export function getMonth({startDate, getEvents, formatDate, weeksInMonth = WEEKS_IN_MONTH}) {
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
 * @returns {Array<Array<Day>>} A two-dimensional array of Days. Each sub-array contains a week's worth of days. Useful for tabular data representation.
 */
export function getNestedMonth({startDate, getEvents, formatDate, weeksInMonth = WEEKS_IN_MONTH}) {
  return getNWeeksNested({startDate: startOfMonth(startDate), getEvents, formatDate, numOfWeeks: weeksInMonth});
}

