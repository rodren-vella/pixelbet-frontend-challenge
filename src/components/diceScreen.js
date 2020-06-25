import React from "react";
import logo from "../assets/dice-logo.svg";
import { useSelector } from "react-redux";
import { GetDiceImage } from "./utils";

const DiceScreen = () => {
  const allDice = useSelector((state) => state.selectDice.allDice);
  const sideGenerated = useSelector((state) => state.requestUserData.sideGenerated);
  const lastDiceSelected = useSelector((state) => state.requestUserData.lastDiceSelected);
  const gameStatus = useSelector((state) => state.requestUserData.gameStatus);
  const userBalance = useSelector((state) => state.requestUserData.user.balance);

  return (
    <div className="dice-screen">
      {gameStatus === "HOME" ? (
        <img src={logo} alt="DICE TOSS" width="124" />
      ) : (
          <div className={`dice-screen__result dice-screen__result--${gameStatus}`}>
            {gameStatus === "WON" && GetDiceImage(allDice, lastDiceSelected)}
            {gameStatus === "LOST" && GetDiceImage(allDice, sideGenerated)}
            <span className={`dice-screen__balance dice-screen__balance--${gameStatus}`}>{userBalance}</span>
            <span className="dice-screen__verdict">{gameStatus}</span>
          </div>
        )
      }
    </div >
  );
};

export default DiceScreen;
