import parse from './parse.js';

/**
 * @private
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = adjustDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
export default function adjustDays(dirtyDate, dirtyAmount) {
    const date = parse(dirtyDate);
    const amount = dirtyAmount >> 0;
    date.setDate(date.getDate() + amount);
    return date;
}