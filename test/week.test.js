import test from 'tape';
import { getNWeeks, getWeekForDate, getDateInFollowingWeek } from '../src/week';

const TEST_DATE = '03.01.2017';

test('Calendar Model: getWeek', nest => {
    nest.test('Given a specific date, returns an array of the days for that week: Sun - Sat', assert => {
        const week = getWeekForDate({date: TEST_DATE});
        assert.ok(week.length === 7, 'should be 7 days');
        assert.end();
    });
    nest.test('First day of week: Returns the correct day of the week', assert => {
        const week = getWeekForDate({date: TEST_DATE});
        assert.ok(week[0].weekDayNumber === 0, 'First day of the week, should be Sunday');
        assert.end();
    });
    nest.test('First day of week: Returns the correct calendar day of the month', assert => {
        const week = getWeekForDate({date: TEST_DATE});
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
        const week = getNWeeks({date: TEST_DATE, numOfWeeks: MONTH});
        assert.ok(week.length === 35, 'should be 35 days');
        assert.end();
    });
    nest.test('Start of range should be first day of first week', assert => {
        const week = getNWeeks({date: TEST_DATE, numOfWeeks: MONTH});
        assert.ok(week[0].dayOfMonth === 26, 'should be 26.02.2017');
        assert.end();
    });
    nest.test('End of range should be last day of last week', assert => {
        const week = getNWeeks({date: TEST_DATE, numOfWeeks: MONTH});
        assert.ok(week[34].dayOfMonth === 1, 'should be 01.04.2017');
        assert.end();
    });
});