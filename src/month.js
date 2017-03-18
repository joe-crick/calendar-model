import { getNWeeks, getDateInFollowingWeek } from './week';
import { WEEKS_IN_MONTH } from '../config/calendar.config';
import numberToNameFinder from './name.finder';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * @description CONSTRUCTOR: Convenience method. Returns a set of weeks for a predefined month range. Specifically,
 * this returns a calendar month - i.e., 5 weeks/35 days. A calendar month includes days preceding and following
 * the actual days of the month.
 * 
 * @export
 * @param {any} {date, getEvents, formatDate, isNested} 
 * @returns {Array<Day>} An Array of Days
 */
export function getCalendarMonth({date, getEvents, formatDate}) {
    return getNWeeks({date, getEvents, formatDate, numOfWeeks: WEEKS_IN_MONTH()});
}


/**
 * @description Returns a nested array of Days. Each set of days is grouped in a week-long array.
 * 
 * @export
 * @param {any} {date, getEvents, formatDate} 
 * @returns 
 */
export function getNestedCalendarMonth({date, getEvents, formatDate}) {
    const weeks = [];
    let _date = date;
    const weeksInMonth = WEEKS_IN_MONTH();

    for(let week = 0; week < weeksInMonth; week++) {
        weeks.push(getNWeeks({date: _date, getEvents, formatDate, numOfWeeks: 0}));
        _date = getDateInFollowingWeek(_date);
    }
 
    return weeks;
}


/**
 * @description Returns a month name, when given a month number
 * 
 * @export
 * @param {any} [monthNames=MONTH_NAMES] 
 * @returns {string} A month name
 */
export function monthNameFinder(monthNames=MONTH_NAMES) {
    return numberToNameFinder(monthNames);
}