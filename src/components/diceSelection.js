import React from 'react'

const diceSelection = ({ allDice, selectDice }) => {
  return (
    <div className="bet-panel__dice-selection">
      <span className="bet-panel__dice-instructions">
        Tap to change selection
      </span>
      <ul className="bet-panel__dice-alldice" id="js-alldice">
        {allDice.map((dice, i) => (
          <li
            key={i}
            onClick={() => selectDice(dice.number, i)}
            className="bet-panel__dice-item"
          >
            {dice.image}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default diceSelection
