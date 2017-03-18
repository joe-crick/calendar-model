/**
 * @description Formats a date in International format
 * 
 * @export
 * @param {any} date 
 * @returns {string} A formatted date
 */
export default function formatDate(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}