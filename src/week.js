import startOfWeek from './date-utils/start_of_week';
import {getNDays} from './day';
import {getNextWeek} from './date-utils/week_utils';

const DAYS_IN_WEEK = 6;

/**
 * @desc Creates an array of dates that corresponds to a week range.
 * @param {String | Date} startDate  A date in the week. This function will convert any
 * date passed into it to the beginning of the week.
 * @param {Function} [getEvents=getEvents] getEvents An event binding function. A default function is provided.
 * @param {Function} [formatDate=format] formatDate A date formatting function. A default function is provided.
 * @param {number} [numOfDays=6] numOfDays The number of days in a week. Zero-based, i.e., the default
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
export function getWeek({startDate, getEvents, formatDate, numOfDays = DAYS_IN_WEEK}) {
  return getNDays({startDate: startOfWeek(startDate), numOfDays, getEvents, formatDate});
}

/**
 * @desc Returns a set of _n_ weeks, when given a start seed.
 * @param {String | Date} startDate  A date in the week. This function will convert any
 * date passed into it to the beginning of the week.
 * @param {Function} [getEvents=getEvents] getEvents An event binding function.
 * @param {Function} [formatDate=format] formatDate A date formatting function.
 * @param {number} numOfWeeks The number of weeks to return.
 * @param {number} [numOfDaysInWeek=6] numOfDaysInWeek The number of days in the week
 * @example
 * // Get a week using all the defaults
 * const week = getNWeeks({startDate: '03/17/2016'});
 *
 * // Override a default (the days in a week)
 * const week = getWeek({startDate: '03/17/2017', numOfDaysInWeek: 5})
 *
 * @returns {Array<Day>} A one-dimensional array of Days
 */
export function getNWeeks({startDate, getEvents, formatDate, numOfWeeks, numOfDaysInWeek = DAYS_IN_WEEK}) {
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
 * @param {Function} [getEvents=getEvents] getEvents An event binding function.
 * @param {Function} [formatDate=format] formatDate A date formatting function.
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