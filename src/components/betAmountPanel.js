import React from "react";
import { ReactComponent as Minus } from "../assets/minus.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";

import { useSelector, useDispatch } from "react-redux";
import { decreaceMyBet, increaceMyBet } from "./actions";

const BetAmountPanel = () => {
  const myBetAmount = useSelector((state) => state.betAmount.betAmount);
  const dispatch = useDispatch();

  return (
    <div className="betPanel__amountPanel">
      {/* <Minus width="44" onClick={decreaceBet} /> */}
      <Minus width="44" onClick={() => dispatch(decreaceMyBet())} />
      <span>{myBetAmount}</span>
      {/* <Plus width="44" onClick={increaceBet} /> */}
      <Plus width="44" onClick={() => dispatch(increaceMyBet())} />
    </div>
  );
};

export default BetAmountPanel;
