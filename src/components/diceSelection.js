import React from "react";

const diceSelection = ({ dices, selectDice }) => {
  return (
    <div className="betPanel__diceSlection">
      <span className="betPanel__instructions">Tap to change selection</span>
      <ul className="betPanel__dices" id="js-dices">
        {dices.map((dice, i) => (
          <li key={i} onClick={() => selectDice(dice.diceNumber, i)}>
            {dice.diceImage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default diceSelection;
