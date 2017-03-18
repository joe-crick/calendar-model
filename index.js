import getDay from './src/day';
import {getNWeeks, weekDayNameFinder} from './src/week';
import {getCalendarMonth, getNestedCalendarMonth, monthNameFinder} from './src/month';
import makeEventFinder from './src/event';

export default {
    day: {
        getDay
    },
    week: {
        getNWeeks,
        weekDayNameFinder
    },
    month: {
        getCalendarMonth,
        getNestedCalendarMonth,
        monthNameFinder
    },
    event: {
        makeEventFinder
    }
};