import React from "react";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { togglePage } from "./actions";
import { useSelector, useDispatch } from "react-redux";


const TopBar = () => {
  const user = useSelector((state) => state.requestUserData.user);
  const dispatch = useDispatch();

  return (
    <header className="header header--home">
      <span className="header__balance">{user.balance}</span>
      <DownArrow className="header__icon header__icon--home" width="10" onClick={() => dispatch(togglePage())} />
    </header>
  );
};

export default TopBar;
