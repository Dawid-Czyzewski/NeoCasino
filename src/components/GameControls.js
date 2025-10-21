import { useLocalization } from '../hooks/useLocalization'

const GameControls = ({ onSpin, isSpinning, canSpin, lastWin, wallet, bet }) => {
  const { t } = useLocalization()

  const hasEnoughMoney = wallet >= bet
  const tooltipText = !hasEnoughMoney ? t('game.noMoney') : ''

  return (
    <div className="controls">
      <div className="spin-button-container">
        <button 
          onClick={onSpin} 
          disabled={!canSpin}
          className="spin-button"
        >
          {isSpinning ? t('game.spinning') : t('game.spin')}
        </button>
        {!hasEnoughMoney && (
          <div className="tooltip">
            {tooltipText}
          </div>
        )}
      </div>
      
      {lastWin > 0 && (
        <div className="win-message">
          🎉 {t('game.win')}: {lastWin} 🎉
        </div>
      )}
    </div>
  )
}

export default GameControls
