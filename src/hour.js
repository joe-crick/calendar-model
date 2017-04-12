import {addLeadingZeroIfLessThanTen} from './date-utils/format';
import * as time from './date-utils/time_utils';

// TODO: Make a comprehensive build, inclusive of all functions

/**
 * @desc Returns 24 time slots, from 12:00 AM - 12:00 PM
 * @returns {[string]} An array of time slots corresponding to 12-hour time.
 */
export function getTwelveHourTimeSlots() {
  const timeSlots = ['12:00 AM'];
  for(let slot = 1; slot < 24; slot++) {
    timeSlots.push(`${addLeadingZeroIfLessThanTen(time.getTwelveHourTime(slot))}:00 ${time.getTimePeriod(slot)}`);
  }
  return timeSlots;
}

/**
 * @desc Returns 24 time slots, from 00:00 - 24:00
 * @returns {[string]} An array of time slot corresponding to 24-hour time.
 */
export function getTwentyFourHourTimeSlots() {
  const timeSlots = [];
  for(let slot=0; slot < 24; slot++) {
    timeSlots.push(`${addLeadingZeroIfLessThanTen(slot)}:00`);
  }
  return timeSlots;
}


