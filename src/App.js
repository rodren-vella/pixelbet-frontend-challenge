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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      lastDiceSelected: 0,
      diceSelected: 0,
      betAmount: 0,
      betDifference: 10,
      gameStatus: "HOME",
      sideGenerated: 0,
      allDice: [
        { diceNumber: 1, diceImage: <Dice1 /> },
        { diceNumber: 2, diceImage: <Dice2 /> },
        { diceNumber: 3, diceImage: <Dice3 /> },
        { diceNumber: 4, diceImage: <Dice4 /> },
        { diceNumber: 5, diceImage: <Dice5 /> },
        { diceNumber: 6, diceImage: <Dice6 /> },
      ],
    };
  }

  /**
   * Load data from the Server API.
   *
   * @function loadUserData
   */
  loadUserData = () => {
    fetch("http://localhost:3000/get-user/robouser")
      .then((response) => response.json())
      .then((data) => this.setState({ user: data }));
  };

  componentDidMount() {
    this.loadUserData();
  }

  /**
   * GET Array Index of Dice passed in param
   *
   * @function getDiceIndex
   * @param {searchDiceNumber} number
   */
  getDiceIndex = (searchDiceNumber) => {
    const isDice = (dice) => dice.diceNumber === searchDiceNumber;
    return this.state.allDice.findIndex(isDice);
  };

  /**
   * INCREASE BET on CLICK of +
   *
   * Updates betAmount state with new betting amount
   * @function increaceBet
   */
  increaceBet = () => {
    const newBetAmount =
      this.state.betAmount <= this.state.user.balance - this.state.betDifference
        ? this.state.betAmount + this.state.betDifference
        : this.state.betAmount;
    this.setState({ betAmount: newBetAmount });
  };

  /**
   * DECREASE BET on CLICK of -
   *
   * Updates betAmount state with new betting amount
   * @function decreaceBet
   */
  decreaceBet = () => {
    const newBetAmount =
      this.state.betAmount - this.state.betDifference >= 0
        ? this.state.betAmount - this.state.betDifference
        : this.state.betAmount;
    this.setState({ betAmount: newBetAmount });
  };

  /**
   * HIGHLIGHT selected dice and DIM others
   *
   * @function selectDice
   * @param {dice} number Chosen dice number
   * @param {i} number index
   */
  selectDice = (dice, i) => {
    //RUN ONLY IF THE NEW SELECTION IS NOT THE SAME AS THE PREVIOUS
    if (this.state.diceSelected !== dice) {
      //IF A DICE WAS ALREADY CHOSEN BEFORE THIS ONE, THAN REMOVE OLD DICE SELECTION
      if (this.state.diceSelected !== 0) {
        document
          .getElementById("js-alldice")
          .childNodes[
            this.getDiceIndex(this.state.diceSelected)
          ].classList.toggle("active");
      }

      //FIRST SELECTION MADE so DIM ALL DICE
      if (this.state.diceSelected === 0) {
        this.state.allDice.map((dice, i) =>
          document
            .getElementById("js-alldice")
            .childNodes[i].classList.add("selection-made")
        );
      }

      //SET ACTIVE CLASS to CHOSEN DICE
      document
        .getElementById("js-alldice")
        .childNodes[i].classList.toggle("active");

      this.setState({ diceSelected: dice });
    }
  };

  /**
   * SUBMIT BET
   *
   * @function submitBet
   */
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
        if (data) {
          //UPDATE STATES WITH NEW INFO
          this.setState({
            gameStatus: data.result,
            lastDiceSelected: this.state.diceSelected,
            sideGenerated: data.sideGenerated,
          });

          //LOAD NEW DATA FROM SERVER API
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
      allDice,
    } = this.state;

    return (
      <div className="diceToss">
        <TopBar balance={user.balance} />
        <DiceScreen
          allDice={allDice}
          sideGenerated={sideGenerated}
          lastDiceSelected={lastDiceSelected}
          gameStatus={gameStatus}
          betAmount={user.balance}
        />
        <BetPanel>
          <DiceSelection allDice={allDice} selectDice={this.selectDice} />
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
