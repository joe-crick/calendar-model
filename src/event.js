import format from './format';
/**
 * @description Given a data set where events can be obtained as date properties off an object, return the set of events
 * for a given date.
 * 
 * @param {any} data 
 * @returns {Array<Event>} An Array of Events
 */
export default function makeEventFinder(data){
    return function getEvents(date) {
        const formattedDate = format(date);
        return data[format(date)] || [];
    };
}