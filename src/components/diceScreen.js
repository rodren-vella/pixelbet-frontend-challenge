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
      lastDiceSelectedImage,
      sideGeneratedImage,
      gameStatus,
      betAmount,
    } = this.props;
    return (
      <div className="diceScreen">
        {gameStatus === "home" && (
          <img src={logo} alt="DICE TOSS" width="124" />
        )}

        {gameStatus === "WON" && (
          <img src={lastDiceSelectedImage} width="144" alt="" className="won" />
        )}
        {gameStatus === "LOST" && (
          <img src={sideGeneratedImage} width="144" alt="" className="loss" />
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
