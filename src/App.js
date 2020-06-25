import React, { Component } from "react";
import { connect } from "react-redux";
//import { useSelector, useDispatch } from "react-redux";
import { requestUserData } from "./components/actions";
import "./App.scss";

import TopBar from "./components/topBar";
import DiceScreen from "./components/diceScreen";
import BetPanel from "./components/betPanel";
import DiceSelection from "./components/diceSelection";
import BetAmountPanel from "./components/betAmountPanel";
import BetButton from "./components/betButton";

const mapStateToProps = (state) => {
  return {
    user: state.requestUserData.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUser: () => dispatch(requestUserData()),
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestUser();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="diceToss">
        <TopBar balance={user.balance} />
        <DiceScreen />
        <BetPanel>
          <DiceSelection />
          <BetAmountPanel />
          <BetButton />
        </BetPanel>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
