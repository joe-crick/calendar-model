const isDate = require('./is_date.js');

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const DEFAULT_ADDITIONAL_DIGITS = 2;

const parseTokenDateTimeDelimeter = /[T ]/;
const parseTokenPlainTime = /:/;

// year tokens
const parseTokenYY = /^(\d{2})$/;
const parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
];

const parseTokenYYYY = /^(\d{4})/;
const parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
];

// date tokens
const parseTokenMM = /^-(\d{2})$/;
const parseTokenDDD = /^-?(\d{3})$/;
const parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
const parseTokenWww = /^-?W(\d{2})$/;
const parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

// time tokens
const parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
const parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
const parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;

// timezone tokens
const parseTokenTimezone = /([Z+-].*)$/;
const parseTokenTimezoneZ = /^(Z)$/;
const parseTokenTimezoneHH = /^([+-])(\d{2})$/;
const parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;

/**
 * @desc Creates a day when given a timestamp
 * @private
 * @param date
 * @param dateStrings
 * @return {Date}
 */
function createDayFromTimestamp(date, dateStrings) {
  const timestamp = date.getTime();
  let time = 0;
  let offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
  } else {
    // get offset accurate to hour in timezones that change offset
    offset = new Date(timestamp + time).getTimezoneOffset();
    offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
  }

  return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE);
}

/**
 * @desc Creates a day from parsing a date string
 * @private
 * @param dirtyOptions
 * @param potentialDate
 * @return {Date}
 */
function parsedDate(dirtyOptions, potentialDate) {
  const options = dirtyOptions || {};
  let additionalDigits = options.additionalDigits;

  additionalDigits = additionalDigits == null
    ? DEFAULT_ADDITIONAL_DIGITS
    : Number(additionalDigits);

  const dateStrings = splitDateString(potentialDate);
  const parseYearResult = parseYear(dateStrings.date, additionalDigits);
  const year = parseYearResult.year;
  const restDateString = parseYearResult.restDateString;

  const date = parseDate(restDateString, year);

  return date
    ? createDayFromTimestamp(date, dateStrings)
    : new Date(potentialDate);
}
/**
 * @private
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Day.
 *
 * @description
 * Convert the given argument to an instance of Day.
 *
 * If the argument is an instance of Day, the function returns the instance.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor, inside of a Day constructor.
 *
 * @param {Day|Date|String|Number} argument - the value to convert
 * @param dirtyOptions
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * const result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
export default function parse(argument, dirtyOptions) {
  const potentialDate = argument;
  let date;

  if (isDate(potentialDate)) {
    // Prevent the date from losing its milliseconds when passed to new Date() in IE10
    date = new Date(potentialDate.getTime());
  }
  else if (typeof potentialDate !== 'string') {
    date = new Date(potentialDate);
  }
  else {
    date = parsedDate(dirtyOptions, potentialDate);
  }

  return date;

}

function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(parseTokenDateTimeDelimeter);
  let timeString;

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    const token = parseTokenTimezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  const parseTokenYYY = parseTokensYYY[additionalDigits];
  const parseTokenYYYYY = parseTokensYYYYY[additionalDigits];

  let token;

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
  if (token) {
    const yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
  if (token) {
    const centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  }

  // Invalid ISO-formatted year
  return {
    year: null
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null;
  }

  let token;
  let date;
  let month;
  let week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date;
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString);
  if (token) {
    date = new Date(0);
    const dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    const day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date;
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week);
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    const dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek);
  }

  // Invalid ISO-formatted date
  return null;
}

function parseTime(timeString) {
  let token;
  let hours;
  let minutes;

  // hh
  token = parseTokenHH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR;
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE;
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    const seconds = parseFloat(token[3].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000;
  }

  // Invalid ISO-formatted time
  return null;
}

function parseTimezone(timezoneString) {
  let token;
  let absoluteOffset;

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString);
  if (token) {
    return 0;
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset;
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset;
  }

  return 0;
}

function dayOfISOYear(isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  const date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}