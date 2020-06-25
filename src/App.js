import React, { Component } from "react";
import { connect } from "react-redux";
//import { useSelector, useDispatch } from "react-redux";
import { requestUserData } from "./components/actions";
import "./App.scss";

import Home from "./components/home";
import TopBar from "./components/topBar";
import DiceScreen from "./components/diceScreen";
import BetPanel from "./components/betPanel";
import DiceSelection from "./components/diceSelection";
import BetAmountPanel from "./components/betAmountPanel";
import BetButton from "./components/betButton";
import Profile from "./components/profile";

const mapStateToProps = (state) => {
  return {
    gamePage: state.requestUserData.gamePage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUser: () => dispatch(requestUserData())
  }
}


class App extends Component {
  componentDidMount() {
    this.props.onRequestUser();
  }

  render() {
    const { user, gamePage } = this.props;

    return (
      <React.Fragment>
        {gamePage === "HOME" ? (
          <Home>
            <TopBar />
            <DiceScreen />
            <BetPanel>
              <DiceSelection />
              <BetAmountPanel />
              <BetButton />
            </BetPanel>
          </Home>
        ) : (
            <Profile />
          )}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
