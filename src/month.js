import { getNWeeks } from './week';
import { WEEKS_IN_MONTH } from '../config/calendar.config';


/**
 * @description CONSTRUCTOR: Convenience method. Returns a set of weeks for a predefined month range.
 * 
 * @param {any} month 
 * @param {any} year 
 * @returns 
 */
function getMonth(month, year) {
    return getNWeeks(month, WEEKS_IN_MONTH);
}