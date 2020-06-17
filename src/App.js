import React, { Component } from "react";
import "./App.scss";

import { ReactComponent as Dice1 } from "./assets/dice1.svg";
import { ReactComponent as Dice2 } from "./assets/dice2.svg";
import { ReactComponent as Dice3 } from "./assets/dice3.svg";
import { ReactComponent as Dice4 } from "./assets/dice4.svg";
import { ReactComponent as Dice5 } from "./assets/dice5.svg";
import { ReactComponent as Dice6 } from "./assets/dice6.svg";

import TopBar from "./components/topBar";
import DiceScreen from "./components/diceScreen";
import BetPanel from "./components/betPanel";
import DiceSelection from "./components/diceSelection";
import BetAmountPanel from "./components/betAmountPanel";
import BetButton from "./components/betButton";

const dices = [
  { diceNumber: 1, diceImage: <Dice1 /> },
  { diceNumber: 2, diceImage: <Dice2 /> },
  { diceNumber: 3, diceImage: <Dice3 /> },
  { diceNumber: 4, diceImage: <Dice4 /> },
  { diceNumber: 5, diceImage: <Dice5 /> },
  { diceNumber: 6, diceImage: <Dice6 /> },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      lastDiceSelected: 0,
      diceSelected: 0,
      betAmount: 0,
      betDifference: 10,
      gameStatus: "HOME",
      sideGenerated: 0,
    };
  }

  //LOAD DATA from SERVER
  loadUserData = () => {
    fetch("http://localhost:3000/get-user/robouser")
      .then((response) => response.json())
      .then((data) => this.setState({ user: data }));
  };

  //Get SVG for DICE
  getDiceImage = (searchDiceNumber) => {
    return dices.find(({ diceNumber }) => diceNumber === searchDiceNumber)
      .diceImage;
  };

  componentDidMount() {
    this.loadUserData();
  }

  //INCREASE BET on CLICK of +
  increaceBet = () => {
    const newBetAmount =
      this.state.betAmount <= this.state.user.balance - this.state.betDifference
        ? this.state.betAmount + this.state.betDifference
        : this.state.betAmount;
    this.setState({ betAmount: newBetAmount });
  };

  //INCREASE BET on CLICK of -
  decreaceBet = () => {
    const newBetAmount =
      this.state.betAmount - this.state.betDifference >= 0
        ? this.state.betAmount - this.state.betDifference
        : this.state.betAmount;
    this.setState({ betAmount: newBetAmount });
  };

  //HIGHLIGHT selected dice and DIM others
  selectDice = (dice, i) => {
    if (this.state.diceSelected !== dice) {
      //IF PREVIOUS WASN'T 0 THAN REMOVE OLD SELECTION
      if (this.state.diceSelected !== 0) {
        document
          .getElementById("js-dices")
          .childNodes[this.state.diceSelected - 1].classList.toggle("active");
      }

      //FIRST SELECTION, DIM ALL
      if (this.state.diceSelected === 0) {
        dices.map((dice, i) =>
          document
            .getElementById("js-dices")
            .childNodes[i].classList.add("selection-made")
        );
      }

      //TOGGLE ACTIVE CLASS
      document
        .getElementById("js-dices")
        .childNodes[i].classList.toggle("active");
    }

    this.setState({ diceSelected: dice });
  };

  submitBet = () => {
    fetch("http://localhost:3000/roll-dice", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.user.username,
        betAmount: this.state.betAmount,
        sideSelected: this.state.diceSelected,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          this.setState({
            gameStatus: data.result,
            lastDiceSelected: this.state.diceSelected,
            sideGenerated: data.sideGenerated,
          });
          console.log("POSTED", data.result);
          this.loadUserData();
        }
      });
  };

  render() {
    const {
      user,
      betAmount,
      gameStatus,
      diceSelected,
      sideGenerated,
      lastDiceSelected,
    } = this.state;

    const sideGeneratedImage =
      sideGenerated !== 0 &&
      sideGenerated !== undefined &&
      this.getDiceImage(sideGenerated);

    const lastDiceSelectedImage =
      lastDiceSelected !== 0 && this.getDiceImage(lastDiceSelected);

    return (
      <div className="diceToss">
        <TopBar balance={user.balance} />
        <DiceScreen
          lastDiceSelectedImage={lastDiceSelectedImage}
          sideGeneratedImage={sideGeneratedImage}
          gameStatus={gameStatus}
          betAmount={user.balance}
        />
        <BetPanel>
          <DiceSelection dices={dices} selectDice={this.selectDice} />
          <BetAmountPanel
            betAmount={betAmount}
            decreaceBet={this.decreaceBet}
            increaceBet={this.increaceBet}
          />
          <BetButton
            diceSelected={diceSelected}
            betAmount={betAmount}
            submitBet={this.submitBet}
          />
        </BetPanel>
      </div>
    );
  }
}

export default App;
