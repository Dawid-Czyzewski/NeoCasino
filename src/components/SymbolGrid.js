const SymbolGrid = ({ grid, spinningColumns, columnSpeeds, spinningTiles }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => 
        row.map((symbol, colIndex) => (
          <div 
            key={`${rowIndex}-${colIndex}`} 
            className={`symbol-container ${spinningColumns[colIndex] ? `spinning-tile ${columnSpeeds[colIndex]}` : ''}`}
            style={{
              gridColumn: colIndex + 1,
              gridRow: rowIndex + 1
            }}
          >
            <div className="symbol">
              {spinningColumns[colIndex] ? spinningTiles[colIndex][rowIndex]?.symbol || symbol : symbol}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SymbolGrid
