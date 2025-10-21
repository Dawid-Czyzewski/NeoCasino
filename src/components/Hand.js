import React from 'react'
import PlayingCard from './PlayingCard'
import { BlackjackService } from '../services/blackjackService'

const Hand = ({ 
  hand, 
  title, 
  isDealer = false, 
  showFirstCard = true, 
  className = '' 
}) => {
  const handValue = BlackjackService.calculateHandValue(hand)
  
  return (
    <div className={`hand ${className}`}>
      <div className="hand-header">
        <h3>{title}</h3>
        {showFirstCard && (
          <div className="hand-value">
            {handValue.value > 0 && (
              <span className={`value ${handValue.isSoft ? 'soft' : ''}`}>
                {handValue.value}
                {handValue.isSoft && <span className="soft-indicator"> (soft)</span>}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="hand-cards">
        {hand.map((card, index) => (
          <PlayingCard
            key={`${card.id}-${index}`}
            card={card}
            isHidden={isDealer && index === 0 && !showFirstCard}
            className={index > 0 ? 'card-overlap' : ''}
          />
        ))}
      </div>
    </div>
  )
}

export default Hand
