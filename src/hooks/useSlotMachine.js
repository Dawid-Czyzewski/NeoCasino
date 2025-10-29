import { useState, useCallback, useRef } from 'react'
import { GameService } from '../services/gameService'

export const useSlotMachine = () => {
  const [grid, setGrid] = useState(() => GameService.generateGrid())
  const [spinningColumns, setSpinningColumns] = useState([false, false, false])
  const [columnSpeeds, setColumnSpeeds] = useState(['normal', 'normal', 'normal'])
  const [spinningTiles, setSpinningTiles] = useState(() => 
    GameService.generateSpinningTiles()
  )
  const [winningPositions, setWinningPositions] = useState([])
  
  const updateIntervalRef = useRef(null)
  const continueSpinningRef = useRef(null)

  const updateHiddenTiles = useCallback((colIndex) => {
    setSpinningTiles(prev => 
      GameService.updateSpinningTiles(prev, colIndex)
    )
  }, [])

  const startSpinning = useCallback(() => {
    const finalGrid = GameService.generateGrid()
    setGrid(finalGrid)
    setSpinningColumns([true, true, true])
    setColumnSpeeds(['normal', 'normal', 'normal'])
    setWinningPositions([])
    updateHiddenTiles(0)
    updateHiddenTiles(1)
    updateHiddenTiles(2)
    
    updateIntervalRef.current = setInterval(() => {
      updateHiddenTiles(0)
      updateHiddenTiles(1)
      updateHiddenTiles(2)
    }, 100)
    
    return finalGrid
  }, [updateHiddenTiles])

  const stopColumn = useCallback((colIndex, delay) => {
    setTimeout(() => {
      setColumnSpeeds(prev => {
        const newSpeeds = [...prev]
        newSpeeds[colIndex] = 'slow'
        return newSpeeds
      })
    }, delay + 200)
    
    setTimeout(() => {
      setColumnSpeeds(prev => {
        const newSpeeds = [...prev]
        newSpeeds[colIndex] = 'very-slow'
        return newSpeeds
      })
    }, delay + 400)
    
    setTimeout(() => {
      setSpinningColumns(prev => {
        const newState = [...prev]
        newState[colIndex] = false
        return newState
      })
      
      setColumnSpeeds(prev => {
        const newSpeeds = [...prev]
        newSpeeds[colIndex] = 'normal'
        return newSpeeds
      })
    }, delay + 600)
  }, [])

  const stopAllColumns = useCallback(() => {
    stopColumn(0, 1000)
    stopColumn(1, 1600)
    stopColumn(2, 2200)
  }, [stopColumn])

  const finishSpinning = useCallback((finalGrid, bet, onWin) => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current)
      updateIntervalRef.current = null
    }
    
    const winResult = GameService.checkWins(finalGrid, bet)
    setWinningPositions(winResult.winningPositions)
    onWin(winResult.totalWin)
    
    continueSpinningRef.current = setInterval(() => {
      updateHiddenTiles(0)
      updateHiddenTiles(1)
      updateHiddenTiles(2)
    }, 200)
    
    setTimeout(() => {
      if (continueSpinningRef.current) {
        clearInterval(continueSpinningRef.current)
        continueSpinningRef.current = null
      }
    }, 10000)
  }, [updateHiddenTiles])

  const cleanup = useCallback(() => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current)
      updateIntervalRef.current = null
    }
    if (continueSpinningRef.current) {
      clearInterval(continueSpinningRef.current)
      continueSpinningRef.current = null
    }
  }, [])

  return {
    grid,
    spinningColumns,
    columnSpeeds,
    spinningTiles,
    winningPositions,
    startSpinning,
    stopAllColumns,
    finishSpinning,
    cleanup
  }
}
