import React from "react";
import { GetDiceImage, capitalizeText } from "./utils";
import { ReactComponent as ArrowBack } from "../assets/left-arrow.svg";
import { useSelector, useDispatch } from "react-redux";
import { togglePage } from "./actions";

const Profile = () => {
    const user = useSelector((state) => state.requestUserData.user);
    //    const betHistory = useSelector((state) => state.requestUserData.user.betHistory);
    const allDice = useSelector((state) => state.selectDice.allDice);
    const dispatch = useDispatch();

    const betHistoryReverse = [...user.betHistory].reverse();
    const userBalanceHistory = [user.balance];
    let userBalance = user.balance;

    betHistoryReverse.map((bet, i) => {
        userBalance = userBalance + betHistoryReverse[i].stake;

        betHistoryReverse[i].result === "WON" &&
            (userBalance = userBalance - betHistoryReverse[i].amountWon);

        return userBalanceHistory.push(userBalance);
    });

    const showAllItems = () => {
        const listParent = document.getElementById("profile__history-list");
        if (listParent === undefined) return;
        betHistoryReverse.map((item, i) => listParent.childNodes[i].classList.add("profile__history-item--show"));

        const showAllButton = document.getElementById("js-show-all-history");
        showAllButton.classList.add("profile__history-button--disable");
    }

    return (
        <div className="page-holder profile" id="js-profile">
            <header className="profile__header header header--profile">
                <ArrowBack width="10" className="header__icon" onClick={() => dispatch(togglePage())} />
            </header>

            <div className="profile__topup">
                <span className="profile__topup-credit">{user.balance}</span>
                <div className="profile__topup-button">
                    <button>TOP UP THE ACCOUNT</button>
                </div>
            </div>

            <div className="profile__history">
                <span className="profile__history-title">History</span>


                {betHistoryReverse.length !== 0 && (
                    <ul id="profile__history-list" className="profile__history-list">
                        {betHistoryReverse.map((bet, i) => (
                            <li key={i} className="profile__history-item" data-position={i}>
                                <div className="profile__history-column">
                                    {GetDiceImage(allDice,
                                        betHistoryReverse[i].sideGenerated
                                    )}

                                    <div className="profile__history-info">
                                        <span className="profile__history-verdict">
                                            {capitalizeText(
                                                betHistoryReverse[i].result
                                            )}
                                        </span>
                                        <span className="profile__history-timestamp">
                                            {new Intl.DateTimeFormat("en-GB", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            }).format(
                                                betHistoryReverse[i].dateTime
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="profile__history-column">
                                    {GetDiceImage(allDice,
                                        betHistoryReverse[i].sideSelected
                                    )}
                                    <span
                                        className={`profile__history-margin profile__history-margin--${betHistoryReverse[i].result}`}
                                    >
                                        {betHistoryReverse[i].result === "WON"
                                            ? betHistoryReverse[i].amountWon
                                            : betHistoryReverse[i].stake}
                                    </span>
                                    <span className="profile__history-credit">
                                        {userBalanceHistory[i]}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                )}
                {betHistoryReverse.length > 5 && (
                    <div className="profile__history-button" id="js-show-all-history">
                        <button onClick={showAllItems}>show more</button>
                    </div>)}
            </div>
        </div>
    );
};

export default Profile;
