import {addLeadingZeroIfLessThanTen} from './format';

/**
 * @desc Given a value from 0 - n, returns the correct Twelve-hour time number
 * @param {number} slot A number between 0 and 23.
 * @returns {number} The corresponding numeric value for a 12-hour time.
 */
export function getTwelveHourTime(slot) {
  return slot < 12 ? slot : slot - 12;
}

/**
 * @desc Given a value from 0 - n, returns the associated time period
 * @param {number} slot A number.
 * @returns {string} If the number is below 12 (but greater than 0),
 * will return 'AM', otherwise returns 'PM'.
 */
export function getTimePeriod(slot) {
  return slot < 12 && slot > 0 ? 'AM' : 'PM';
}

/**
 * @desc Converts 24 hour time to 12 hour time.
 * @param {string} time A valid 24-hour time value 'hh:mm'.
 * @return {string} The corresponding value in 12-hour time, with the appropriate time
 * period (AM | PM).
 */
export function twentyFourToTwelveHourTime(time) {
  const slot = time.substring(0,2) >> 0;
  const timePeriod = getTimePeriod(slot);
  return `${addLeadingZeroIfLessThanTen(getTwelveHourTime(slot))}:00 ${timePeriod}`;
}