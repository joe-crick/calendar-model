import getDay from './src/day';
import {getNWeeks} from './src/week';
import {getCalendarMonth} from './src/month';
import makeEventFinder from './src/event';

export default {
    day: {
        getDay
    },
    week: {
        getNWeeks
    },
    month: {
        getCalendarMonth
    },
    event: {
        makeEventFinder
    }
};