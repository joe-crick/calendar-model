'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =













getDay;var _format = require('./format');var _format2 = _interopRequireDefault(_format);var _date2 = require('./date');var _noOp = require('./no-op');var _noOp2 = _interopRequireDefault(_noOp);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                                                                                * @description CONSTRUCTOR: Returns a day object, which is a JS Date, a formatted string version of the date, and some convenience
                                                                                                                                                                                                                                                                                                * methods that provide ISO Date, and Week Day Number. Also contains a set of Events for that day.
                                                                                                                                                                                                                                                                                                * _getEvents-: A function that returns a set of events when given a date object.
                                                                                                                                                                                                                                                                                                * _formatDate_: A function that returns a valid formatted date. Defaults to date-fns format function, International date format.
                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                * @export
                                                                                                                                                                                                                                                                                                * @param {Object} {date, getEvents=noOp, formatDate=format, toISOString=Date.prototype.toISOString} 
                                                                                                                                                                                                                                                                                                * @returns {Day} A Day object.
                                                                                                                                                                                                                                                                                                */function getDay(_ref) {var date = _ref.date,_ref$getEvents = _ref.getEvents,getEvents = _ref$getEvents === undefined ? _noOp2.default : _ref$getEvents,_ref$formatDate = _ref.formatDate,formatDate = _ref$formatDate === undefined ? _format2.default : _ref$formatDate,_ref$toISOString = _ref.toISOString,toISOString = _ref$toISOString === undefined ? Date.prototype.toISOString : _ref$toISOString;var _date = (0, _date2.getDate)(date);return { date: _date, formattedDate: formatDate(_date), isoDate: toISOString.call(_date, _date), weekDayNumber: _date.getDay(), dayOfMonth: _date.getDate(), events: getEvents(_date) };
}module.exports = exports['default'];