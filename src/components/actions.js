import { INCREASE_BET } from "./constants";

export const increaceMyBet = () => ({
  type: "INCREASE_BET",
});

export const decreaceMyBet = () => ({
  type: "DECREASE_BET",
});

export const selectMyDice = (dice, i) => ({
  type: "SELECT_DICE",
  payload: { dice, i },
});

export const loadMyUserData = () => (dispatch) => {
  dispatch({ type: "REQUEST_USERS_PENDING" });
  fetch("http://localhost:3000/get-user/robouser").then((response) =>
    response
      .json()
      .then((data) =>
        dispatch({ type: "REQUEST_USERS_SUCCESS", payload: data })
      )
      .catch((error) =>
        dispatch({ type: "REQUEST_USERS_FAILED", payload: error })
      )
  );
};
