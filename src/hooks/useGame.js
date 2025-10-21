import { useState, useCallback } from 'react'
import { LocalStorageService } from '../services/localStorageService'

const STORAGE_KEYS = {
  WALLET: 'casino_wallet',
  SLOT_BET: 'casino_slot_bet',
  ROULETTE_BET: 'casino_roulette_bet',
  BLACKJACK_BET: 'casino_blackjack_bet'
}

const INITIAL_STATE = {
  wallet: 1000,
  slotBet: 10,
  rouletteBet: 10,
  blackjackBet: 10,
  isSpinning: false,
  lastWin: 0
}

export const useGame = () => {
  const [wallet, setWallet] = useState(() => {
    const initialWallet = INITIAL_STATE.wallet
    LocalStorageService.setItem(STORAGE_KEYS.WALLET, initialWallet)
    return initialWallet
  })
  const [slotBet, setSlotBet] = useState(() => 
    LocalStorageService.getItem(STORAGE_KEYS.SLOT_BET, INITIAL_STATE.slotBet)
  )
  const [rouletteBet, setRouletteBet] = useState(() => 
    LocalStorageService.getItem(STORAGE_KEYS.ROULETTE_BET, INITIAL_STATE.rouletteBet)
  )
  const [blackjackBet, setBlackjackBet] = useState(() => 
    LocalStorageService.getItem(STORAGE_KEYS.BLACKJACK_BET, INITIAL_STATE.blackjackBet)
  )
  const [isSpinning, setIsSpinning] = useState(INITIAL_STATE.isSpinning)
  const [lastWin, setLastWin] = useState(INITIAL_STATE.lastWin)

  const updateWallet = useCallback((newWallet) => {
    setWallet(newWallet)
    LocalStorageService.setItem(STORAGE_KEYS.WALLET, newWallet)
  }, [])

  const updateSlotBet = useCallback((newBet) => {
    const validBet = Math.max(1, Math.min(newBet, wallet))
    setSlotBet(validBet)
    LocalStorageService.setItem(STORAGE_KEYS.SLOT_BET, validBet)
  }, [wallet])

  const updateRouletteBet = useCallback((newBet) => {
    const validBet = Math.max(1, Math.min(newBet, wallet))
    setRouletteBet(validBet)
    LocalStorageService.setItem(STORAGE_KEYS.ROULETTE_BET, validBet)
  }, [wallet])

  const updateBlackjackBet = useCallback((newBet) => {
    const validBet = Math.max(1, Math.min(newBet, wallet))
    setBlackjackBet(validBet)
    LocalStorageService.setItem(STORAGE_KEYS.BLACKJACK_BET, validBet)
  }, [wallet])

  const resetGame = useCallback(() => {
    setWallet(INITIAL_STATE.wallet)
    setSlotBet(INITIAL_STATE.slotBet)
    setRouletteBet(INITIAL_STATE.rouletteBet)
    setBlackjackBet(INITIAL_STATE.blackjackBet)
    setLastWin(INITIAL_STATE.lastWin)
    setIsSpinning(INITIAL_STATE.isSpinning)
    
    LocalStorageService.setItem(STORAGE_KEYS.WALLET, INITIAL_STATE.wallet)
    LocalStorageService.setItem(STORAGE_KEYS.SLOT_BET, INITIAL_STATE.slotBet)
    LocalStorageService.setItem(STORAGE_KEYS.ROULETTE_BET, INITIAL_STATE.rouletteBet)
    LocalStorageService.setItem(STORAGE_KEYS.BLACKJACK_BET, INITIAL_STATE.blackjackBet)
  }, [])

  const canSpinSlot = useCallback(() => {
    return !isSpinning && wallet >= slotBet
  }, [isSpinning, wallet, slotBet])

  const canSpinRoulette = useCallback(() => {
    return !isSpinning && wallet >= rouletteBet
  }, [isSpinning, wallet, rouletteBet])

  const canPlayBlackjack = useCallback(() => {
    return !isSpinning && wallet >= blackjackBet
  }, [isSpinning, wallet, blackjackBet])

  return {
    wallet,
    slotBet,
    rouletteBet,
    blackjackBet,
    isSpinning,
    lastWin,
    setWallet: updateWallet,
    setSlotBet: updateSlotBet,
    setRouletteBet: updateRouletteBet,
    setBlackjackBet: updateBlackjackBet,
    setIsSpinning,
    setLastWin,
    resetGame,
    canSpinSlot: canSpinSlot(),
    canSpinRoulette: canSpinRoulette(),
    canPlayBlackjack: canPlayBlackjack()
  }
}
