import { useNavigate } from 'react-router-dom'
import { useLocalization } from '../hooks/useLocalization'

const HomePage = () => {
  const navigate = useNavigate()
  const { t } = useLocalization()

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
