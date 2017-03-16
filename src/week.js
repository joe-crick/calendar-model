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
export function getWeek(date) {
    return eachDay(startOfWeek(date), endOfWeek(date));
}

/**
 * @desc Returns the date one week later when given a date 
 * @param {any} date 
 * @returns {Date}
 */
export function getNextWeek(date) {
    return addDays(date, DAYS_IN_WEEK);
}

/**
 * @desc Returns a set of _n_ weeks, when given a start seed.
 * @export
 * @param {any} startDate 
 * @param {any} numOfWeeks 
 * @returns {Array}
 */
export function getNWeeks(startDate, numOfWeeks) {

    if (!startDate) {
        return [];
    }

    return function getWeekSet(date, weekNum) {
        const week = getWeek(date);
        if (weekNum === numOfWeeks) {
            return week;
        } else {
            return week.concat(getWeekSet(getNextWeek(date), ++weekNum));
        }
    }(startDate, 1);

}