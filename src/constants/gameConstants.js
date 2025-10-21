export const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣', '🔔']

export const SYMBOL_VALUES = {
  '🍒': { nameKey: 'cherry', multiplier: 2, descriptionKey: 'lowestValue' },
  '🍋': { nameKey: 'lemon', multiplier: 3, descriptionKey: 'lowValue' },
  '🍊': { nameKey: 'orange', multiplier: 4, descriptionKey: 'mediumValue' },
  '🍇': { nameKey: 'grape', multiplier: 5, descriptionKey: 'goodValue' },
  '⭐': { nameKey: 'star', multiplier: 8, descriptionKey: 'highValue' },
  '💎': { nameKey: 'diamond', multiplier: 15, descriptionKey: 'veryHighValue' },
  '7️⃣': { nameKey: 'seven', multiplier: 25, descriptionKey: 'highestValue' },
  '🔔': { nameKey: 'bell', multiplier: 10, descriptionKey: 'highValue' }
}

export const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
]

export const ROULETTE_TILE_WIDTHS = {
  DESKTOP: 84,
  MOBILE: 70,
  SMALL_MOBILE: 60,
  TINY_MOBILE: 50
}

export const ROULETTE_ANIMATION = {
  DURATION: 3000,
  TILES_COUNT: 100 
}

export const ROULETTE_BET_TYPES = [
  { type: 'red', multiplier: 2, emoji: '🔴' },
  { type: 'black', multiplier: 2, emoji: '⚫' },
  { type: 'green', multiplier: 35, emoji: '🟢' }
]

export const ROULETTE_RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]

export const BLACKJACK_CARDS = {
  SUITS: ['♠', '♥', '♦', '♣'],
  RANKS: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  VALUES: {
    'A': 11,
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10
  }
}

export const BLACKJACK_RULES = {
  BLACKJACK: 21,
  DEALER_STAND: 17,
  ACE_SOFT_VALUE: 1,
  ACE_HARD_VALUE: 11,
  BLACKJACK_PAYOUT: 1.5,
  // Regular win should pay 2x the stake (player receives stake * 2)
  WIN_PAYOUT: 2,
  // Push (tie) should return the original stake
  PUSH_PAYOUT: 1
}

export const BLACKJACK_GAME_STATES = {
  BETTING: 'betting',
  DEALING: 'dealing',
  PLAYING: 'playing',
  DEALER_TURN: 'dealer_turn',
  FINISHED: 'finished'
}
