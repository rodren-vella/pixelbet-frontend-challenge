import React from "react";
import logo from "../assets/dice-logo.svg";

const DiceScreen = ({
  lastDiceSelectedImage,
  sideGeneratedImage,
  gameStatus,
  betAmount,
}) => {
  return (
    <div className="diceScreen">
      {gameStatus === "HOME" ? (
        <img src={logo} alt="DICE TOSS" width="124" />
      ) : (
        <div className={`diceScreen__result diceScreen__result--${gameStatus}`}>
          {gameStatus === "WON" && lastDiceSelectedImage}
          {gameStatus === "LOST" && sideGeneratedImage}
          <span className="result__amount">{betAmount}</span>
          <span className="result__outcome">{gameStatus}</span>
        </div>
      )}
    </div>
  );
};

export default DiceScreen;
