import test from 'tape';
import { getJsDate } from '../../src/date-utils/get_date';
import isDate from 'date-fns/is_date';

const TEST_DATE = '03.01.2017';

test('Calendar Model: Date', nest => {
    nest.test('Given a valid date, returns a date object', assert => {
        const date = getJsDate(TEST_DATE);
        assert.ok(isDate(date), 'should be a valid date object');
        assert.end();
    });
});