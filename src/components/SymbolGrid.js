const SymbolGrid = ({ grid, spinningColumns, columnSpeeds, spinningTiles, winningPositions }) => {
  const isWinningPosition = (row, col) => {
    return winningPositions.some(win => 
      win.positions.some(([winRow, winCol]) => winRow === row && winCol === col)
    )
  }

  const getWinningLineType = (row, col) => {
    const winningLine = winningPositions.find(win => 
      win.positions.some(([winRow, winCol]) => winRow === row && winCol === col)
    )
    return winningLine ? winningLine.type : null
  }

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => 
        row.map((symbol, colIndex) => {
          const isWinning = isWinningPosition(rowIndex, colIndex)
          const lineType = getWinningLineType(rowIndex, colIndex)
          
          return (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className={`symbol-container ${spinningColumns[colIndex] ? `spinning-tile ${columnSpeeds[colIndex]}` : ''} ${isWinning ? 'winning-tile' : ''} ${lineType ? `winning-${lineType}` : ''}`}
              style={{
                gridColumn: colIndex + 1,
                gridRow: rowIndex + 1
              }}
            >
              <div className="symbol">
                {spinningColumns[colIndex] ? spinningTiles[colIndex][rowIndex]?.symbol || symbol : symbol}
              </div>
              {isWinning && <div className="winning-overlay"></div>}
            </div>
          )
        })
      )}
    </div>
  )
}

export default SymbolGrid
