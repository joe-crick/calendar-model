import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import eachDay from 'date-fns/each_day';
import addDays from 'date-fns/add_days';

const DAYS_IN_WEEK = 7;

/**
 * @desc Creates an array of dates that corresponds to a week range
 * @param {any} date 
 * @returns {Array} Dates
 */
export function getWeekForDate(date) {
    return eachDay(startOfWeek(date), endOfWeek(date));
}

/**
 * @desc Returns the date one week later when given a date 
 * @param {any} date 
 * @returns {Date}
 */
export function getDateInFollowingWeek(date) {
    return addDays(date, DAYS_IN_WEEK);
}

/**
 * @desc Returns a set of _n_ weeks, when given a start seed.
 * @export
 * @param {any} date 
 * @param {any} numOfWeeks 
 * @returns {Array}
 */
export function getNWeeks(date, numOfWeeks) {

    if (!date) { return []; }

    const week = getWeekForDate(date);

    return !numOfWeeks 
        ? week 
        : week.concat(getNWeeks(getDateInFollowingWeek(date), --numOfWeeks));

}