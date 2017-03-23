import test from 'tape';
import {getMonth, getNestedCalendarMonth, monthNameFinder, getNextMonth, getPrevMonth} from '../src/month';

const TEST_DATE = '03.01.2017';

test('Calendar Model: Month', nest => {
  nest.test('Given a month, returns a set of days corresponding to that calendar month', assert => {
    const month = getMonth({startDate: TEST_DATE});
    assert.ok(month.length === 42, 'should be 42 days');
    assert.end();
  });
  nest.test('Given a month, returns a nested set of days corresponding to that calendar month', assert => {
    const month = getNestedCalendarMonth({startDate: TEST_DATE});
    assert.ok(month.length === 5, 'should be 5 weeks');
    assert.end();
  });
});

test('Calendar Model: getMonthName', nest => {
  nest.test('Returns a name for a month, when given a valid number', assert => {
    const monthFinder = monthNameFinder();
    const monthName = monthFinder(0);
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