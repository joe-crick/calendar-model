import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import getRangeOfDates from 'date-fns/each_day';
import addDays from 'date-fns/add_days';
import getDay from './day';
import {DAYS_IN_WEEK} from '../config/calendar.config';

/**
 * @desc Creates an array of dates that corresponds to a week range
 * @param {any} date 
 * @returns {Array<Day>} Dates
 */
export function getWeekForDate({date, getEvents, formatDate}) {
    return getRangeOfDates(startOfWeek(date), endOfWeek(date)).map(date => getDay({date, getEvents, formatDate}));
}


/**
 *  Returns the date one week later when given a date 
 * 
 * @export
 * @param {any} date 
 * @param {any} [daysInWeek=DAYS_IN_WEEK()] 
 * @returns {Date}
 */
export function getDateInFollowingWeek(date, daysInWeek=DAYS_IN_WEEK()) {
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
