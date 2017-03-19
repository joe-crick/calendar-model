import format from './format';
import {getDate} from './date';
import noOp from './no-op';
import getRangeOfDates from './date-utils/get_range_of_dates';
import addDays from './date-utils/add_days';

/**
 * @description CONSTRUCTOR: Returns a day object, which is a JS Date, a formatted string version of the date, and some convenience
 * methods that provide ISO Date, and Week Day Number. Also contains a set of Events for that day.
 * _getEvents-: A function that returns a set of events when given a date object.
 * _formatDate_: A function that returns a valid formatted date. Defaults to date-fns format function, International date format.
 * 
 * @export
 * @param {Object} {date, getEvents=noOp, formatDate=format, toISOString=Date.prototype.toISOString} 
 * @returns {Day} A Day object.
 */
export default function getDay({date, getEvents=noOp, formatDate=format, toISOString=Date.prototype.toISOString}) {
    const _date = getDate(date);
    return {
        date: _date,
        formattedDate: formatDate(_date),
        isoDate: toISOString.call(_date, _date),
        weekDayNumber: _date.getDay(),
        dayOfMonth: _date.getDate(),
        events: getEvents(_date)
    };
}

/**
 * @desc Creates an array of dates that corresponds to a range
 * @param {any} date 
 * @returns {Array<Day>} Dates
 */
export function getNDays({startDate, numOfDays, getEvents, formatDate}) {
    const endDate = addDays(startDate, numOfDays);
    return getRangeOfDates(startDate, endDate).map(date => getDay({date, getEvents, formatDate}));
}