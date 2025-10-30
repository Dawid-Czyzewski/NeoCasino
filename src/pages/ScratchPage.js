import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useLocalization } from '../hooks/useLocalization'
import ScratchCards from '../components/ScratchCards'
import LegendModal from '../components/LegendModal'

const ScratchPage = () => {
  const navigate = useNavigate()
  const { t } = useLocalization()
  const gameState = useOutletContext()
  const [showLegend, setShowLegend] = useState(false)

  const handleBackToGames = () => {
    navigate('/')
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
        <h1>{t('scratch.title')}</h1>
        <button 
          className="legend-button"
          onClick={() => setShowLegend(true)}
        >
          {t('game.legend')}
        </button>
      </div>
      
      <div className="game-content">
        <div className="scratch-page-container">
          <div className="bet-controls-scratch">
            <label>{t('header.bet')}: </label>
            <input 
              type="number" 
              value={gameState.scratchBet} 
              onChange={(e) => gameState.setScratchBet(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max={gameState.wallet}
              className="bet-input"
            />
          </div>
          <div className="scratch-container">
            <ScratchCards gameState={gameState} />
          </div>
        </div>
      </div>

      <LegendModal 
        isOpen={showLegend}
        onClose={() => setShowLegend(false)}
        gameType="scratch"
      />
    </div>
  )
}

export default ScratchPage
