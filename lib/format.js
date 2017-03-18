"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =






formatDate; /**
             * @description Formats a date in International format
             * 
             * @export
             * @param {any} date 
             * @returns {string} A formatted date
             */function formatDate(date) {return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();}module.exports = exports["default"];