/**
 * @desc Given a function that returns a weekday name corresponding to a day number, return a set of weekday names
 * @param getWeekDayName A function that returns a weekday name when given a day number
 * @param daysInWeek [daysInWeek=7] The number of days in the week
 * @return {Array<string>} An array of weekday names
 */
export default function getWeekDayNames(getWeekDayName, daysInWeek = 7) {
  const names = [];
  for (let x = 0; x < daysInWeek; x++) {
    names.push(getWeekDayName(x))
  }
  return names;
}