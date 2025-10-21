import React from 'react'
import { useLocalization } from '../hooks/useLocalization'
import { useRoulette } from '../hooks/useRoulette'
import RouletteWheel from './RouletteWheel'
import BettingOptions from './BettingOptions'
import RouletteControls from './RouletteControls'
import RouletteRules from './RouletteRules'

const Roulette = ({ gameState }) => {
  const { t } = useLocalization()
  const { wallet, rouletteBet } = gameState

  const {
    isSpinning,
    scrollPosition,
    lastWin,
    selectedNumber,
    currentBet,
    currentRandomTiles,
    isAnimating,
    canSpin,
    wheelRef,
    numbersContainerRef,
    setCurrentBet,
    handleSpin,
    generateTileJSX
  } = useRoulette(gameState)

  return (
    <div className="roulette-container">
      <div className="roulette-header">
        <h2>🎲 {t('roulette.title')}</h2>
        <p>{t('roulette.description')}</p>
      </div>

      <RouletteWheel
        wheelRef={wheelRef}
        numbersContainerRef={numbersContainerRef}
        scrollPosition={scrollPosition}
        currentRandomTiles={currentRandomTiles}
        isAnimating={isAnimating}
        generateTileJSX={generateTileJSX}
      />

      <BettingOptions
        currentBet={currentBet}
        setCurrentBet={setCurrentBet}
        isSpinning={isSpinning}
        rouletteBet={rouletteBet}
      />

      <RouletteControls
        handleSpin={handleSpin}
        canSpin={canSpin}
        isSpinning={isSpinning}
        wallet={wallet}
        rouletteBet={rouletteBet}
        lastWin={lastWin}
        selectedNumber={selectedNumber}
      />

      <RouletteRules />
    </div>
  )
}

export default Roulette
