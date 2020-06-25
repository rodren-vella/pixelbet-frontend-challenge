import React from "react";
import { ReactComponent as Minus } from "../assets/minus.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";

import { useSelector, useDispatch } from "react-redux";
import { decreaceMyBet, increaceMyBet } from "./actions";

const BetAmountPanel = () => {
  const myBetAmount = useSelector((state) => state.betAmount.betAmount);
  const myBalanceAmount = useSelector((state) => state.requestUserData.user.balance);
  const dispatch = useDispatch();

  return (
    <div className="bet-panel__bet-amount">
      {/* <Minus width="44" onClick={decreaceBet} /> */}
      <Minus width="44" onClick={() => dispatch(decreaceMyBet())} className="bet-panel__bet-control" />
      <span className="bet-panel__bet-value">{myBetAmount}</span>
      {/* <Plus width="44" onClick={increaceBet} /> */}
      <Plus width="44" onClick={() => dispatch(increaceMyBet(myBalanceAmount))} className="bet-panel__bet-control" />
    </div>
  );
};

export default BetAmountPanel;
