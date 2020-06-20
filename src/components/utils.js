export const getDiceImage = (allDice, searchDiceNumber) => {
  return allDice.find(({ number }) => number === searchDiceNumber).image;
};

export const capitalizeText = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
