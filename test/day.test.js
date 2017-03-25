import test from 'tape';
import {getDay, getNDays} from '../src/day';

const TEST_DAY = '12.28.2016 14:24:05';

test('Calendar Model: Day', nest => {
  nest.test('Returns a Day Object when Asked for a Day Provided a String Date', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day, 'should not be empty');
    assert.end();
  });
  nest.test('The day object contains its week day number', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.dayOfWeek === 3, 'should be 3');
    assert.end();
  });
  nest.test('The day object contains its year', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.year === 2016, 'should be 2016');
    assert.end();
  });
  nest.test('Returns a week number', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.weekOfYear === 52, 'should be 52');
    assert.end();
  });
  nest.test('Returns a 24-hour time', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.twentyFourHourTime === '14:24:05', 'should be 14:24:05');
    assert.end();
  });
  nest.test('Returns a 12-hour time', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.twelveHourTime === '02:24:05', 'should be 02:24:05');
    assert.end();
  });
  nest.test('Returns a one-based month number', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.month === 12, 'should be 12');
    assert.end();
  });
  nest.test('Returns a formatted date', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.formattedDate === '28/12/2016', 'should be 28/12/2016');
    assert.end();
  });
  nest.test('Returns an ISO formatted date', assert => {
    const day = getDay({date: TEST_DAY});
    assert.ok(day.month === 12, 'should be 12');
    assert.end();
  });
  nest.test('Returns a set of days, given a start date and a count', assert => {
    const daySet = getNDays({startDate: TEST_DAY, numOfDays: 4});
    assert.ok(daySet.length === 5, 'should be 5 days');
    assert.end();
  });
});
