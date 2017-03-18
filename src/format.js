/**
 * @description Formats a date in International format
 * 
 * @export
 * @param {any} date 
 * @returns {string} A formatted date
 */
export default function formatDate(date) {
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1;
    month = month <= 9 ? `0${month}` : month;
    return `${day}/${month}/${date.getFullYear()}`;
}