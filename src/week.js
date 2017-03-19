import startOfWeek from './date-utils/start_of_week';
import endOfWeek from './date-utils/end_of_week';
import {getNDays} from './day';
import addDays from './date-utils/add_days';
import getDay from './day';
import numberToNameFinder from './name.finder';

const WEEK_DAY_NAMES = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};


/**
 * @desc Creates an array of dates that corresponds to a week range
 * 
 * @export
 * @param {any} {date, getEvents, formatDate} 
 * @returns {Array<Day>} Dates
 */
export function getWeekForDate({date, getEvents, formatDate}) {
    return getNDays({startDate: startOfWeek(date), endDate: endOfWeek(date), getEvents, formatDate});
}

/**
 *  Returns the date one week later when given a date 
 * 
 * @export
 * @param {any} date 
 * @param {any} [daysInWeek=DAYS_IN_WEEK()] 
 * @returns {Date}
 */
export function getDateInFollowingWeek(date, daysInWeek=7) {
    return addDays(date, daysInWeek);
}

/**
 * @description Returns a set of _n_ weeks, when given a start seed.
 * 
 * @export
 * @param {any} {date, getEvents, formatDate, numOfWeeks} 
 * @returns {Array<Date>}
 */
export function getNWeeks({date, getEvents, formatDate, numOfWeeks}) {
    if (!date) { return []; }

    const week = getWeekForDate({date, getEvents, formatDate});

    return !numOfWeeks 
        ? week 
        : week.concat(getNWeeks({date: getDateInFollowingWeek(date), getEvents, formatDate, numOfWeeks: --numOfWeeks}));
}

/**
 *  * @description CONSTRUCTOR: Creates a function that returns Week DAy names.
 * 
 * @export
 * @param {any} [weekDayNames=WEEK_DAY_NAMES] 
 * @returns {Function} A function that returns a Week Day name when given a Week Day number
 */
export function weekDayNameFinder(weekDayNames=WEEK_DAY_NAMES) {
    return numberToNameFinder(weekDayNames);
}