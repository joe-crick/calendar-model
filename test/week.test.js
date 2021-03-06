import test from 'tape';
import {getNWeeks, getNWeeksNested, getWeek} from '../src/week';

const TEST_DATE = '03.01.2017';

test('Calendar Model: getWeek', nest => {
  nest.test('Given a specific date, returns an array of the days for that week: Sun - Sat', assert => {
    const week = getWeek({startDate: TEST_DATE});
    assert.ok(week.length === 7, 'should be 7 days');
    assert.end();
  });
  nest.test('First day of week: Returns the correct day of the week', assert => {
    const week = getWeek({startDate: TEST_DATE});
    assert.ok(week[0].dayOfWeek === 0, 'First day of the week, should be Sunday');
    assert.end();
  });
  nest.test('First day of week: Returns the correct calendar day of the month', assert => {
    const week = getWeek({startDate: TEST_DATE});
    assert.ok(week[0].dayOfMonth === 26, 'First day of the week, should be 26');
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
