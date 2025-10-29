import { useNavigate, useOutletContext } from 'react-router-dom'
import { useLocalization } from '../hooks/useLocalization'

const HomePage = () => {
  const navigate = useNavigate()
  const { t } = useLocalization()
  const gameState = useOutletContext()
  const { 
    wallet, 
    clickPower, 
    upgrade, 
    handleClick, 
    getUpgradeCost, 
    canAffordUpgrade, 
    buyUpgrade 
  } = gameState

  const games = [
    {
      id: 'slot-machine',
      titleKey: 'slotMachine.title',
      descriptionKey: 'slotMachine.description',
      icon: '🎰',
      path: '/game/slot-machine'
    },
    {
      id: 'blackjack',
      titleKey: 'blackjack.title',
      descriptionKey: 'blackjack.description',
      icon: '🃏',
      path: '/game/blackjack',
      comingSoon: false
    },
    {
      id: 'roulette',
      titleKey: 'roulette.title',
      descriptionKey: 'roulette.description',
      icon: '🎲',
      path: '/roulette',
      comingSoon: false
    },
    {
      id: 'crash',
      titleKey: 'crash.title',
      descriptionKey: 'crash.description',
      icon: '💥',
      path: '/crash',
      comingSoon: false
    }
  ]

  const handleGameSelect = (game) => {
    if (game.path) {
      navigate(game.path)
    }
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>{t('home.title')}</h1>
        <p>{t('home.subtitle')}</p>
      </div>

      <div className="clicker-section">
        <div className="clicker-stats">
          <div className="stat-item">
            <span className="stat-label">💰 {t('clicker.wallet')}:</span>
            <span className="stat-value">${wallet.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">⚡ {t('clicker.power')}:</span>
            <span className="stat-value">{clickPower}x</span>
          </div>
        </div>
        
        <div className="clicker-main">
          <div className="clicker-row">
            <button 
              className="click-button"
              onClick={handleClick}
            >
              💰 {t('clicker.clickToEarn')}
            </button>
            
            <div className="upgrade-container">
              <div className={`upgrade-card ${canAffordUpgrade() ? 'affordable' : 'expensive'}`}>
                <div className="upgrade-header">
                  <span className="upgrade-icon">{upgrade.icon}</span>
                  <span className="upgrade-name">{t(upgrade.nameKey)}</span>
                </div>
                <div className="upgrade-info">
                  <div className="upgrade-level">{t('clicker.level')}: {upgrade.level}</div>
                  <div className="upgrade-cost">${getUpgradeCost().toLocaleString()}</div>
                </div>
                <button 
                  className={`upgrade-buy-btn ${canAffordUpgrade() ? 'can-buy' : 'cannot-buy'}`}
                  onClick={buyUpgrade}
                  disabled={!canAffordUpgrade()}
                >
                  {canAffordUpgrade() ? t('clicker.buy') : t('clicker.tooExpensive')}
                </button>
              </div>
            </div>
          </div>
          <div className="click-info">
            {t('clicker.earnPerClick', { amount: clickPower })}
          </div>
        </div>
      </div>
      
      <div className="games-grid">
        {games.map((game) => (
          <div 
            key={game.id}
            className={`game-card ${game.comingSoon ? 'coming-soon' : ''}`}
            onClick={() => handleGameSelect(game)}
          >
            <div className="game-icon">{game.icon}</div>
            <h3 className="game-title">{t(`home.games.${game.titleKey}`)}</h3>
            <p className="game-description">{t(`home.games.${game.descriptionKey}`)}</p>
            {game.comingSoon && (
              <div className="coming-soon-badge">{t('home.games.comingSoon')}</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="coming-soon-section">
        <h2>{t('home.moreGamesComing')}</h2>
        <p>{t('home.moreGamesDescription')}</p>
      </div>
      
      <div className="home-footer">
        <p>{t('home.goodLuck')}</p>
      </div>
    </div>
  )
}

export default HomePage
