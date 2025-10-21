import { useNavigate, useOutletContext } from 'react-router-dom'
import { useLocalization } from '../hooks/useLocalization'
import Roulette from '../components/Roulette'

const RoulettePage = () => {
  const navigate = useNavigate()
  const { t } = useLocalization()
  const gameState = useOutletContext()

  const handleBackToGames = () => {
    navigate('/')
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <button onClick={handleBackToGames} className="back-button">
          {t('game.backToGames')}
        </button>
        <h1>🎲 {t('roulette.title')}</h1>
      </div>

      <div className="game-content">
        <div className="roulette-container-page">
          <div className="bet-controls-game">
            <label>{t('header.bet')}: </label>
            <input 
              type="number" 
              value={gameState.rouletteBet} 
              onChange={(e) => gameState.setRouletteBet(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max={gameState.wallet}
              disabled={gameState.isSpinning}
              className="bet-input-game"
            />
          </div>
          <Roulette gameState={gameState} />
        </div>
      </div>
    </div>
  )
}

export default RoulettePage
