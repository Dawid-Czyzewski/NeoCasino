import { useCallback, useEffect } from 'react'
import { useSlotMachine } from '../hooks/useSlotMachine'
import { APP_CONSTANTS } from '../utils/constants'
import SymbolGrid from './SymbolGrid.js'
import GameControls from './GameControls.js'

const SlotMachine = ({ gameState }) => {
  const { 
    wallet, 
    slotBet, 
    isSpinning, 
    lastWin, 
    setWallet, 
    setIsSpinning, 
    setLastWin, 
    canSpinSlot 
  } = gameState
  
  const {
    grid,
    spinningColumns,
    columnSpeeds,
    spinningTiles,
    startSpinning,
    stopAllColumns,
    finishSpinning,
    cleanup
  } = useSlotMachine()

  const handleSpin = useCallback(() => {
    if (!canSpinSlot) return
    
    setIsSpinning(true)
    setWallet(wallet - slotBet)
    
    const finalGrid = startSpinning()
    
    stopAllColumns()
    
    setTimeout(() => {
      finishSpinning(finalGrid, slotBet, (winAmount) => {
        setLastWin(winAmount)
        setWallet(wallet - slotBet + winAmount)
        setIsSpinning(false)
      })
    }, APP_CONSTANTS.SPIN_DURATION)
  }, [canSpinSlot, slotBet, wallet, setWallet, setIsSpinning, setLastWin, startSpinning, stopAllColumns, finishSpinning])

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  return (
    <div className="slot-machine">
      <SymbolGrid 
        grid={grid}
        spinningColumns={spinningColumns}
        columnSpeeds={columnSpeeds}
        spinningTiles={spinningTiles}
      />
      
            <GameControls 
              onSpin={handleSpin}
              isSpinning={isSpinning}
              canSpin={canSpinSlot}
              lastWin={lastWin}
              wallet={wallet}
              bet={slotBet}
            />
    </div>
  )
}

export default SlotMachine
