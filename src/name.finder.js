export default function numToNameFinder(nameSet) {
    return function getName(num) {
        return nameSet[num];
    };
}