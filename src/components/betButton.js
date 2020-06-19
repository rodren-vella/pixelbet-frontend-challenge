import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { decreaceMyBet, increaceMyBet } from "./actions";

const Betbutton = ({ diceSelected, betAmount, submitBet }) => {
  const myBetAmount = useSelector((state) => state.betAmount.betAmount);

  //CHECK FOR DICE SELECTION AND BET AMOUNT BEFORE WE CAN PLAY
  const checkIfWeCanPlay = () => {
    const checkIfWeCanPlay = myBetAmount > 0 && diceSelected > 0 ? false : true;
    return checkIfWeCanPlay;
  };

  return (
    <div
      className={`betPanel__button ${
        checkIfWeCanPlay() && "betPanel__button--disable"
      }`}
    >
      <button disabled={checkIfWeCanPlay()} onClick={submitBet}>
        ROLL THE DICE MAN
      </button>
    </div>
  );
};

export default Betbutton;
