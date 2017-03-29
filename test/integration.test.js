import test from 'tape';
import {getNWeeks} from '../src/week';
import makeEventFinder from '../src/utils/event.finder';

const TEST_DATE = '03/01/2017';

test('Calendar Model: Events', nest => {
  nest.test('Returns a set of days with populated events', assert => {
    const getEvents = makeEventFinder({'01/03/2017': ['one', 'two', 'three']});
    const week = getNWeeks({startDate: TEST_DATE, getEvents, numOfWeeks: 0});
    assert.ok(week[3].events, 'should not be empty');
    assert.end();
  });
});