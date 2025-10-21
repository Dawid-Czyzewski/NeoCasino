import React from 'react'
import { useLocalization } from '../hooks/useLocalization'
import Hand from './Hand'
import BlackjackControls from './BlackjackControls'

const BlackjackTable = ({
  gameState,
  playerHand,
  dealerHand,
  gameResult,
  lastWin,
  messageKey,
  canStartGame,
  canHit,
  canStand,
  onDeal,
  onHit,
  onStand,
  onNewGame
}) => {
  const { t } = useLocalization()

  return (
    <div className="blackjack-table">
      <div className="table-header">
        <h2>🃏 {t('blackjack.title')}</h2>
        <p>{t('blackjack.description')}</p>
      </div>

      <div className="table-content">
        <Hand
          hand={dealerHand}
          title={t('blackjack.dealer')}
          isDealer={true}
          showFirstCard={gameState !== 'betting' && gameState !== 'playing'}
          className="dealer-hand"
        />

        {messageKey && (
          <div className={`game-message ${gameResult || ''}`}>
            {t(messageKey)}
            {lastWin > 0 && (
              <div className="win-amount">
                +{lastWin}
              </div>
            )}
          </div>
        )}

        <Hand
          hand={playerHand}
          title={t('blackjack.player')}
          isDealer={false}
          showFirstCard={true}
          className="player-hand"
        />
      </div>
      
      <BlackjackControls
        gameState={gameState}
        canStartGame={canStartGame}
        canHit={canHit}
        canStand={canStand}
        onDeal={onDeal}
        onHit={onHit}
        onStand={onStand}
        onNewGame={onNewGame}
      />
    </div>
  )
}

export default BlackjackTable
