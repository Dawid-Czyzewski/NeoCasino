import { useCallback, useEffect } from 'react'
import { useCrash } from '../hooks/useCrash'
import { useLocalization } from '../hooks/useLocalization'
import '../styles/components/Crash.css'

const Crash = ({ gameState }) => {
  const { t } = useLocalization()
  const { 
    crashBet, 
    setWallet,
    canStartCrash 
  } = gameState
  
  const {
    isRunning,
    multiplier,
    crashed,
    lastWin,
    canCashOut,
    startGame,
    cashOut,
    resetGame
  } = useCrash()

  const handleStart = useCallback(() => {
    if (!canStartCrash) return
    
    setWallet(prev => prev - crashBet)
    
    startGame()
  }, [canStartCrash, startGame, crashBet, setWallet])

  const handleCashOut = useCallback(() => {
    if (!canCashOut) return
    
    const winAmount = cashOut()
    if (winAmount) {
      setWallet(prev => prev + (crashBet * winAmount))
    }
  }, [canCashOut, cashOut, crashBet, setWallet])

  const handleReset = useCallback(() => {
    resetGame()
  }, [resetGame])

  useEffect(() => {
    if (crashed) {
      const timer = setTimeout(() => {
        resetGame()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [crashed, resetGame])

  return (
    <div className="crash-game">
      <div className="crash-display">
        <div className={`multiplier-display ${isRunning ? 'running' : ''} ${crashed ? 'crashed' : ''}`}>
          <span className="multiplier-label">{t('crash.currentMultiplier')}</span>
          <span className="multiplier-value">
            {crashed ? `💥 ${multiplier.toFixed(2)}x` : `${multiplier.toFixed(2)}x`}
          </span>
        </div>
        
      </div>

      <div className="crash-controls">
        {!isRunning && !crashed && (
          <button 
            className="start-button"
            onClick={handleStart}
            disabled={!canStartCrash}
          >
            {t('crash.startGame')}
          </button>
        )}

        {isRunning && canCashOut && (
          <button 
            className="cashout-button"
            onClick={handleCashOut}
          >
            {t('crash.cashOut')} ({multiplier.toFixed(2)}x)
          </button>
        )}

        {crashed && (
          <div className="crash-result">
            <h3 className="crash-message">💥 {t('crash.crashed')}</h3>
            <p className="crash-info">{t('crash.crashedAt')}: {multiplier.toFixed(2)}x</p>
            <button 
              className="reset-button"
              onClick={handleReset}
            >
              {t('crash.playAgain')}
            </button>
          </div>
        )}

        {lastWin > 0 && !isRunning && !crashed && (
          <div className="win-result">
            <h3 className="win-message">🎉 {t('crash.youWon')}</h3>
            <p className="win-amount">{t('crash.won')}: ${(crashBet * lastWin).toFixed(2)}</p>
            <p className="win-multiplier">{t('crash.multiplier')}: {lastWin.toFixed(2)}x</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Crash
