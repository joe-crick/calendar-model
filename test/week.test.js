import test from 'tape';
import {
  getNWeeks,
  getNWeeksNested,
  getWeekForDate,
  getDateInFollowingWeek,
  weekDayNameFinder,
  getWeekNumber
} from '../src/week';

const TEST_DATE = '03.01.2017';

test('Calendar Model: getWeek', nest => {
  nest.test('Given a specific date, returns an array of the days for that week: Sun - Sat', assert => {
    const week = getWeekForDate({startDate: TEST_DATE});
    assert.ok(week.length === 7, 'should be 7 days');
    assert.end();
  });
  nest.test('First day of week: Returns the correct day of the week', assert => {
    const week = getWeekForDate({startDate: TEST_DATE});
    assert.ok(week[0].weekDayNumber === 0, 'First day of the week, should be Sunday');
    assert.end();
  });
  nest.test('First day of week: Returns the correct calendar day of the month', assert => {
    const week = getWeekForDate({startDate: TEST_DATE});
    assert.ok(week[0].dayOfMonth === 26, 'First day of the week, should be 26');
    assert.end();
  });
});

test('Calendar Model: getNextWeek', nest => {
  nest.test('Returns a date 7 days in the future', assert => {
    const dayNextWeek = getDateInFollowingWeek(TEST_DATE);
    assert.ok(dayNextWeek.getDate() === 8, 'should be the 8th');
    assert.end();
  });
});

test('Calendar Model: getNWeeks', nest => {
  const MONTH = 4;

  nest.test('Returns a range of Weeks', assert => {
    const weeks = getNWeeks({startDate: TEST_DATE, numOfWeeks: MONTH});
    assert.ok(weeks.length === 35, 'should be 35 days');
    assert.end();
  });
  nest.test('Start of range should be first day of first week', assert => {
    const weeks = getNWeeks({startDate: TEST_DATE, numOfWeeks: MONTH});
    assert.ok(weeks[0].dayOfMonth === 26, 'should be 26.02.2017');
    assert.end();
  });
  nest.test('End of range should be last day of last week', assert => {
    const weeks = getNWeeks({startDate: TEST_DATE, numOfWeeks: MONTH});
    assert.ok(weeks[34].dayOfMonth === 1, 'should be 01.04.2017');
    assert.end();
  });
  nest.test('Given a week, returns a nested set of days each set corresponding to a week', assert => {
    const weeks = getNWeeksNested({startDate: TEST_DATE, numOfWeeks: MONTH});
    assert.ok(weeks.length === 4, 'should be 5 weeks');
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
    assert.comment(weekNumber);
    assert.ok(weekNumber === 9, 'should be 9');
    assert.end();
  });
});