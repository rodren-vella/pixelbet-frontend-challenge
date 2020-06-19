import React from 'react'
import { ReactComponent as Minus } from '../assets/minus.svg'
import { ReactComponent as Plus } from '../assets/plus.svg'

const betAmountPanel = ({ betAmount, decreaceBet, increaceBet }) => {
  return (
    <div className="bet-panel__bet-amount">
      <Minus
        width="44"
        onClick={decreaceBet}
        className="bet-panel__bet-control--less"
      />
      <span className="bet-panel__bet-value">{betAmount}</span>
      <Plus
        width="44"
        onClick={increaceBet}
        className="bet-panel__bet-control--more"
      />
    </div>
  )
}

export default betAmountPanel
