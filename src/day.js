import dayGet from 'date-fns/get_day';

export const getDay = function getDay(date) {
    return {
        number: dayGet(date)
    };
}