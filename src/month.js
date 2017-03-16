import getMonth from 'date-fns/get_month';

function getMonthRange(month, year) {
    // Get the starting week, and grab weeks until we reach the end week
    const monthRange = [];
    return + function getWeeksUntilSentinel(month, weekNum, sentinel) {
        const week = getWeek(month, weekNum);
        if (weekNum === sentinel) {
            return [week];
        } else {
            return monthRange.concat(getWeeksUntilSentinel());
        }
    }();
}