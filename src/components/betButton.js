import React from "react";

const betbutton = ({ diceSelected, betAmount, submitBet }) => {
  //CHECK FOR DICE SELECTION AND BET AMOUNT BEFORE WE CAN PLAY
  const checkIfWeCanPlay = () => {
    const checkIfWeCanPlay = betAmount > 0 && diceSelected > 0 ? false : true;
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

export default betbutton;
