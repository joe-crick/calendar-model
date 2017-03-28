import {formatDate} from './utils/format';

/**
 * @description Given a data set where events can be obtained as date properties off an object, return the set of events
 * for a given date.
 * @param {Object} data An object that whose keys are string dates that map dates to sets of events.
 * For example:
 * {
 *    '02/12/2017': [{time: '09:00', event: 'Purchase a parrot'}],
 *    '09/21/2017': [{time: '18:00', event: 'Find a ferret'}]
 * }
 * @returns {Array<Event>} An Array of Events.
 */
export default function makeEventFinder(data) {
  return function getEvents(date) {
    return data[formatDate(date)] || [];
  };
}