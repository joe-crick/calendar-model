import { getNWeeks } from './week';
import { WEEKS_IN_MONTH } from '../config/calendar.config';


/**
 * @description CONSTRUCTOR: Convenience method. Returns a set of weeks for a predefined month range. Specifically,
 * this returns a calendar month - i.e., 5 weeks/35 days. A calendar month includes days preceding and following
 * the actual days of the month.
 * 
 * @param {any} date 
 * @returns 
 */
export function getCalendarMonth(date) {
    return getNWeeks(date, WEEKS_IN_MONTH());
}