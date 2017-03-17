/**
 * @description CONSTRUCTOR: Returns a day object, which is a JS Date, a formatted string version of the date, and some convenience
 * methods that provide ISO Date, and Week Day Number. Also contains a set of Events for that day.
 * 
 * @export
 * @param {any} date A JS Date object, or valid Date string.
 * @param {any} getEvents A function that returns a set of events when given a date object.
 * @param {any} formatDate A function that returns a valid formatted date.
 * @returns {Day} A Day object.
 */
export default function getDay({date, getEvents, formatDate, toISOString=Date.prototype.toISOString}) {
    const _date = (typeof date === 'string') ? new Date(date) : date;
    return {
        date: _date,
        formattedDate: formatDate(_date),
        isoDate: toISOString.call(_date, _date),
        weekDayNumber: _date.getDay(),
        events: getEvents(_date)
    };
}