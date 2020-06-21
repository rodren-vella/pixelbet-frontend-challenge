import React from "react";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";

const topBar = ({ balance, togglePage }) => {
    return (
        <header className="header header--home" onClick={togglePage}>
            <span className="header__balance">{balance}</span>
            <DownArrow className="header__icon header__icon--home" width="10" />
        </header>
    );
};

export default topBar;
