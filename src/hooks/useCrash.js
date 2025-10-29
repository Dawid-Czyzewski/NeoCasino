import { useState, useCallback, useEffect, useRef } from 'react'

export const useCrash = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [multiplier, setMultiplier] = useState(1.00)
  const [crashed, setCrashed] = useState(false)
  const [lastWin, setLastWin] = useState(0)
  const [canCashOut, setCanCashOut] = useState(false)
  const intervalRef = useRef(null)
  const crashPointRef = useRef(null)

  const generateCrashPoint = useCallback(() => {
    const min = 1.01
    const max = 100.00
    const random = Math.random()
    if (random < 0.5) return Math.random() * (2.0 - min) + min
    if (random < 0.7) return Math.random() * (5.0 - 2.0) + 2.0
    if (random < 0.85) return Math.random() * (10.0 - 5.0) + 5.0
    if (random < 0.95) return Math.random() * (25.0 - 10.0) + 10.0
    return Math.random() * (max - 25.0) + 25.0
  }, [])

  const startGame = useCallback(() => {
    if (isRunning) return

    setIsRunning(true)
    setCrashed(false)
    setMultiplier(1.00)
    setCanCashOut(true)
    
    const crashPoint = generateCrashPoint()
    crashPointRef.current = crashPoint
    
    intervalRef.current = setInterval(() => {
      setMultiplier(prev => {
        const growthRate = Math.max(0.001, 0.01 / Math.log(prev + 1))
        const newMultiplier = prev + growthRate
        
        if (newMultiplier >= crashPoint) {
          setCrashed(true)
          setIsRunning(false)
          setCanCashOut(false)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return crashPoint
        }
        return newMultiplier
      })
    }, 50)
  }, [isRunning, generateCrashPoint])

  const cashOut = useCallback(() => {
    if (!isRunning || !canCashOut || crashed) return

    const winAmount = multiplier
    setLastWin(winAmount)
    setIsRunning(false)
    setCanCashOut(false)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return winAmount
  }, [isRunning, canCashOut, crashed, multiplier])

  const resetGame = useCallback(() => {
    setIsRunning(false)
    setMultiplier(1.00)
    setCrashed(false)
    setCanCashOut(false)
    setLastWin(0)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    isRunning,
    multiplier,
    crashed,
    lastWin,
    canCashOut,
    startGame,
    cashOut,
    resetGame
  }
}
