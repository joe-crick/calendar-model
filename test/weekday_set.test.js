import test from 'tape';
import weekdaySet from '../src/date-utils/weeday_set';

test('Weekday Set', nest => {
  nest.test('Returns a set of days of the week', assert => {
    const daySet = weekdaySet(num => ({
      0: 'Monday',
      1: 'Tuesday'
    }[num]), 2);
    assert.ok(Array.isArray(daySet), 'should return an array');
    assert.end();
  });
});