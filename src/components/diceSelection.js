import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMyDice } from "./actions";

const DiceSelection = () => {
  const allMyDice = useSelector((state) => state.selectDice.allDice);
  const currentSelection = useSelector((state) => state.selectDice.diceSelected);
  const dispatch = useDispatch();

  const diceClassName = [];

  allMyDice.forEach((diceItem, i) => {
    if (allMyDice[i].number === currentSelection) {
      diceClassName.push("bet-panel__dice-item--active");
    } else if (currentSelection > 0) {
      diceClassName.push("bet-panel__dice-item--inactive");
    }
  });

  return (
    <div className="bet-panel__dice-selection">
      <span className="bet-panel__dice-instructions">Tap to change selection</span>
      <ul className="bet-panel__dice-alldice" id="js-alldice">
        {allMyDice.map((dice, i) => (
          <li
            key={i}
            onClick={() => dispatch(selectMyDice(allMyDice[i].number, i))}
            className={`bet-panel__dice-item ${diceClassName[i]}`}
          >
            {allMyDice[i].image}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiceSelection;
