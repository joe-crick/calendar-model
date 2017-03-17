// Code to debug
import {getNWeeks} from '../src/week';
import makeEventFinder from '../src/event';

const TEST_DATE = '03.01.2017';

const getEvents = makeEventFinder({
    '01/03/2017': ['one', 'two', 'three']
});
const week = getNWeeks({
    date: TEST_DATE,
    getEvents,
    numOfWeeks: 0
});
console.log(week);
