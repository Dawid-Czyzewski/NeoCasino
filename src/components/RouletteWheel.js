import React from 'react'

const RouletteWheel = ({ 
  wheelRef, 
  numbersContainerRef, 
  scrollPosition, 
  currentRandomTiles, 
  isAnimating, 
  generateTileJSX 
}) => {
  return (
    <div className="roulette-wheel-container" ref={wheelRef}>
      <div className="roulette-wheel">
        <div
          className="roulette-numbers-container"
          ref={numbersContainerRef}
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {currentRandomTiles.map((number, index) => 
            generateTileJSX(number, index, isAnimating)
          )}
        </div>
      </div>
    </div>
  )
}

export default RouletteWheel
