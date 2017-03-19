import startOfWeek from './date-utils/start_of_week';
import {getNDays} from './day';
import addDays from './date-utils/add_days';
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
 * @param startDate
 * @param getEvents
 * @param formatDate
 * @param numOfDays
 * @returns {Array.<Day>}
 */
export function getWeekForDate({startDate, getEvents, formatDate, numOfDays=6}) {
    return getNDays({startDate: startOfWeek(startDate), numOfDays, getEvents, formatDate});
}

/**
 * @desc Returns the date one week later when given a date
 * @param date
 * @param daysInWeek
 * @returns {Date}
 */
export function getDateInFollowingWeek(date, daysInWeek=7) {
    return addDays(date, daysInWeek);
}

/**
 * @desc Returns a set of _n_ weeks, when given a start seed.
 * @param startDate
 * @param getEvents
 * @param formatDate
 * @param numOfWeeks
 * @returns {*}
 */
export function getNWeeks({startDate, getEvents, formatDate, numOfWeeks}) {
    if (!startDate) { return []; }

    const week = getWeekForDate({startDate, getEvents, formatDate});

    return !numOfWeeks 
        ? week 
        : week.concat(getNWeeks({startDate: getDateInFollowingWeek(startDate), getEvents, formatDate, numOfWeeks: --numOfWeeks}));
}

/**
 * @desc Returns a nested array of Days. Each set of days is grouped in a week-long array.
 * @param startDate
 * @param getEvents
 * @param formatDate
 * @param numOfWeeks
 * @returns {Array}
 */
export function getNWeeksNested({startDate, getEvents, formatDate, numOfWeeks}) {
    const weeks = [];
    let _date = startDate;

    for(let week = 0; week < numOfWeeks; week++) {
        weeks.push(getNWeeks({startDate: _date, getEvents, formatDate, numOfWeeks: 0}));
        _date = getDateInFollowingWeek(_date);
    }
 
    return weeks;
}

/**
 * @desc CONSTRUCTOR: Creates a function that returns Week DAy names.
 * @param {any} weekDayNames
 */
export function weekDayNameFinder(weekDayNames=WEEK_DAY_NAMES) {
    return numberToNameFinder(weekDayNames);
}