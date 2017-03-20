/**
 * @desc Formats a number with a leading zero, if it is below 10
 * @param slot
 * @returns {string}
 */
export function formatTimeSlot(slot) {
  return slot < 10 ? `0${slot}` : slot;
}

/**
 * @desc Given a value from 0 - n, returns the correct Twelve-hour time number
 * @param slot
 * @returns {number}
 */
export function getTwelveHourTime(slot) {
  return slot < 12 ? slot : slot - 12;
}

/**
 * @desc Given a value from 0 - n, returns the associated time period
 * @param slot
 * @returns {string}
 */
export function getTimePeriod(slot) {
  return slot < 12 ? 'AM' : 'PM';
}

/**
 * @desc Returns 24 time slots, from 12:00 AM - 12:00 PM
 * @returns {[string]}
 */
export function getTwelveHourTimeSlots() {
  const timeSlots = ['12:00 AM'];
  for(let slot = 1; slot < 24; slot++) {
    timeSlots.push(`${formatTimeSlot(getTwelveHourTime(slot))}:00 ${getTimePeriod(slot)}`);
  }
  return timeSlots;
}

/**
 * @desc Returns 24 time slots, from 00:00 - 24:00
 * @returns {Array}
 */
export function getTwentyFourHourTimeSlots() {
  const timeSlots = [];
  for(let slot=0; slot < 24; slot++) {
    timeSlots.push(`${formatTimeSlot(slot)}:00`);
  }
  return timeSlots;
}