import { 
  ROULETTE_NUMBERS, 
  ROULETTE_TILE_WIDTHS, 
  ROULETTE_ANIMATION, 
  ROULETTE_BET_TYPES, 
  ROULETTE_RED_NUMBERS 
} from '../constants/gameConstants'

export class RouletteService {
  static allNumbers = ROULETTE_NUMBERS
  static TILE_WIDTH = ROULETTE_TILE_WIDTHS.DESKTOP
  static TILE_WIDTH_MOBILE = ROULETTE_TILE_WIDTHS.MOBILE
  static TILE_WIDTH_SMALL_MOBILE = ROULETTE_TILE_WIDTHS.SMALL_MOBILE
  static TILE_WIDTH_TINY_MOBILE = ROULETTE_TILE_WIDTHS.TINY_MOBILE
  static ANIMATION_DURATION = ROULETTE_ANIMATION.DURATION
  static TILES_COUNT = ROULETTE_ANIMATION.TILES_COUNT

  static generateRandomTiles() {
    const tiles = []
    for (let i = 0; i < this.TILES_COUNT; i++) {
      tiles.push(this.allNumbers[Math.floor(Math.random() * this.allNumbers.length)])
    }
    return tiles
  }

  static getNumberColor(number) {
    if (number === 0) return 'green'
    if (ROULETTE_RED_NUMBERS.includes(number)) {
      return 'red'
    }
    return 'black'
  }

  static calculateWin(bet, winningNumber, betAmount) {
    const winningColor = this.getNumberColor(winningNumber)
    
    if (bet === 'red' && winningColor === 'red') return betAmount * 2
    if (bet === 'black' && winningColor === 'black') return betAmount * 2
    if (bet === 'green' && winningColor === 'green') return betAmount * 35
    
    return 0
  }

  static calculateTargetPosition(winningIndex, wheelWidth, tileWidth) {
    const centerOffset = (wheelWidth / 2) - (tileWidth / 2)
    return winningIndex * tileWidth - centerOffset
  }

  static easeOut(progress) {
    return 1 - Math.pow(1 - progress, 3)
  }

  static canSpin(isSpinning, wallet, betAmount) {
    return !isSpinning && wallet >= betAmount
  }

  static getBetDisplayName(bet, t) {
    switch (bet) {
      case 'red': return t('roulette.red')
      case 'black': return t('roulette.black')
      case 'green': return t('roulette.green')
      default: return t('roulette.red')
    }
  }

  static getBetTypes() {
    return ROULETTE_BET_TYPES
  }
}
