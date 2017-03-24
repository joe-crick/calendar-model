import isDay from './is_day.js';
import getDay from '../day.js';
import parse from './parse.js';

/**
 * @desc Returns a day when given a dirty date
 * @param argument
 * @param dirtyOptions
 * @return {Day} A day
 */
export default function parseDay(argument, dirtyOptions) {
  return isDay(argument)
    ? getDay({date: argument.date})
    : getDay({date: parse(argument, dirtyOptions)});
}