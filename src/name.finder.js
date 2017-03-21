/**
 * @description Meta function for finding a name based on a number.
 * @private
 * @param {Object} nameSet
 * @returns {getName}
 */
export default function numToNameFinder(nameSet) {
    return function getName(num) {
        return nameSet[num];
    };
}