//import { INCREASE_BET } from "./constants";
import React from "react";
import { combineReducers } from "redux";
import { getDiceIndex } from "./utils";

import { ReactComponent as Dice1 } from "../assets/dice1.svg";
import { ReactComponent as Dice2 } from "../assets/dice2.svg";
import { ReactComponent as Dice3 } from "../assets/dice3.svg";
import { ReactComponent as Dice4 } from "../assets/dice4.svg";
import { ReactComponent as Dice5 } from "../assets/dice5.svg";
import { ReactComponent as Dice6 } from "../assets/dice6.svg";

/**
 *
 * BET AMOUNT
 *
 * */

const intialBetState = {
  betAmount: 0,
  betDifference: 10,
};

export const betAmount = (state = intialBetState, action = {}) => {
  let newBetAmount;
  switch (action.type) {
    case "INCREASE_BET":
      newBetAmount =
        state.betAmount <= action.payload.myBalanceAmount - state.betDifference
          ? state.betAmount + state.betDifference
          : state.betAmount;
      return { ...state, betAmount: newBetAmount };
    case "DECREASE_BET":
      newBetAmount =
        state.betAmount - state.betDifference >= 0
          ? state.betAmount - state.betDifference
          : state.betAmount;
      return { ...state, betAmount: newBetAmount };
    default:
      return state;
  }
};

/**
 *
 *
 * SELECT DICE
 *
 *
 * */
const intialSelectDiceState = {
  diceSelected: 0,
  allDice: [
    { number: 1, image: <Dice1 /> },
    { number: 2, image: <Dice2 /> },
    { number: 3, image: <Dice3 /> },
    { number: 4, image: <Dice4 /> },
    { number: 5, image: <Dice5 /> },
    { number: 6, image: <Dice6 /> },
  ],
};

export const selectDice = (state = intialSelectDiceState, action = {}) => {
  switch (action.type) {
    case "SELECT_DICE":
      if (state.diceSelected !== action.payload.dice) {
        if (state.diceSelected !== 0) {
          document.getElementById("js-alldice").childNodes[
            getDiceIndex(state.diceSelected, state.allDice)
          ].classList.toggle("active");
        }
        if (state.diceSelected === 0) {
          state.allDice.map((dice, i) => document.getElementById("js-alldice")
            .childNodes[i].classList.add("selection-made")
          );
        }
        document.getElementById("js-alldice")
          .childNodes[action.payload.i].classList.toggle("active");
        return { ...state, diceSelected: action.payload.dice };
      } else {
        return state;
      }
    default:
      return state;
  }
};

/**
 *
 * GET USER DATA
 *
 * */

const intialStateUsers = {
  user: {},
  lastDiceSelected: 0,
  gameStatus: "HOME",
  gamePage: "HOME",
  sideGenerated: 0,
  error: "",
};

export const requestUserData = (state = intialStateUsers, action = {}) => {
  switch (action.type) {
    case "LAST_DICE_SELECTED":
      return { ...state, lastDiceSelected: action.payload.diceSelected };
    case "TOGGLE_PAGE":
      const newPage = state.gamePage === "HOME" ? "PROFILE" : "HOME"
      return { ...state, gamePage: newPage };

    case "REQUEST_USER_PENDING":
      return { ...state };
    case "REQUEST_USER_SUCCESS":
      return { ...state, user: action.payload };
    case "REQUEST_USER_FAILED":
      return { ...state, error: action.payload };

    case "PLACE_BET_PENDING":
      return { ...state };
    case "PLACE_BET_SUCCESS":
      return {
        ...state,
        gameStatus: action.payload.result,
        sideGenerated: action.payload.sideGenerated
      };
    case "PLACE_BET_FAILED":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

/**
 *
 *
 * EXPORT
 *
 *
 * */

export const allReducers = combineReducers({
  betAmount,
  selectDice,
  requestUserData
});
