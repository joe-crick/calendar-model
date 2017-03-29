import test from 'tape';
import {getNextWeekDay, getPrevWeekDay, weekDayNameFinder, getWeekNumber} from '../../src/date-utils/week_utils';

const TEST_DATE = '03.01.2017';

test('Calendar Model: Navigate weeks', nest => {
  nest.test('Returns a date 7 days in the future', assert => {
    const dayNextWeek = getNextWeekDay(TEST_DATE);
    assert.ok(dayNextWeek.dayOfMonth === 8, 'should be the 8th');
    assert.end();
  });
  nest.test('Returns the previous week', assert => {
    const dayLastWeek = getPrevWeekDay(new Date(TEST_DATE));
    assert.ok(dayLastWeek.dayOfMonth === 22, 'should be 9');
    assert.end();
  });
});

test('Calendar Model: getWeekDayName', nest => {
  nest.test('Returns a name for a day of the week, when given a valid number', assert => {
    const weekFinder = weekDayNameFinder();
    const dayName = weekFinder(0);
    assert.ok(dayName === 'Sunday', 'should be "Sunday"');
    assert.end();
  });
});

test('Calendar Model: getWeekNumber', nest => {
  nest.test('Returns a the number of week in the year for a given week', assert => {
    const weekNumber = getWeekNumber(new Date(TEST_DATE));
    assert.ok(weekNumber === 9, 'should be 9');
    assert.end();
  });
});