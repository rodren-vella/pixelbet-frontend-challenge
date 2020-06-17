import React from "react";

const diceSelection = ({ allDice, selectDice }) => {
  return (
    <div className="betPanel__diceSlection">
      <span className="betPanel__instructions">Tap to change selection</span>
      <ul className="betPanel__alldice" id="js-alldice">
        {allDice.map((dice, i) => (
          <li key={i} onClick={() => selectDice(dice.diceNumber, i)}>
            {dice.diceImage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default diceSelection;
