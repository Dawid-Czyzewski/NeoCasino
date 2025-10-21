import React from 'react'
import { useBlackjack } from '../hooks/useBlackjack'
import BlackjackTable from './BlackjackTable'

const Blackjack = ({ gameState }) => {
  const {
    gameState: blackjackGameState,
    playerHand,
    dealerHand,
    gameResult,
    lastWin,
    messageKey,
    canStartGame,
    canHit,
    canStand,
    isGameActive,
    playerValue,
    dealerValue,
    startNewGame,
    dealCards,
    hit,
    stand
  } = useBlackjack(gameState)

  return (
    <div className="blackjack-container">
      <BlackjackTable
        gameState={blackjackGameState}
        playerHand={playerHand}
        dealerHand={dealerHand}
        playerValue={playerValue}
        dealerValue={dealerValue}
        gameResult={gameResult}
        lastWin={lastWin}
        messageKey={messageKey}
        canStartGame={canStartGame}
        canHit={canHit}
        canStand={canStand}
        isGameActive={isGameActive}
        onDeal={dealCards}
        onHit={hit}
        onStand={stand}
        onNewGame={startNewGame}
      />
    </div>
  )
}

export default Blackjack
