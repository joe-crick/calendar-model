import parse from './date-utils/parse';
import isDate from './date-utils/is_date';

/**
 * @description Given a valid date string, or Date object, returns a Date object.
 * 
 * @param {any} date 
 * @returns {Date}
 */
export function getDate(date) {
    return isDate(date) ? date : parse(date);
}