import React from 'react'
import { useLocalization } from '../hooks/useLocalization'

const BlackjackControls = ({ 
  gameState, 
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
    <div className="blackjack-controls">
      {gameState === 'betting' && (
        <button 
          className="control-button deal-button"
          onClick={onDeal}
          disabled={!canStartGame}
        >
          {t('blackjack.deal')}
        </button>
      )}

      {(gameState === 'playing' || gameState === 'dealer_turn') && (
        <div className="game-controls">
          <button 
            className="control-button hit-button"
            onClick={onHit}
            disabled={!canHit}
          >
            {t('blackjack.hit')}
          </button>
          <button 
            className="control-button stand-button"
            onClick={onStand}
            disabled={!canStand}
          >
            {t('blackjack.stand')}
          </button>
        </div>
      )}

      {gameState === 'finished' && (
        <button 
          className="control-button new-game-button"
          onClick={onNewGame}
        >
          {t('blackjack.newGame')}
        </button>
      )}
    </div>
  )
}

export default BlackjackControls
