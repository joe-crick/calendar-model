import dateFormat from 'date-fns/format';

export function getDay(date, format) {
    const _date = (typeof date === 'string') ? new Date(date) : date;
    return {
        date: _date,
        textDate: dateFormat(_date, format || 'DD/MM/YYYY'),
        isoDate: _date.toISOString(),
        weekDayNumber: _date.getDay(),
        events: []
    };
}