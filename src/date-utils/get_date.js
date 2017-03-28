import parse from './parse';
import isDate from './is_date';

/**
 * @desc Given a valid date string, or Date object, returns a Date object.
 * @param {string | Date} date A valid date or date string.
 * @returns {Date} A JS Date object
 */
export function getJsDate(date) {
    return isDate(date) ? date : parse(date);
}