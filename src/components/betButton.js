import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { placeBet, lastDiceSelected, requestUserData } from "./actions";

const Betbutton = ({ /*diceSelected, betAmount, submitBet*/ }) => {
  const myUsername = useSelector((state) => state.requestUserData.user.username);
  const myBetAmount = useSelector((state) => state.betAmount.betAmount);
  const diceSelected = useSelector((state) => state.selectDice.diceSelected);
  const dispatch = useDispatch();

  //CHECK FOR DICE SELECTION AND BET AMOUNT BEFORE WE CAN PLAY
  const checkIfWeCanPlay = () => {
    const checkIfWeCanPlay = myBetAmount > 0 && diceSelected > 0 ? false : true;
    return checkIfWeCanPlay;
  };

  const betPlacement = () => {
    dispatch(placeBet(myUsername, myBetAmount, diceSelected))
    dispatch(lastDiceSelected(diceSelected))
  };

  return (
    <div
      className={`betPanel__button ${
        checkIfWeCanPlay() && "betPanel__button--disable"
        }`}
    >
      <button disabled={checkIfWeCanPlay()}
        onClick={betPlacement}
      >
        ROLL THE DICE MAN
      </button>
    </div>
  );
};

export default Betbutton;
