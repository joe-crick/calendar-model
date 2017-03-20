import test from 'tape';
import * as hours from '../src/hours';

test('Calendar Model: Hours', nest => {
  nest.test('Should format a time value under 10 with a leading zero', assert => {
    assert.ok(hours.formatTimeSlot(9) === '09', 'should have a leading zero');
    assert.end();
  });
  nest.test('Should return the correct value for a twelve hour clock', assert => {
    assert.ok(hours.getTwelveHourTime(14) === 2, 'should be 2');
    assert.end();
  });
  nest.test('Should return the correct time period for a twelve hour clock', assert => {
    assert.ok(hours.getTimePeriod(2), 'should be AM');
    assert.ok(hours.getTimePeriod(12), 'should be PM');
    assert.end();
  });
  nest.test('Should return an Array of the correct hours for a twelve-hour clock', assert => {
    const twelveHours = hours.getTwelveHourTimeSlots();
    assert.ok(twelveHours.length === 24, 'should have twenty-four slots');
    assert.ok(twelveHours[0] === '12:00 AM', 'First hour should be 12:00 AM');
    const lastHour = twelveHours.pop();
    assert.ok(lastHour === '11:00 PM', 'Last hour should be 11:00 PM');
    assert.end();
  });
  nest.test('Should return an Array of the correct hours for a twenty-four hour clock', assert => {
    const twentyFourHours = hours.getTwentyFourHourTimeSlots();
    assert.ok(twentyFourHours.length === 24, 'should have twenty-four slots');
    assert.ok(twentyFourHours[0] === '00:00', 'First hour should be 00:00');
    const lastHour = twentyFourHours.pop();
    assert.ok(lastHour === '23:00', 'Last hour should be 23:00');
    assert.end();
  });
});