import React, { Component } from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { loadMyUserData } from "./components/actions";
import "./App.scss";

import TopBar from "./components/topBar";
import DiceScreen from "./components/diceScreen";
import BetPanel from "./components/betPanel";
import DiceSelection from "./components/diceSelection";
import BetAmountPanel from "./components/betAmountPanel";
import BetButton from "./components/betButton";

//dispatch(loadMyUserData());

// const mapStateToProps = (state) => {
//   return {
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadMyUserData: (event) => {
//       dispatch(loadMyUserData());
//     },
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUser: () => dispatch(loadMyUserData()),
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      lastDiceSelected: 0,
      // diceSelected: 0,
      // betAmount: 0,
      // betDifference: 10,
      gameStatus: "HOME",
      sideGenerated: 0,
    };
  }

  /**
   * Load data from the Server API.
   *
   * @function loadUserData
   */
  loadUserData = () => {
    // fetch("http://localhost:3000/get-user/robouser")
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ user: data }));
  };

  componentDidMount() {
    //this.loadUserData();
    this.props.onRequestUser();
  }

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
          <DiceSelection />
          <BetAmountPanel />
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

/*export default connect(mapStateToProps, mapDispatchToProps)(App);*/
export default connect(null, mapDispatchToProps)(App);
//export default App;
