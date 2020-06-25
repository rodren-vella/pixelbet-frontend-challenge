// import { INCREASE_BET } from "./constants";

export const increaceMyBet = (myBalanceAmount) => ({
  type: "INCREASE_BET",
  payload: { myBalanceAmount }
});

export const decreaceMyBet = () => ({
  type: "DECREASE_BET",
});

export const selectMyDice = (dice, i) => ({
  type: "SELECT_DICE",
  payload: { dice, i },
});

export const lastDiceSelected = (diceSelected) => ({
  type: "LAST_DICE_SELECTED",
  payload: { diceSelected }
});

export const requestUserData = () => (dispatch) => {
  dispatch({ type: "REQUEST_USER_PENDING" });
  fetch("http://localhost:3000/get-user/robouser")
    .then(response => response.json())
    .then(data => dispatch({ type: "REQUEST_USER_SUCCESS", payload: data }))
    .catch(error => dispatch({ type: "REQUEST_USER_FAILED", payload: error }))
};

export const placeBet = (username, betAmount, sideSelected) => (dispatch) => {
  dispatch({ type: "PLACE_BET_PENDING" });
  fetch("http://localhost:3000/roll-dice", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      betAmount: betAmount,
      sideSelected: sideSelected,
    }),
  })
    .then((response) => response.json())
    .then(data => dispatch({ type: "PLACE_BET_SUCCESS", payload: data }))
    .then(() => dispatch(requestUserData()))
    .catch(error => dispatch({ type: "PLACE_BET_FAILED", payload: error }))
};