import React from "react";

const betButton = ({ currentSelection, betAmount, submitBet }) => {
    /**
     * Check that a bet amount has been set and a dice has been selected
     *
     * @returns {boolean}
     */
    const checkIfWeCanPlay = () => {
        const checkIfWeCanPlay =
            betAmount > 0 && currentSelection > 0 ? false : true;
        return checkIfWeCanPlay;
    };

    return (
        <div
            className={`bet-panel__button ${
                checkIfWeCanPlay()
                    ? "bet-panel__button--inactive"
                    : "bet-panel__button--active"
            }`}
        >
            <button
                disabled={checkIfWeCanPlay()}
                onClick={submitBet}
                className="bet-panel__button-item"
            >
                ROLL THE DICE MAN
            </button>
        </div>
    );
};

export default betButton;
