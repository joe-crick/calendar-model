import test from 'tape';
import { getCalendarMonth, getNestedCalendarMonth } from '../src/month';

const TEST_DATE = '03.01.2017';

test('Calendar Model: Month', nest => {
    nest.test('Given a month, returns a set of days corresponding to that calendar month', assert => {
        const month = getCalendarMonth({date: TEST_DATE});
        assert.ok(month.length === 35, 'should be 35 days');
        assert.end();
    });
    nest.test('Given a month, returns a nested set of days corresponding to that calendar month', assert => {
        const month = getNestedCalendarMonth({date: TEST_DATE, isNested: true});
        assert.ok(month.length === 4, 'should be 35 days');
        assert.end();
    });
});