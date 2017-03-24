import test from 'tape';
import getDay from '../src/day';
import {getNDays} from '../src/day';

const TEST_DAY = '12.28.2016';

test('Calendar Model: Day', nest => {
  nest.test('Returns a Day Object when Asked for a Day Provided a String Date', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day, 'should not be empty');
    assert.end();
  });
  nest.test('The day object contains its week day number', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.weekDayNumber === 3, 'should be 3');
    assert.end();
  });
  nest.test('The day object contains its year', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.year === 2016, 'should be 2016');
    assert.end();
  });
  nest.test('Returns a one-based month number', assert => {
    const day = getDay({date: TEST_DAY});
    assert.comment('month: ' + day.month);
    assert.ok(day.month === 12, 'should be 12');
    assert.end();
  });
  nest.test('Returns a set of days, given a start date and a count', assert => {
    const daySet = getNDays({startDate: TEST_DAY, numOfDays: 4});
    assert.ok(daySet.length === 5, 'should be 5 days');
    assert.end();
  });
});
