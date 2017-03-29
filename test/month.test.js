import test from 'tape';
import {getMonth, getNestedMonth} from '../src/month';

const TEST_DATE = '03.01.2017';

test('Calendar Model: Month', nest => {
  nest.test('Given a month, returns a set of days corresponding to that calendar month', assert => {
    const month = getMonth({startDate: TEST_DATE});
    assert.ok(month.length === 42, 'should be 42 days');
    assert.end();
  });
  nest.test('Given a month, returns a nested set of days corresponding to that calendar month', assert => {
    const month = getNestedMonth({startDate: TEST_DATE});
    assert.ok(month.length === 5, 'should be 5 weeks');
    assert.end();
  });
});