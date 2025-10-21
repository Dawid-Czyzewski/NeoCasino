import { useState, useCallback, useEffect, useRef } from 'react'
import { RouletteService } from '../services/rouletteService'

export const useRoulette = (gameState) => {
  const { wallet, rouletteBet, setWallet, setLastWin } = gameState
  const [isSpinning, setIsSpinning] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [lastWin, setLastWinLocal] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [currentBet, setCurrentBet] = useState('red')
  const [currentRandomTiles, setCurrentRandomTiles] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationId, setAnimationId] = useState(null)
  const wheelRef = useRef(null)
  const numbersContainerRef = useRef(null)
  const canSpin = RouletteService.canSpin(isSpinning, wallet, rouletteBet)

  useEffect(() => {
    if (currentRandomTiles.length === 0) {
      const tiles = RouletteService.generateRandomTiles()
      setCurrentRandomTiles(tiles)

      setTimeout(() => {
        if (wheelRef.current) {
          const centerOffset = (wheelRef.current.clientWidth / 2) - (RouletteService.TILE_WIDTH / 2)
          setScrollPosition(Math.max(0, 0 - centerOffset))
        }
      }, 0)
    }
  }, [currentRandomTiles.length])

  useEffect(() => {
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [animationId])

  const generateTileJSX = useCallback((number, index, isAnimatingFlag = false) => {
    const color = RouletteService.getNumberColor(number)
    const animClass = isAnimatingFlag ? 'animating' : ''
    return (
      <div
        key={`tile-${index}`}
        className={`roulette-number ${color} ${animClass}`}
        data-index={index}
        style={{ width: RouletteService.TILE_WIDTH }}
      >
        <span className="number-text">{number}</span>
      </div>
    )
  }, [])

  const handleSpin = useCallback(() => {
    if (!canSpin) return

    setIsSpinning(true)
    setIsAnimating(true)
    setLastWinLocal(0)
    setSelectedNumber(null)
    setWallet(prev => prev - rouletteBet)

    const randomTiles = RouletteService.generateRandomTiles()
    const winningIndex = Math.floor(Math.random() * randomTiles.length)
    const winningNumber = randomTiles[winningIndex]

    setCurrentRandomTiles(randomTiles)

    const wheelWidth = wheelRef.current ? wheelRef.current.clientWidth : 0
    const targetPosition = RouletteService.calculateTargetPosition(
      winningIndex, 
      wheelWidth, 
      RouletteService.TILE_WIDTH
    )

    const startTime = Date.now()
    const startPosition = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / RouletteService.ANIMATION_DURATION, 1)
      const easeOut = RouletteService.easeOut(progress)
      const currentPosition = startPosition + (targetPosition - startPosition) * easeOut
      setScrollPosition(currentPosition)

      if (progress < 1) {
        const id = requestAnimationFrame(animate)
        setAnimationId(id)
      } else {
        setScrollPosition(targetPosition)
        setIsAnimating(false)

        const centerOffset = wheelWidth ? (wheelWidth / 2) - (RouletteService.TILE_WIDTH / 2) : 0
        const indexAtCenter = Math.round((targetPosition + centerOffset) / RouletteService.TILE_WIDTH)
        const finalNumber = randomTiles[indexAtCenter] ?? winningNumber

        const winAmount = RouletteService.calculateWin(currentBet, finalNumber, rouletteBet)

        setLastWinLocal(winAmount)
        setLastWin(winAmount)

        if (winAmount > 0) setWallet(prev => prev + winAmount)

        setSelectedNumber(finalNumber)
        setIsSpinning(false)
      }
    }

    const id = requestAnimationFrame(animate)
    setAnimationId(id)
  }, [canSpin, rouletteBet, setWallet, setLastWin, currentBet])

  return {
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
  }
}
