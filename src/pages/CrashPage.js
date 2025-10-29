import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useLocalization } from '../hooks/useLocalization'
import Crash from '../components/Crash'
import LegendModal from '../components/LegendModal'

const CrashPage = () => {
  const navigate = useNavigate()
  const { t } = useLocalization()
  const gameState = useOutletContext()
  const [showLegend, setShowLegend] = useState(false)

  const handleBackToGames = () => {
    navigate('/')
  }

  const handleShowLegend = () => {
    setShowLegend(true)
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <button 
          className="back-button"
          onClick={handleBackToGames}
        >
          {t('game.backToGames')}
        </button>
        <h1>{t('crash.title')}</h1>
        <button 
          className="legend-button"
          onClick={handleShowLegend}
        >
          {t('game.legend')}
        </button>
      </div>
      
      <div className="game-content">
        <div className="crash-container">
          <div className="bet-controls-game">
            <label>{t('header.bet')}: </label>
            <input 
              type="number" 
              value={gameState.crashBet} 
              onChange={(e) => gameState.setCrashBet(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max={gameState.wallet}
              disabled={gameState.isRunning}
              className="bet-input-game"
            />
          </div>
          <Crash gameState={gameState} />
        </div>
      </div>

      <LegendModal 
        isOpen={showLegend}
        onClose={() => setShowLegend(false)}
        gameType="crash"
      />
    </div>
  )
}

export default CrashPage
