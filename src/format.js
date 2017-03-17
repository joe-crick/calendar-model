import format from 'date-fns/format';


/**
 * @description Formats a date, by default in International format
 * 
 * @export
 * @param {any} date 
 * @param {string} [formatMask='MM/DD/YYYY'] 
 * @returns {string} A formatted date
 */
export default function formatDate(date, formatMask='DD/MM/YYYY') {
    return format(date, formatMask);
}