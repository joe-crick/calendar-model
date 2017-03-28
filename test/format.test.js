import test from 'tape';
import {addLeadingZeroIfLessThanTen} from '../src/date-utils/format';

test('Calendar Model: Format', nest => {
  nest.test('Should format a time value under 10 with a leading zero', assert => {
    assert.ok(addLeadingZeroIfLessThanTen(9) === '09', 'should have a leading zero');
    assert.end();
  });
});