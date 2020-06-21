import React, { Component } from "react";
import "./App.scss";

import { ReactComponent as Dice1 } from "./assets/dice1.svg";
import { ReactComponent as Dice2 } from "./assets/dice2.svg";
import { ReactComponent as Dice3 } from "./assets/dice3.svg";
import { ReactComponent as Dice4 } from "./assets/dice4.svg";
import { ReactComponent as Dice5 } from "./assets/dice5.svg";
import { ReactComponent as Dice6 } from "./assets/dice6.svg";

import Home from "./components/home";
import TopBar from "./components/topBar";
import DiceScreen from "./components/diceScreen";
import BetPanel from "./components/betPanel";
import DiceSelection from "./components/diceSelection";
import BetAmountPanel from "./components/betAmountPanel";
import BetButton from "./components/betButton";
import Profile from "./components/profile";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            gameStatus: "HOME",
            gamePage: "HOME",
            betAmount: 0,
            betDifference: 10,
            sideGenerated: 0,
            previousSelection: 0,
            currentSelection: 0,
            allDice: [
                {
                    number: 1,
                    image: <Dice1 />,
                },
                {
                    number: 2,
                    image: <Dice2 />,
                },
                {
                    number: 3,
                    image: <Dice3 />,
                },
                {
                    number: 4,
                    image: <Dice4 />,
                },
                {
                    number: 5,
                    image: <Dice5 />,
                },
                {
                    number: 6,
                    image: <Dice6 />,
                },
            ],
        };
    }

    componentDidMount() {
        this.loadUserData();
    }

    /**
     * Load data from the Server API.
     *
     * @returns {Undefined}
     */

    loadUserData = () => {
        fetch("http://localhost:3000/get-user/robouser")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    user: data,
                })
            );
    };

    /**
     * Returns the array index of the dice passed as a parameter.
     *
     * @param {Number} searchDiceNumber
     * @returns {Number}
     */

    getDiceIndex = (searchDiceNumber) => {
        const isDice = (dice) => dice.number === searchDiceNumber;
        return this.state.allDice.findIndex(isDice);
    };

    /**
     * Increases bet stake amount by betDifference, until it reaches the user's full purse.
     *
     * @returns {Undefined}
     */

    increaseBet = () => {
        const newBetAmount =
            this.state.betAmount <=
            this.state.user.balance - this.state.betDifference
                ? this.state.betAmount + this.state.betDifference
                : this.state.betAmount;

        this.setState({
            betAmount: newBetAmount,
        });
    };

    /**
     * Decreases bet stake amount by betDifference, until it reaches 0.
     *
     * @returns {Undefined}
     */

    decreaseBet = () => {
        const newBetAmount =
            this.state.betAmount - this.state.betDifference >= 0
                ? this.state.betAmount - this.state.betDifference
                : this.state.betAmount;

        this.setState({
            betAmount: newBetAmount,
        });
    };

    /**
     * Toggle Page between Home and History
     *
     * @returns {Undefined}
     */

    togglePage = () => {
        const togglePage = this.state.gamePage === "HOME" ? "PROFILE" : "HOME";

        this.setState({
            gamePage: togglePage,
        });
    };

    /**
     * Highlights the selected dice, and dims the rest.
     *
     * Runs only if the new selection is not the same as the previous.
     * If a dice was already chosen before this one, than remove old dice selection from active.
     * On first selection, dims all dice and sets selected dice as active.
     *
     * @param {Number} dice - The chosen dice value.
     * @param {Number} i - The index of the selected dice.
     * @returns {Undefined}
     */

    selectDice = (dice, i) => {
        const allDiceElements = document.getElementById("js-alldice");

        if (allDiceElements === undefined) return;

        if (this.state.currentSelection !== 0) {
            allDiceElements.childNodes[
                this.getDiceIndex(this.state.currentSelection)
            ].classList.toggle("bet-panel__dice-item--active");
        } else if (this.state.currentSelection === 0) {
            this.state.allDice.map((dice, i) =>
                allDiceElements.childNodes[i].classList.add(
                    "bet-panel__dice-item--inactive"
                )
            );
        }

        allDiceElements.childNodes[i].classList.toggle(
            "bet-panel__dice-item--active"
        );

        this.setState({
            currentSelection: dice,
        });
    };

    /**
     * Submits the user's bet to the API, which will then update the state.
     *
     * @returns {Undefined}
     */

    submitBet = () => {
        fetch("http://localhost:3000/roll-dice", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.user.username,
                betAmount: this.state.betAmount,
                sideSelected: this.state.currentSelection,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data) return;

                this.setState({
                    gameStatus: data.result,
                    previousSelection: this.state.currentSelection,
                    sideGenerated: data.sideGenerated,
                });

                this.loadUserData();
            });
    };

    render() {
        const {
            user,
            betAmount,
            gameStatus,
            currentSelection,
            sideGenerated,
            previousSelection,
            allDice,
            gamePage,
        } = this.state;

        return (
            <React.Fragment>
                {gamePage === "HOME" ? (
                    <Home>
                        <TopBar
                            balance={user.balance}
                            togglePage={this.togglePage}
                        />
                        <DiceScreen
                            allDice={allDice}
                            sideGenerated={sideGenerated}
                            previousSelection={previousSelection}
                            gameStatus={gameStatus}
                            betAmount={user.balance}
                        />
                        <BetPanel>
                            <DiceSelection
                                allDice={allDice}
                                selectDice={this.selectDice}
                                currentSelection={currentSelection}
                            />
                            <BetAmountPanel
                                betAmount={betAmount}
                                decreaseBet={this.decreaseBet}
                                increaseBet={this.increaseBet}
                            />
                            <BetButton
                                currentSelection={currentSelection}
                                betAmount={betAmount}
                                submitBet={this.submitBet}
                            />
                        </BetPanel>
                    </Home>
                ) : (
                    <Profile
                        allDice={allDice}
                        user={user}
                        togglePage={this.togglePage}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default App;
