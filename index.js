import getDay from './src/day';
import {getNWeeks, weekDayNameFinder} from './src/week';
import {getCalendarMonth, getNestedCalendarMonth, monthNameFinder} from './src/month';
import makeEventFinder from './src/event';

//TODO: Create a lib that has importable bits, like Ramda

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