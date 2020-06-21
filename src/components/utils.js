/**
 * Gets the SVG React Component corresponding to the number provided from an array of dice objects.
 *
 * @param {[object]} allDice
 * @param {Number} searchDiceNumber
 */

export const getDiceImage = (allDice, searchDiceNumber) => {
    return allDice.find(({ number }) => number === searchDiceNumber).image;
};

/**
 * Takes the first letter of a provided string and capitalizes it, and makes the rest of the string
 * lowercase.
 *
 * @param {String} string
 */

export const capitalizeText = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
