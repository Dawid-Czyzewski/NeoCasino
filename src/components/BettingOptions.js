import React from 'react'
import { RouletteService } from '../services/rouletteService'
import { useLocalization } from '../hooks/useLocalization'
import { ROULETTE_BET_TYPES } from '../constants/gameConstants'

const BettingOptions = ({ currentBet, setCurrentBet, isSpinning, rouletteBet }) => {
  const { t } = useLocalization()
  const betTypes = ROULETTE_BET_TYPES

  return (
    <div className="roulette-betting">
      <h3>{t('roulette.betOn')}</h3>
      <div className="bet-options">
        {betTypes.map(({ type, multiplier, emoji }) => (
          <button
            key={type}
            className={`bet-option ${currentBet === type ? 'active' : ''}`}
            onClick={() => setCurrentBet(type)}
            disabled={isSpinning}
          >
            {emoji} {t(`roulette.${type}`)} (x{multiplier})
          </button>
        ))}
      </div>

      <div className="current-bet-info">
        <p>{t('roulette.bettingOn')}: <strong>{RouletteService.getBetDisplayName(currentBet, t)}</strong></p>
        <p>{t('roulette.betAmount')}: <strong>{rouletteBet}</strong></p>
      </div>
    </div>
  )
}

export default BettingOptions
