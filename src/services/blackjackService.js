import { 
  BLACKJACK_CARDS, 
  BLACKJACK_RULES
} from '../constants/gameConstants'

export class BlackjackService {
  static createDeck() {
    const deck = []
    for (const suit of BLACKJACK_CARDS.SUITS) {
      for (const rank of BLACKJACK_CARDS.RANKS) {
        deck.push({
          suit,
          rank,
          value: BLACKJACK_CARDS.VALUES[rank],
          id: `${suit}${rank}`
        })
      }
    }
    return this.shuffleDeck(deck)
  }

  static shuffleDeck(deck) {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  static calculateHandValue(hand) {
    let value = 0
    let aces = 0

    for (const card of hand) {
      if (card.rank === 'A') {
        aces++
        value += BLACKJACK_RULES.ACE_HARD_VALUE
      } else {
        value += card.value
      }
    }

    while (value > BLACKJACK_RULES.BLACKJACK && aces > 0) {
      value -= (BLACKJACK_RULES.ACE_HARD_VALUE - BLACKJACK_RULES.ACE_SOFT_VALUE)
      aces--
    }

    const isSoft = aces > 0 && value <= BLACKJACK_RULES.BLACKJACK
    const isBlackjack = hand.length === 2 && value === BLACKJACK_RULES.BLACKJACK

    return {
      value,
      isSoft,
      isBlackjack
    }
  }

  static canHit(hand) {
    const { value } = this.calculateHandValue(hand)
    return value < BLACKJACK_RULES.BLACKJACK
  }

  static isBlackjack(hand) {
    return this.calculateHandValue(hand).isBlackjack
  }

  static isBust(hand) {
    const { value } = this.calculateHandValue(hand)
    return value > BLACKJACK_RULES.BLACKJACK
  }

  static dealerMustHit(hand) {
    const { value } = this.calculateHandValue(hand)
    return value < BLACKJACK_RULES.DEALER_STAND
  }

  static determineWinner(playerHand, dealerHand) {
    const playerValue = this.calculateHandValue(playerHand)
    const dealerValue = this.calculateHandValue(dealerHand)

    if (playerValue.value > BLACKJACK_RULES.BLACKJACK) {
      return 'lose'
    }

    if (dealerValue.value > BLACKJACK_RULES.BLACKJACK) {
      return 'win'
    }

    if (playerValue.isBlackjack) {
      if (dealerValue.isBlackjack) {
        return 'push'
      }
      return 'blackjack'
    }

    if (dealerValue.isBlackjack) {
      return 'lose'
    }

    if (playerValue.value > dealerValue.value) {
      return 'win'
    } else if (playerValue.value < dealerValue.value) {
      return 'lose'
    } else {
      return 'push'
    }
  }

  static calculateWinnings(result, bet) {
    switch (result) {
      case 'blackjack':
        return Math.floor(bet * BLACKJACK_RULES.BLACKJACK_PAYOUT)
      case 'win':
        return bet * BLACKJACK_RULES.WIN_PAYOUT
      case 'push':
        return bet * BLACKJACK_RULES.PUSH_PAYOUT
      case 'lose':
      default:
        return 0
    }
  }

  static getCardColor(suit) {
    return suit === '♥' || suit === '♦' ? 'red' : 'black'
  }

  static canStartGame(wallet, bet) {
    return wallet >= bet && bet > 0
  }
}
