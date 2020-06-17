import React from "react";
import { ReactComponent as Minus } from "../assets/minus.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";

const betAmountPanel = ({ betAmount, decreaceBet, increaceBet }) => {
  return (
    <div className="betPanel__amountPanel">
      <Minus width="44" onClick={decreaceBet} />
      <span>{betAmount}</span>
      <Plus width="44" onClick={increaceBet} />
    </div>
  );
};

export default betAmountPanel;
