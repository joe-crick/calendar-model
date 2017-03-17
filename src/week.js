import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import eachDay from 'date-fns/each_day';
import addDays from 'date-fns/add_days';
import getDay from './day';
import {DAYS_IN_WEEK} from '../config/calendar.config';

/**
 * @desc Creates an array of dates that corresponds to a week range
 * @param {any} date 
 * @returns {Array<Day>} Dates
 */
export function getWeekForDate(date) {
    return eachDay(startOfWeek(date), endOfWeek(date)).map(date => getDay({date}));
}

/**
 * @desc Returns the date one week later when given a date 
 * @param {any} date 
 * @returns {Date}
 */
export function getDateInFollowingWeek(date, daysInWeek=7) {
    return addDays(date, daysInWeek);
}

/**
 * @desc Returns a set of _n_ weeks, when given a start seed.
 * @export
 * @param {any} date 
 * @param {any} numOfWeeks 
 * @returns {Array<Day>}
 */
export function getNWeeks(date, numOfWeeks) {

    if (!date) { return []; }

    const week = getWeekForDate(date);

    return !numOfWeeks 
        ? week 
        : week.concat(getNWeeks(getDateInFollowingWeek(date), --numOfWeeks));

}