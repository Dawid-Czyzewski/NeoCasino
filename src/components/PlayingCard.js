import React from 'react'
import { BlackjackService } from '../services/blackjackService'

const PlayingCard = ({ card, isHidden = false, className = '' }) => {
  if (!card) return null

  if (isHidden) {
    return (
      <div className={`playing-card hidden ${className}`}>
        <div className="card-back">
          <div className="card-pattern">🂠</div>
        </div>
      </div>
    )
  }

  const cardColor = BlackjackService.getCardColor(card.suit)

  return (
    <div className={`playing-card ${cardColor} ${className}`}>
      <div className="card-content">
        <div className="card-top">
          <span className="card-rank">{card.rank}</span>
          <span className="card-suit">{card.suit}</span>
        </div>
        <div className="card-center">
          <span className="card-suit-large">{card.suit}</span>
        </div>
        <div className="card-bottom">
          <span className="card-suit">{card.suit}</span>
          <span className="card-rank">{card.rank}</span>
        </div>
      </div>
    </div>
  )
}

export default PlayingCard
