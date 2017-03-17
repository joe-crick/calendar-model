import parse from 'date-fns/parse';
import isDate from 'date-fns/is_date';

/**
 * @description Given a valid date string, or Date object, returns a Date object.
 * 
 * @param {any} date 
 * @returns {Date}
 */
export function getDate(date) {
    return  isDate(date) ? date : parse(date);
}