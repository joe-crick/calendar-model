'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.








getDate = getDate;var _parse = require('./date-utils/parse');var _parse2 = _interopRequireDefault(_parse);var _is_date = require('./date-utils/is_date');var _is_date2 = _interopRequireDefault(_is_date);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                                                                                         * @description Given a valid date string, or Date object, returns a Date object.
                                                                                                                                                                                                                                                                                                         * 
                                                                                                                                                                                                                                                                                                         * @param {any} date 
                                                                                                                                                                                                                                                                                                         * @returns {Date}
                                                                                                                                                                                                                                                                                                         */function getDate(date) {return (0, _is_date2.default)(date) ? date : (0, _parse2.default)(date);}