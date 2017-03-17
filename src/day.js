import format from './format';
import {getDate} from './date';
import noOp from './no-op';

/**
 * 
 * 
 * @export
 * @param {any} date A JS Date object, or valid Date string.
 * @param {Function
 * @param {Function
 * 
 */


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