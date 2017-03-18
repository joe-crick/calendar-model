'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =







makeEventFinder;var _format = require('./format');var _format2 = _interopRequireDefault(_format);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                * @description Given a data set where events can be obtained as date properties off an object, return the set of events
                                                                                                                                                                                                * for a given date.
                                                                                                                                                                                                * 
                                                                                                                                                                                                * @param {any} data 
                                                                                                                                                                                                * @returns {Array<Event>} An Array of Events
                                                                                                                                                                                                */function makeEventFinder(data) {return function getEvents(date) {return data[(0, _format2.default)(date)] || [];};}module.exports = exports['default'];