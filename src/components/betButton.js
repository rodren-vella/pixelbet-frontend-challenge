import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { placeBet, lastDiceSelected } from "./actions";

const Betbutton = () => {
  const myUsername = useSelector((state) => state.requestUserData.user.username);
  const myBalance = useSelector((state) => state.requestUserData.user.balance);
  const myBetAmount = useSelector((state) => state.betAmount.betAmount);
  const diceSelected = useSelector((state) => state.selectDice.diceSelected);
  const dispatch = useDispatch();

  //CHECK FOR DICE SELECTION AND BET AMOUNT BEFORE WE CAN PLAY
  const checkIfWeCanPlay = () => {
    const checkIfWeCanPlay = myBetAmount > 0 && diceSelected > 0 && (myBalance >= myBetAmount) ? false : true;
    return checkIfWeCanPlay;
  };

  const betPlacement = () => {
    dispatch(placeBet(myUsername, myBetAmount, diceSelected))
    dispatch(lastDiceSelected(diceSelected))
  };

  return (
    <div className={`bet-panel__button 
      ${checkIfWeCanPlay() ? "bet-panel__button--inactive" : "bet-panel__button--active"}
      `} >
      <button disabled={checkIfWeCanPlay()}
        onClick={betPlacement}
        className="bet-panel__button-item"
      >
        ROLL THE DICE MAN
      </button>
    </div>
  );
};

export default Betbutton;
