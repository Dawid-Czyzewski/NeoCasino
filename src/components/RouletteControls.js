import React from 'react'
import { useLocalization } from '../hooks/useLocalization'

const RouletteControls = ({ 
  handleSpin, 
  canSpin, 
  isSpinning, 
  wallet, 
  rouletteBet, 
  lastWin, 
  selectedNumber 
}) => {
  const { t } = useLocalization()

  return (
    <div className="roulette-controls">
      <div className="spin-button-container">
        <button onClick={handleSpin} disabled={!canSpin} className="spin-button">
          {isSpinning ? t('roulette.spinning') : t('roulette.spin')}
        </button>
        {!canSpin && wallet < rouletteBet && (
          <div className="tooltip">{t('game.noMoney')}</div>
        )}
      </div>

      {lastWin > 0 && (
        <div className="win-message">
          🎉 {t('roulette.win')}: {lastWin} 🎉
          {selectedNumber !== null && (
            <div className="winning-number">
              {t('roulette.winningNumber')}: {selectedNumber}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RouletteControls
