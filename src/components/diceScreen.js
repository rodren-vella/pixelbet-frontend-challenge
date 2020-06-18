import React from "react";
import logo from "../assets/dice-logo.svg";

const getDiceImage = (allDice, searchDiceNumber) => {
  return allDice.find(({ diceNumber }) => diceNumber === searchDiceNumber)
    .diceImage;
};

const DiceScreen = ({
  allDice,
  sideGenerated,
  lastDiceSelected,
  gameStatus,
  betAmount,
}) => {
  return (
    <div className="diceScreen">
      {gameStatus === "HOME" ? (
        <img src={logo} alt="DICE TOSS" width="124" />
      ) : (
        <div className={`diceScreen__result diceScreen__result--${gameStatus}`}>
          {gameStatus === "WON" && getDiceImage(allDice, lastDiceSelected)}
          {gameStatus === "LOST" && getDiceImage(allDice, sideGenerated)}
          <span className="result__amount">{betAmount}</span>
          <span className="result__outcome">{gameStatus}</span>
        </div>
      )}
    </div>
  );
};

export default DiceScreen;
