import React, { Component } from "react";
import logo from "../assets/dice-logo.svg";

class DiceScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedDice: "",
    };
  }

  render() {
    const {
      gameInPlay,
      lastDiceSelectedImage,
      diceSelectedImage,
      gameStatus,
      betAmount,
    } = this.props;
    return (
      <div className="diceScreen">
        {gameStatus === "home" && (
          <img src={logo} alt="DICE TOSS" width="124" />
        )}

        {gameStatus !== "home" && gameInPlay === false && (
          <img
            src={diceSelectedImage}
            width="144"
            alt=""
            className={gameStatus === "WON" ? "won" : "loss"}
          />
        )}
        {gameStatus !== "home" && gameInPlay === true && (
          <img
            src={lastDiceSelectedImage}
            width="144"
            alt=""
            className={gameStatus === "WON" ? "won" : "loss"}
          />
        )}

        {gameStatus === "WON" && (
          <span className="diceScreen__amount">{betAmount}</span>
        )}
        {gameStatus !== "home" && (
          <span className="diceScreen__outcome">{gameStatus}</span>
        )}
      </div>
    );
  }
}

export default DiceScreen;
