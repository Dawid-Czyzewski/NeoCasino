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
  const scratchRefs = [useRef(null), useRef(null), useRef(null)]
  const canvasRefs = [useRef(null), useRef(null), useRef(null)]
  
  const generateSymbols = useCallback(() => {
    const symbolPool = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣']
    return symbolPool[Math.floor(Math.random() * symbolPool.length)]
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
    setHasBoughtCard(true)
    setIsDragging(false)
    setWallet(wallet - scratchBet)
    
    canvasRefs.forEach((canvasRef, index) => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        const canvas = canvasRef.current
        canvas.width = 150
        canvas.height = 150
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#b0b0b0'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        canvas.dataset.symbol = ''
      }
      if (scratchRefs[index].current) {
        const overlay = scratchRefs[index].current
        overlay.style.display = 'block'
        overlay.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)'
        overlay.style.pointerEvents = 'none'
        const icon = overlay.querySelector('.scratch-cover-icon')
        const text = overlay.querySelector('.scratch-text')
        if (icon) icon.style.display = 'block'
        if (text) text.style.display = 'block'
      }
    })
  }, [wallet, scratchBet, setWallet, generateSymbols, canvasRefs, scratchRefs])
  
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
  
  const drawScratch = useCallback((e, index, isFirst) => {
    const canvas = canvasRefs[index].current
    if (!canvas || symbols[index] === '?') return
    
    if (isFirst && !canvas.dataset.symbol) {
      canvas.dataset.symbol = symbols[index]
    }
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
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
    
    if (scratchedPercentage >= 70 && scratchRefs[index].current) {
      const overlay = scratchRefs[index].current
      overlay.querySelector('.scratch-cover-icon').style.display = 'none'
      overlay.querySelector('.scratch-text').style.display = 'none'
      overlay.style.pointerEvents = 'auto'
      overlay.style.background = 'transparent'
    }
  }, [canvasRefs, symbols, scratchRefs])
  
  const handleMouseDown = useCallback((e, index) => {
    if (!hasBoughtCard || isScratched || symbols[index] === '?') return
    e.preventDefault()
    setIsDragging(true)
    drawScratch(e, index, true)
  }, [hasBoughtCard, isScratched, symbols, drawScratch])
  
  const handleMouseMove = useCallback((e, index) => {
    if (!isDragging || symbols[index] === '?') return
    drawScratch(e, index, false)
  }, [isDragging, symbols, drawScratch])
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])
  
  const handleNewCard = useCallback(() => {
    setSymbols(['?', '?', '?'])
    setIsScratched(false)
    setWinAmount(0)
    setHasBoughtCard(false)
    setIsDragging(false)
    
    canvasRefs.forEach((canvasRef, index) => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        const canvas = canvasRef.current
        
        // Recreate opaque cover
        canvas.width = 150
        canvas.height = 150
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#b0b0b0'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        canvas.dataset.symbol = ''
      }
      if (scratchRefs[index].current) {
        scratchRefs[index].current.style.display = 'block'
      }
    })
  }, [scratchRefs, canvasRefs])

  const handleClickReveal = useCallback((index) => {
    const canvas = canvasRefs[index].current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()

    const overlay = scratchRefs[index].current
    if (overlay) {
      const icon = overlay.querySelector('.scratch-cover-icon')
      const text = overlay.querySelector('.scratch-text')
      if (icon) icon.style.display = 'none'
      if (text) text.style.display = 'none'
      overlay.style.pointerEvents = 'auto'
      overlay.style.background = 'transparent'
    }
  }, [canvasRefs, scratchRefs])
  
  const handleButtonClick = useCallback(() => {
    handleBuyCard()
  }, [handleBuyCard])
  
  useEffect(() => {
    canvasRefs.forEach((canvasRef, index) => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        
        canvas.width = 150
        canvas.height = 150

        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#b0b0b0'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    })
  }, [])
  
  useEffect(() => {
    if (!hasBoughtCard || isScratched) return
    
    const allOverlaysHidden = scratchRefs.every(ref => {
      const overlay = ref.current
      if (!overlay) return false
      const iconHidden = overlay.querySelector('.scratch-cover-icon')?.style.display === 'none'
      const textHidden = overlay.querySelector('.scratch-text')?.style.display === 'none'
      return iconHidden && textHidden
    })
    
    const revealedCount = symbols.filter(s => s !== '?').length
    const allRevealed = revealedCount === 3 && symbols.every(s => s !== '?')
    
    if (allRevealed && allOverlaysHidden) {
      setTimeout(() => {
        checkWinCondition(symbols)
      }, 100)
    }
  }, [symbols, isScratched, hasBoughtCard, checkWinCondition, scratchRefs])
  
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
                    <div className="symbol-revealed" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {symbol}
                    </div>
                    {hasBoughtCard && !isScratched && (
                      <div 
                        className="scratch-cover"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }}
                      >
                        <canvas 
                          ref={canvasRefs[index]}
                          className="scratch-canvas"
                          onMouseDown={(e) => handleMouseDown(e, index)}
                          onMouseMove={(e) => handleMouseMove(e, index)}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                          onClick={() => handleClickReveal(index)}
                          style={{ cursor: hasBoughtCard ? 'pointer' : 'not-allowed' }}
                        />
                        <div 
                          ref={scratchRefs[index]}
                          className="scratch-overlay"
                          style={{ pointerEvents: 'none' }}
                        >
                          <span className="scratch-cover-icon">💰</span>
                          <span className="scratch-text">{t('scratch.scratchMe')}</span>
                        </div>
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
