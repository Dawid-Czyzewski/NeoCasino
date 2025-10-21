import { useState, useCallback, useEffect } from 'react'
import { BlackjackService } from '../services/blackjackService'
import { BLACKJACK_GAME_STATES } from '../constants/gameConstants'

export const useBlackjack = (gameState) => {
  const { wallet, blackjackBet, setWallet, setLastWin } = gameState
  const [gameState_local, setGameState_local] = useState(BLACKJACK_GAME_STATES.BETTING)
  const [deck, setDeck] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameResult, setGameResult] = useState(null)
  const [lastWin, setLastWinLocal] = useState(0)
  const [messageKey, setMessageKey] = useState('')
  const canStartGame = BlackjackService.canStartGame(wallet, blackjackBet)
  const startNewGame = useCallback(() => {
    const newDeck = BlackjackService.createDeck()
    setDeck(newDeck)
    setPlayerHand([])
    setDealerHand([])
    setGameResult(null)
    setLastWinLocal(0)
    setMessageKey('')
    setGameState_local(BLACKJACK_GAME_STATES.BETTING)
  }, [])

  const finishGame = useCallback((finalPlayerHand, finalDealerHand) => {
    let currentDealerHand = [...finalDealerHand]
    let currentDeck = [...deck]
    let cardIndex = finalPlayerHand.length + finalDealerHand.length

    while (BlackjackService.dealerMustHit(currentDealerHand)) {
      currentDealerHand.push(currentDeck[cardIndex])
      cardIndex++
    }

    setDealerHand(currentDealerHand)

    const result = BlackjackService.determineWinner(finalPlayerHand, currentDealerHand)
    const winnings = BlackjackService.calculateWinnings(result, blackjackBet)

    setGameResult(result)
    setLastWinLocal(winnings)
    setLastWin(winnings)

    if (winnings > 0) {
      setWallet(prev => prev + winnings)
    }

    switch (result) {
      case 'blackjack':
        setMessageKey('blackjack.blackjackMessage')
        break
      case 'win':
        setMessageKey('blackjack.winMessage')
        break
      case 'lose':
        setMessageKey('blackjack.loseMessage')
        break
      case 'push':
        setMessageKey('blackjack.pushMessage')
        break
      default:
        setMessageKey('')
    }

    setGameState_local(BLACKJACK_GAME_STATES.FINISHED)
  }, [deck, blackjackBet, setWallet, setLastWin])

  const dealCards = useCallback(() => {
    if (!canStartGame) return

    setWallet(prev => prev - blackjackBet)

    const newDeck = BlackjackService.createDeck()
    setDeck(newDeck)

    const newPlayerHand = [newDeck[0], newDeck[2]]
    const newDealerHand = [newDeck[1], newDeck[3]]

    setPlayerHand(newPlayerHand)
    setDealerHand(newDealerHand)

    if (BlackjackService.isBlackjack(newPlayerHand)) {
      setGameState_local(BLACKJACK_GAME_STATES.DEALER_TURN)
      setTimeout(() => {
        finishGame(newPlayerHand, newDealerHand)
      }, 1000)
    } else {
      setGameState_local(BLACKJACK_GAME_STATES.PLAYING)
    }
  }, [canStartGame, blackjackBet, setWallet, finishGame])

  const hit = useCallback(() => {
    if (gameState_local !== BLACKJACK_GAME_STATES.PLAYING) return

    const newPlayerHand = [...playerHand, deck[playerHand.length + dealerHand.length]]
    setPlayerHand(newPlayerHand)

    if (BlackjackService.isBust(newPlayerHand)) {
      setGameState_local(BLACKJACK_GAME_STATES.FINISHED)
      setGameResult('lose')
      setMessageKey('blackjack.bustMessage')
      setLastWinLocal(0)
      setLastWin(0)
    }
  }, [gameState_local, playerHand, dealerHand, deck, setLastWin])

  const stand = useCallback(() => {
    if (gameState_local !== BLACKJACK_GAME_STATES.PLAYING) return

    setGameState_local(BLACKJACK_GAME_STATES.DEALER_TURN)
    
    setTimeout(() => {
      finishGame(playerHand, dealerHand)
    }, 1000)
  }, [gameState_local, playerHand, dealerHand, finishGame])

  const canHit = BlackjackService.canHit(playerHand) && gameState_local === BLACKJACK_GAME_STATES.PLAYING
  const canStand = gameState_local === BLACKJACK_GAME_STATES.PLAYING
  const isGameActive = gameState_local === BLACKJACK_GAME_STATES.PLAYING || gameState_local === BLACKJACK_GAME_STATES.DEALER_TURN
  const playerValue = BlackjackService.calculateHandValue(playerHand)
  const dealerValue = BlackjackService.calculateHandValue(dealerHand)

  return {
    gameState: gameState_local,
    playerHand,
    dealerHand,
    gameResult,
    lastWin,
    messageKey,
    canStartGame,
    canHit,
    canStand,
    isGameActive,
    playerValue,
    dealerValue,
    startNewGame,
    dealCards,
    hit,
    stand
  }
}
