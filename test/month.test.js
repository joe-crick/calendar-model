import test from 'tape';
import { getMonth } from '../src/month';

const TEST_DATE = '03.01.2017';

test('Calendar Model: getMonth', nest => {
    nest.test('Given a specific date, returns an array of the days for that week: Sun - Sat', assert => {
        const month = getMonth(TEST_DATE);
        assert.ok(month.length === 35, 'should be 35 days');
        assert.end();
    });
});