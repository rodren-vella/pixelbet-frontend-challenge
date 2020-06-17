import React from "react";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";

const topBar = ({ balance }) => {
  return (
    <div className="topBar">
      {balance} <DownArrow className="down-arrow" />
    </div>
  );
};

export default topBar;
