/**
 * GET Array Index of Dice passed in param
 *
 * @function getDiceIndex
 * @param {searchDiceNumber} number
 */
export const getDiceIndex = (searchDiceNumber, allDice) => {
  const isDice = (dice) => dice.diceNumber === searchDiceNumber;
  return allDice.findIndex(isDice);
};
