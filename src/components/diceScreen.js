import React from "react";
import logo from "../assets/dice-logo.svg";
import { useSelector, useDispatch } from "react-redux";

const getDiceImage = (allDice, searchDiceNumber) => {
  return allDice.find(({ diceNumber }) => diceNumber === searchDiceNumber)
    .diceImage;
};

const DiceScreen = (/*{
  allDice,
  sideGenerated,
  lastDiceSelected,
  gameStatus,
  betAmount,
}*/) => {
  const allDice = useSelector((state) => state.selectDice.allDice);
  const sideGenerated = useSelector((state) => state.requestUserData.sideGenerated);
  const lastDiceSelected = useSelector((state) => state.requestUserData.lastDiceSelected);
  const gameStatus = useSelector((state) => state.requestUserData.gameStatus);
  const userBalance = useSelector((state) => state.requestUserData.user.balance);

  return (
    <div className="diceScreen">
      {gameStatus === "HOME" ? (
        <img src={logo} alt="DICE TOSS" width="124" />
      ) : (
          <div className={`diceScreen__result diceScreen__result--${gameStatus}`}>
            {gameStatus === "WON" && getDiceImage(allDice, lastDiceSelected)}
            {gameStatus === "LOST" && getDiceImage(allDice, sideGenerated)}
            <span className="result__amount">{userBalance}</span>
            <span className="result__outcome">{gameStatus}</span>
          </div>
        )}
    </div>
  );
};

export default DiceScreen;
