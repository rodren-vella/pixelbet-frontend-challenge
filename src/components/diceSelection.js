import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMyDice } from "./actions";

const DiceSelection = () => {
  //const myBetAmount = useSelector((state) => state.betAmount.betAmount);
  const allMyDice = useSelector((state) => state.selectDice.allDice);
  const dispatch = useDispatch();
  return (
    <div className="betPanel__diceSlection">
      <span className="betPanel__instructions">Tap to change selection</span>
      <ul className="betPanel__alldice" id="js-alldice">
        {allMyDice.map((dice, i) => (
          <li
            key={i}
            onClick={() => dispatch(selectMyDice(allMyDice[i].diceNumber, i))}
          >
            {allMyDice[i].diceImage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiceSelection;
