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
 * @param {any} {date, getEvents, formatDate, numOfDays} 
 * @returns {Array<Day>} Dates
 */
export function getWeekForDate({date, getEvents, formatDate, numOfDays=6}) {
    return getNDays({startDate: startOfWeek(date), numOfDays, getEvents, formatDate});
}

/**
 * @description Returns the date one week later when given a date
 * 
 * @export
 * @param {any} date 
 * @param {number} [daysInWeek=7] 
 * @returns 
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
 * @description Returns a nested array of Days. Each set of days is grouped in a week-long array.
 * 
 * @export
 * @param {any} {date, getEvents, formatDate} 
 * @returns 
 */
export function getNWeeksNested({date, getEvents, formatDate, numOfWeeks}) {
    const weeks = [];
    let _date = date;

    for(let week = 0; week < numOfWeeks; week++) {
        weeks.push(getNWeeks({date: _date, getEvents, formatDate, numOfWeeks: 0}));
        _date = getDateInFollowingWeek(_date);
    }
 
    return weeks;
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