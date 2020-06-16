import React, { Component } from "react";
import "./App.scss";
import logo from "./assets/dice-logo.svg";
import dice1 from "./assets/dice1.svg";
import dice2 from "./assets/dice2.svg";
import dice3 from "./assets/dice3.svg";
import dice4 from "./assets/dice4.svg";
import dice5 from "./assets/dice5.svg";
import dice6 from "./assets/dice6.svg";

import minus from "./assets/minus.svg";
import plus from "./assets/plus.svg";

const dices = [
  { diceNumber: 1, diceImage: `${dice1}` },
  { diceNumber: 2, diceImage: `${dice2}` },
  { diceNumber: 3, diceImage: `${dice3}` },
  { diceNumber: 4, diceImage: `${dice4}` },
  { diceNumber: 5, diceImage: `${dice5}` },
  { diceNumber: 6, diceImage: `${dice6}` },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      diceSelected: 0,
      betAmount: 0,
      betDifference: 10,
    };
  }

  loadUserData = () => {
    fetch("http://localhost:3000/get-user/robouser")
      .then((response) => response.json())
      .then((data) => this.setState({ user: data }));
  };

  componentDidMount() {
    this.loadUserData();
  }
  componentDidUpdate() {
    this.loadUserData();
  }

  increaceBet = () => {
    const newBetAmount =
      this.state.betAmount <= this.state.user.balance - this.state.betDifference
        ? this.state.betAmount + this.state.betDifference
        : this.state.betAmount;
    this.setState({ betAmount: newBetAmount });
  };

  decreaceBet = () => {
    const newBetAmount =
      this.state.betAmount - this.state.betDifference >= 0
        ? this.state.betAmount - this.state.betDifference
        : this.state.betAmount;
    this.setState({ betAmount: newBetAmount });
  };

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
          console.log("POSTED");
        }
      });
  };

  render() {
    const { user, betAmount } = this.state;

    return (
      <div className="diceToss">
        <div className="topBar">
          <a href="/">{user.balance} V</a>
        </div>

        <div className="diceScreen">
          <img src={logo} alt="DICE TOSS" width="40%" />

          <span className="diceScreen__amount">&nbsp;</span>
          <span className="diceScreen__outcome">&nbsp;</span>
        </div>

        <div className="betPanel">
          <div className="betPanel__diceSlection">
            <span className="betPanel__instructions">
              Tap to change selection
            </span>
            <ul className="betPanel__dices" id="js-dices">
              {dices.map((dice, i) => (
                <li key={i}>
                  <img
                    src={dice.diceImage}
                    width="44"
                    alt={dice.diceNumber}
                    onClick={() => this.selectDice(dice.diceNumber, i)}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="betPanel__amountPanel">
            <img src={minus} alt="-" width="44" onClick={this.decreaceBet} />
            <span>{betAmount}</span>
            <img src={plus} alt="+" width="44" onClick={this.increaceBet} />
          </div>

          <div className="betPanel__button">
            <span onClick={this.submitBet}>ROLL THE DICE MAN</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
