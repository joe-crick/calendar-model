import test from 'tape';
import { getCalendarMonth, getNestedCalendarMonth, monthNameFinder } from '../src/month';

const TEST_DATE = '03.01.2017';

test('Calendar Model: Month', nest => {
    nest.test('Given a month, returns a set of days corresponding to that calendar month', assert => {
        const month = getCalendarMonth({startDate: TEST_DATE});
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