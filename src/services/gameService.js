import { SYMBOLS, SYMBOL_VALUES } from '../constants/gameConstants'

export class GameService {
  static generateGrid() {
    return Array(3).fill(null).map(() => 
      Array(3).fill(null).map(() => 
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      )
    )
  }

  static checkWins(grid, bet) {
    let totalWin = 0
    const winningPositions = []
    
    for (let row = 0; row < 3; row++) {
      if (grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]) {
        const symbol = grid[row][0]
        const multiplier = SYMBOL_VALUES[symbol]?.multiplier || 5
        totalWin += bet * multiplier
        winningPositions.push({
          type: 'horizontal',
          positions: [[row, 0], [row, 1], [row, 2]],
          symbol,
          multiplier
        })
      }
    }

    for (let col = 0; col < 3; col++) {
      if (grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
        const symbol = grid[0][col]
        const multiplier = SYMBOL_VALUES[symbol]?.multiplier || 5
        totalWin += bet * multiplier
        winningPositions.push({
          type: 'vertical',
          positions: [[0, col], [1, col], [2, col]],
          symbol,
          multiplier
        })
      }
    }

    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      const symbol = grid[0][0]
      const multiplier = SYMBOL_VALUES[symbol]?.multiplier || 10
      totalWin += bet * multiplier * 2
      winningPositions.push({
        type: 'diagonal',
        positions: [[0, 0], [1, 1], [2, 2]],
        symbol,
        multiplier: multiplier * 2
      })
    }
    
    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      const symbol = grid[0][2]
      const multiplier = SYMBOL_VALUES[symbol]?.multiplier || 10
      totalWin += bet * multiplier * 2
      winningPositions.push({
        type: 'diagonal',
        positions: [[0, 2], [1, 1], [2, 0]],
        symbol,
        multiplier: multiplier * 2
      })
    }
    
    return { totalWin, winningPositions }
  }

  static generateSpinningTiles(columns = 3, tilesPerColumn = 15) {
    return Array(columns).fill(null).map((_, colIndex) =>
      Array(tilesPerColumn).fill(null).map((_, tileIndex) => ({
        id: `${colIndex}-${tileIndex}`,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      }))
    )
  }

  static updateSpinningTiles(spinningTiles, colIndex, visibleTiles = 3) {
    const newTiles = [...spinningTiles]
    newTiles[colIndex] = newTiles[colIndex].map((tile, index) => {
      if (index < visibleTiles) {
        return {
          ...tile,
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        }
      }
      return tile
    })
    return newTiles
  }

  static getSymbolInfo(symbol) {
    return SYMBOL_VALUES[symbol] || { nameKey: 'unknown', multiplier: 1, descriptionKey: 'unknown' }
  }

  static getSymbols() {
    return [...SYMBOLS]
  }

  static getSymbolValues() {
    return { ...SYMBOL_VALUES }
  }
}
