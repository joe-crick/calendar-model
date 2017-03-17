import test from 'tape';
import getDay from '../src/day';

const TEST_DAY = '12.28.2016';

test('Calendar Model: Day', nest => {
    nest.test('Returns a Day Object when Asked for a Day Provided a String Date', assert => {
        const day = getDay({date: TEST_DAY});
        assert.ok(day, 'should not be empty');
        assert.end();
    });
    nest.test('The day object contains its week day number', assert => {
        const day = getDay({date: TEST_DAY});
        assert.ok(day.weekDayNumber === 3, 'should be 3');
        assert.end();
    });
});
