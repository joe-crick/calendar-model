import test from 'tape';
import * as time from '../../src/date-utils/time_utils';

test('Calendar Model: Time', nest => {
  nest.test('Should return the correct value for a twelve hour clock', assert => {
    assert.ok(time.getTwelveHourTime(14) === 2, 'should be 2');
    assert.end();
  });
  nest.test('Should return the correct time period for a twelve hour clock', assert => {
    assert.ok(time.getTimePeriod(2), 'should be AM');
    assert.ok(time.getTimePeriod(12), 'should be PM');
    assert.end();
  });
  nest.test('Should return the correct 12 hour time', assert => {
    const twelveHourTime = time.twentyFourToTwelveHourTime('18:00');
    assert.ok(twelveHourTime === '06:00 PM', 'should be 06:00 PM');
    assert.end();
  });
});