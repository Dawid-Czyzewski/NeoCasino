import { useCallback, useState, useRef, useEffect } from 'react'
import { useLocalization } from '../hooks/useLocalization'
import '../styles/components/ScratchCards.css'

const ScratchCards = ({ gameState }) => {
  const { t } = useLocalization()
  const { wallet, scratchBet, setWallet } = gameState
  const [symbols, setSymbols] = useState(['?', '?', '?'])
  const [isScratched, setIsScratched] = useState(false)
  const [winAmount, setWinAmount] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasBoughtCard, setHasBoughtCard] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const canvasRefs = [useRef(null), useRef(null), useRef(null)]
  const [scratchedDone, setScratchedDone] = useState([false, false, false])
  const draggingIndexRef = useRef(-1)
  const SCRATCH_RADIUS = 30
  
  const generateSymbols = useCallback(() => {
    const symbolPool = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣']
    return symbolPool[Math.floor(Math.random() * symbolPool.length)]
  }, [])

  const initCanvas = useCallback((canvasRef, forceReset = false) => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    if (rect.width === 0 || rect.height === 0) {
      setTimeout(() => initCanvas(canvasRef, forceReset), 100)
      return
    }
    
    const dpr = window.devicePixelRatio || 1
    const width = rect.width
    const height = rect.height
    const targetWidth = Math.round(width * dpr)
    const targetHeight = Math.round(height * dpr)
    
    if (!forceReset && canvas.width === targetWidth && canvas.height === targetHeight) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      let hasContent = false
      
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] !== 0) {
          hasContent = true
          break
        }
      }
      
      if (!hasContent) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#999999'
        ctx.fillRect(0, 0, width, height)
      }
      return
    }
    
    let savedImageData = null
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (canvas.width > 0 && canvas.height > 0 && !forceReset) {
      try {
        savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      } catch (e) {

      }
    }
    
    canvas.width = targetWidth
    canvas.height = targetHeight
    
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    
    if (forceReset || !savedImageData) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#999999'
      ctx.fillRect(0, 0, width, height)
    } else if (savedImageData) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#999999'
      ctx.fillRect(0, 0, width, height)
    }
  }, [])
  
  const handleBuyCard = useCallback(() => {
    if (wallet < scratchBet) return
    
    const newSymbols = [
      generateSymbols(),
      generateSymbols(),
      generateSymbols()
    ]
    
    setSymbols(newSymbols)
    setIsScratched(false)
    setWinAmount(0)
    setIsDragging(false)
    setWallet(wallet - scratchBet)
    setScratchedDone([false, false, false])
    draggingIndexRef.current = -1
    
    setCanvasReady(false)
    setHasBoughtCard(true)
    
    requestAnimationFrame(() => {
      setTimeout(() => {
        canvasRefs.forEach((canvasRef) => {
          initCanvas(canvasRef, true)
        })
        
        setCanvasReady(true)
      }, 50)
    })
  }, [wallet, scratchBet, setWallet, generateSymbols, canvasRefs, initCanvas])
  
  const checkWin = useCallback((newSymbols) => {
    if (newSymbols[0] === newSymbols[1] && newSymbols[1] === newSymbols[2]) {
      return true
    }
    return false
  }, [])
  
  const checkWinCondition = useCallback((newSymbols) => {
    const revealedCount = newSymbols.filter(s => s !== '?').length
    const allRevealed = revealedCount === 3 && newSymbols.every(s => s !== '?')
    
    if (allRevealed) {
      setIsScratched(true)
      const hasWon = checkWin(newSymbols)
      
      if (hasWon) {
        const amount = scratchBet * 10
        setWinAmount(amount)
        setWallet(prev => prev + amount)
      } else {
        setWinAmount(0)
      }
      
      setHasBoughtCard(false)
    }
  }, [checkWin, scratchBet, setWallet])
  
  const getCoordinates = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    let x, y
    
    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      x = e.changedTouches[0].clientX - rect.left
      y = e.changedTouches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }
    
    return { x, y }
  }, [])
  
  const drawScratch = useCallback((e, index) => {
    const canvas = canvasRefs[index].current
    if (!canvas || !hasBoughtCard || symbols[index] === '?' || isScratched) return
    
    const { x, y } = getCoordinates(e, canvas)
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, SCRATCH_RADIUS, 0, Math.PI * 2)
    ctx.fill()
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparentPixels = 0
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++
      }
    }
    
    const totalPixels = pixels.length / 4
    const scratchedPercentage = (transparentPixels / totalPixels) * 100
    
    if (scratchedPercentage >= 70 && !scratchedDone[index]) {
      const rect = canvas.getBoundingClientRect()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.rect(0, 0, rect.width, rect.height)
      ctx.fill()
      
      setScratchedDone(prev => {
        const next = [...prev]
        next[index] = true
        if (next.every(Boolean)) {
          setTimeout(() => {
            checkWinCondition(symbols)
          }, 100)
        }
        return next
      })
    }
  }, [canvasRefs, hasBoughtCard, symbols, isScratched, scratchedDone, checkWinCondition, getCoordinates])
  
  const handleMouseDown = useCallback((e, index) => {
    if (!hasBoughtCard || isScratched || symbols[index] === '?') return
    e.preventDefault()
    setIsDragging(true)
    draggingIndexRef.current = index
    drawScratch(e, index)
  }, [hasBoughtCard, isScratched, symbols, drawScratch])
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || draggingIndexRef.current === -1) return
    e.preventDefault()
    drawScratch(e, draggingIndexRef.current)
  }, [isDragging, drawScratch])
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    draggingIndexRef.current = -1
  }, [])
  
  const handleTouchStart = useCallback((e, index) => {
    if (!hasBoughtCard || isScratched || symbols[index] === '?') return
    if (e.cancelable) {
      e.preventDefault()
    }
    setIsDragging(true)
    draggingIndexRef.current = index
    drawScratch(e, index)
  }, [hasBoughtCard, isScratched, symbols, drawScratch])
  
  const handleTouchMove = useCallback((e) => {
    if (!isDragging || draggingIndexRef.current === -1) return
    if (e.cancelable) {
      e.preventDefault()
    }
    drawScratch(e, draggingIndexRef.current)
  }, [isDragging, drawScratch])
  
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    draggingIndexRef.current = -1
  }, [])
  
  const handleNewCard = useCallback(() => {
    setSymbols(['?', '?', '?'])
    setIsScratched(false)
    setWinAmount(0)
    setHasBoughtCard(false)
    setIsDragging(false)
    setCanvasReady(false)
    setScratchedDone([false, false, false])
    draggingIndexRef.current = -1
    
    canvasRefs.forEach((canvasRef) => {
      initCanvas(canvasRef, true)
    })
  }, [canvasRefs, initCanvas])
  
  const handleButtonClick = useCallback(() => {
    handleBuyCard()
  }, [handleBuyCard])
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd, { passive: false })
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])
  
  return (
    <div className="scratch-cards">
      <div className="scratch-card-container">
        <div className="scratch-card">
          {symbols.map((symbol, index) => (
            <div key={index} className="scratch-symbol-container">
              <div className="scratch-symbol" style={{ position: 'relative' }}>
                {symbol === '?' ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="scratch-cover-icon">💰</span>
                    <span className="scratch-text">{t('scratch.scratchMe')}</span>
                  </div>
                ) : (
                  <>
                    {canvasReady && (
                      <div className="symbol-revealed" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {symbol}
                      </div>
                    )}
                    {hasBoughtCard && !isScratched && (
                      <div 
                        className="scratch-cover"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }}
                      >
                        <canvas 
                          ref={canvasRefs[index]}
                          className="scratch-canvas"
                          onMouseDown={(e) => handleMouseDown(e, index)}
                          onTouchStart={(e) => handleTouchStart(e, index)}
                          style={{ cursor: hasBoughtCard ? 'pointer' : 'not-allowed', touchAction: 'none' }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="scratch-controls">
        <button 
          className="buy-card-button"
          onClick={handleButtonClick}
          disabled={wallet < scratchBet || hasBoughtCard}
        >
          {t('scratch.buyCard')}
        </button>
        
        <div className="scratch-info">
          {winAmount > 0 && isScratched && (
            <div className="win-message">
              {t('scratch.youWon')}: ${winAmount}
            </div>
          )}
          {winAmount === 0 && isScratched && (
            <div className="lose-message">{t('scratch.betterLuck')}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScratchCards
