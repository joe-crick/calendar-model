/**
 * @desc Formats a number with a leading zero if it is below 10
 * @param number
 * @return {string}
 */
export function addLeadingZeroIfLessThanTen (number) {
  return number < 10 ? `0${number}` : number;
}

/**
 * @description Formats a date in International format
 * @export
 * @param {Date} date A JS Date object.
 * @returns {string} A formatted date.
 */
export function formatDate(date) {
  const day = addLeadingZeroIfLessThanTen(date.getDate());
  const month = addLeadingZeroIfLessThanTen(date.getMonth() + 1);
  return `${day}/${month}/${date.getFullYear()}`;
}