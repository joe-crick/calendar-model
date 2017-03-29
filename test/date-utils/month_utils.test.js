import test from 'tape';
import {monthNameFinder, getNextMonth, getPrevMonth} from '../../src/date-utils/month_utils';

const TEST_DATE = '03.01.2017';

test('Calendar Model: getMonthName', nest => {
  nest.test('Returns a name for a month, when given a valid number', assert => {
    const monthFinder = monthNameFinder();
    const monthName = monthFinder(1);
    assert.ok(monthName === 'January', 'should be "January"');
    assert.end();
  });
});

test('Calendar Model: Navigate Months', nest => {
  nest.test('Returns the next month in a twelve-month calendar', assert => {
    const nextMonth = getNextMonth(TEST_DATE);
    assert.ok(nextMonth === 4, 'should be "April"');
    assert.end();
  });
  nest.test('Returns the next month in a twelve-month calendar', assert => {
    const prevMonth = getPrevMonth(TEST_DATE);
    assert.ok(prevMonth === 2, 'should be "February"');
    assert.end();
  });
});