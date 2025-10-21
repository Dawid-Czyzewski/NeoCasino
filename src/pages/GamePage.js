import { useState } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { useLocalization } from '../hooks/useLocalization'
import SlotMachine from '../components/SlotMachine'
import Roulette from '../components/Roulette'
import Blackjack from '../components/Blackjack'
import LegendModal from '../components/LegendModal'
import BlackjackLegendModal from '../components/BlackjackLegendModal'

const GamePage = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { t } = useLocalization()
  const [showLegend, setShowLegend] = useState(false)
  const gameState = useOutletContext()

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleShowLegend = () => {
    setShowLegend(true)
  }

  const gameNames = {
    'slot-machine': '🎰 Slot Machine',
    'roulette': '🎲 Roulette',
    'blackjack': '🃏 Blackjack'
  }

  const currentGameName = gameNames[gameId] || 'Unknown Game'

  return (
    <div className="game-page">
      <div className="game-header">
        <button 
          className="back-button"
          onClick={handleBackToHome}
        >
          {t('game.backToGames')}
        </button>
        <h1>{currentGameName}</h1>
        <button 
          className="legend-button"
          onClick={handleShowLegend}
        >
          {t('game.legend')}
        </button>
      </div>
      
      <div className="game-content">
        {gameId === 'slot-machine' && (
          <div className="slot-machine-container">
            <div className="bet-controls-game">
              <label>{t('header.bet')}: </label>
              <input 
                type="number" 
                value={gameState.slotBet} 
                onChange={(e) => gameState.setSlotBet(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={gameState.wallet}
                disabled={gameState.isSpinning}
                className="bet-input-game"
              />
            </div>
            <SlotMachine gameState={gameState} />
          </div>
        )}

        {gameId === 'roulette' && (
          <div className="roulette-container">
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
        )}

        {gameId === 'blackjack' && (
          <div className="blackjack-container">
            <div className="bet-controls-game">
              <label>{t('header.bet')}: </label>
              <input 
                type="number" 
                value={gameState.blackjackBet} 
                onChange={(e) => gameState.setBlackjackBet(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={gameState.wallet}
                disabled={gameState.isSpinning}
                className="bet-input-game"
              />
            </div>
            <Blackjack gameState={gameState} />
          </div>
        )}
        {!gameNames[gameId] && (
          <div className="game-not-found">
            <h2>{t('game.notFound')}</h2>
            <p>{t('game.notFoundDescription')}</p>
            <button onClick={handleBackToHome}>{t('game.backToGames')}</button>
          </div>
        )}
      </div>

      {gameId === 'blackjack' ? (
        <BlackjackLegendModal 
          isOpen={showLegend}
          onClose={() => setShowLegend(false)}
        />
      ) : (
        <LegendModal 
          isOpen={showLegend}
          onClose={() => setShowLegend(false)}
        />
      )}
    </div>
  )
}

export default GamePage
