import React from "react";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";

const topBar = ({ balance, togglePage }) => {
    return (
        <header className="header header--home">
            <span className="header__balance" onClick={togglePage}>{balance}</span>
            <DownArrow className="header__icon header__icon--home" width="10" onClick={togglePage} />
        </header>
    );
};

export default topBar;
