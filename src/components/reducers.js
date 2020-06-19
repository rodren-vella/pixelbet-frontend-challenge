import { INCREASE_BET } from "./constants";
import React, { Component } from "react";
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
 *
 * BET AMOUNT
 *
 *
 * */

const intialState = {
  betAmount: 0,
  betDifference: 10,
};

export const betAmount = (state = intialState, action = {}) => {
  let newBetAmount;
  switch (action.type) {
    case "INCREASE_BET":
      newBetAmount =
        state.betAmount <=
        /*this.state.user.balance*/ 2000 - state.betDifference
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
    { diceNumber: 1, diceImage: <Dice1 /> },
    { diceNumber: 2, diceImage: <Dice2 /> },
    { diceNumber: 3, diceImage: <Dice3 /> },
    { diceNumber: 4, diceImage: <Dice4 /> },
    { diceNumber: 5, diceImage: <Dice5 /> },
    { diceNumber: 6, diceImage: <Dice6 /> },
  ],
};

/**
 * HIGHLIGHT selected dice and DIM others
 *
 * @function selectDice
 * @param {dice} number Chosen dice number
 * @param {i} number index
 */
export const selectDice = (state = intialSelectDiceState, action = {}) => {
  switch (action.type) {
    case "SELECT_DICE":
      //RUN ONLY IF THE NEW SELECTION IS NOT THE SAME AS THE PREVIOUS
      if (state.diceSelected !== action.payload.dice) {
        console.log("selecting dice");
        //IF A DICE WAS ALREADY CHOSEN BEFORE THIS ONE, THAN REMOVE OLD DICE SELECTION
        if (state.diceSelected !== 0) {
          document
            .getElementById("js-alldice")
            .childNodes[
              getDiceIndex(state.diceSelected, state.allDice)
            ].classList.toggle("active");
        }
        //FIRST SELECTION MADE so DIM ALL DICE
        if (state.diceSelected === 0) {
          state.allDice.map((dice, i) =>
            document
              .getElementById("js-alldice")
              .childNodes[i].classList.add("selection-made")
          );
        }
        //SET ACTIVE CLASS to CHOSEN DICE
        document
          .getElementById("js-alldice")
          .childNodes[action.payload.i].classList.toggle("active");
        return { ...state, diceSelected: action.payload.dice };
      }
    default:
      return state;
  }
};

/**
 *
 *
 * GET USER DATA
 *
 *
 * */

const intialStateUsers = {
  user: {},
  lastDiceSelected: 0,
  gameStatus: "HOME",
  sideGenerated: 0,
};

export const requestUserData = (state = intialStateUsers, action = {}) => {
  switch (action.type) {
    case "REQUEST_USERS_PENDING":
      return { ...state, isPending: true };
    case "REQUEST_USERS_SUCCESS":
      return { ...state, user: action.payload, isPending: false };
    case "REQUEST_USERS_FAILED":
      return { ...state, user: action.payload, isPending: false };
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
  requestUserData,
});
