import test from 'tape';
import {getDay} from './src/day';

test('Calendar Model', nest => {
    nest.test('Returns a Day Object when Asked for a Day Provided a String Date', assert => {
        const day = getDay('28.12.2017');
        assert.ok(day, 'should not be empty');
        assert.end();
    });
});
