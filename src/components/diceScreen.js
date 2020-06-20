import React from 'react'
import logo from '../assets/dice-logo.svg'
import { getDiceImage } from './utils'

/**
 * Returns the SVG React Component of the dice number passed as a parameter.
 *
 * @param {Array} allDice - Array of dice numbers and their images.
 * @param {number} searchDiceNumber - Dice number we want the image for.
 * @returns {Component}
 */

const DiceScreen = ({
  allDice,
  sideGenerated,
  previousSelection,
  gameStatus,
  betAmount,
}) => {
  return (
    <div className="dice-screen">
      {gameStatus === 'HOME' ? (
        <img src={logo} alt="DICE TOSS" width="124" />
      ) : (
        <div
          className={`dice-screen__result dice-screen__result--${gameStatus}`}
        >
          {gameStatus === 'WON' && getDiceImage(allDice, previousSelection)}
          {gameStatus === 'LOST' && getDiceImage(allDice, sideGenerated)}
          <span
            className={`dice-screen__balance dice-screen__balance--${gameStatus}`}
          >
            {betAmount}
          </span>
          <span className="dice-screen__verdict">
            {gameStatus === 'WON' ? 'WIN' : 'Loss'}
          </span>
        </div>
      )}
    </div>
  )
}

export default DiceScreen
