"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =







numToNameFinder; /**
                  * @description Meta function for finding a name based on a number.
                  * 
                  * @export
                  * @param {any} nameSet 
                  * @returns 
                  */function numToNameFinder(nameSet) {return function getName(num) {return nameSet[num];};}module.exports = exports["default"];