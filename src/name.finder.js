
/**
 * @description Meta function for finding a name based on a number.
 * 
 * @export
 * @param {any} nameSet 
 * @returns 
 */
export default function numToNameFinder(nameSet) {
    return function getName(num) {
        return nameSet[num];
    };
}