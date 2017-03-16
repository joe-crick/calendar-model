import test from 'tape';
import {getDay} from '../src/day';

test('Calendar Model: Day', nest => {
    nest.test('Returns a Day Object when Asked for a Day Provided a String Date', assert => {
        const day = getDay('28.12.2017');
        assert.ok(day, 'should not be empty');
        assert.end();
    });
    nest.test('The day object contains the number of day in the week', assert => {
        const day = getDay('12.28.2016');
        assert.comment(day.number);
        assert.ok(day.number === 3, 'should be 3');
        assert.end();
    });
});
