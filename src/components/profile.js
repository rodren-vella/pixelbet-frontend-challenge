import React from 'react'
import { getDiceImage, capitalizeText } from './utils'
import { ReactComponent as ArrowBack } from '../assets/left-arrow.svg'

const profile = ({ user, allDice, togglePage }) => {
  const betHistoryReverse = [...user.betHistory].reverse()
  //
  const userBalanceHistory = [user.balance]
  let userBalance = user.balance
  //
  betHistoryReverse.map((bet, i) => {
    userBalance = userBalance + betHistoryReverse[i].stake
    betHistoryReverse[i].result === 'WON' &&
      (userBalance = userBalance - betHistoryReverse[i].amountWon)

    console.log(userBalanceHistory)
    return userBalanceHistory.push(userBalance)
  })

  return (
    <div className="profile" id="js-profile">
      <header className="profile-header" onClick={togglePage}>
        <ArrowBack width="10" />
      </header>

      <div className="profile-topup">
        <span className="profile-topup__credit">{user.balance}</span>
        <div className="profile-topup__button">
          <button className="profile-topup__button-topup">
            TOP UP THE ACCOUNT
          </button>
        </div>
      </div>

      <div className="profile-history">
        <span className="profile-history__title">History</span>

        {betHistoryReverse.length !== 0 && (
          <ul className="profile-history__list">
            {betHistoryReverse.map((bet, i) => (
              <li key={i} className="profile-history__item">
                <div className="profile-history__item-column">
                  {getDiceImage(allDice, betHistoryReverse[i].sideGenerated)}

                  <div className="profile-history__item-info">
                    <span className="profile-history__item-verdict">
                      {capitalizeText(betHistoryReverse[i].result)}
                    </span>
                    <span className="profile-history__item-timestamp">
                      {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(betHistoryReverse[i].dateTime)}
                    </span>
                  </div>
                </div>
                <div className="profile-history__item-column">
                  {getDiceImage(allDice, betHistoryReverse[i].sideSelected)}
                  <span
                    className={`profile-history__item-margin profile-history__item-margin--${betHistoryReverse[i].result}`}
                  >
                    {betHistoryReverse[i].result === 'WON'
                      ? betHistoryReverse[i].amountWon
                      : betHistoryReverse[i].stake}
                  </span>
                  <span className="profile-history__item-credit">
                    {userBalanceHistory[i]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default profile
