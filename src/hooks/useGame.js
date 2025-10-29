import { useState, useCallback, useEffect } from 'react'
import { LocalStorageService } from '../services/localStorageService'

const STORAGE_KEYS = {
  WALLET: 'casino_wallet',
  SLOT_BET: 'casino_slot_bet',
  ROULETTE_BET: 'casino_roulette_bet',
  BLACKJACK_BET: 'casino_blackjack_bet',
  CLICK_POWER: 'casino_click_power',
  TOTAL_CLICKS: 'casino_total_clicks',
  UPGRADES: 'casino_upgrades'
}

const INITIAL_UPGRADE = {
  id: 'click_power',
  nameKey: 'clicker.clickPower',
  icon: '💪',
  level: 1,
  baseCost: 100,
  multiplier: 1,
  costMultiplier: 2
}

const INITIAL_STATE = {
  wallet: 1000,
  slotBet: 10,
  rouletteBet: 10,
  blackjackBet: 10,
  isSpinning: false,
  lastWin: 0,
  clickPower: 1,
  upgrade: INITIAL_UPGRADE
}

export const useGame = () => {
  const [wallet, setWallet] = useState(() => 
    LocalStorageService.getItem(STORAGE_KEYS.WALLET, INITIAL_STATE.wallet)
  )
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
  const [clickPower, setClickPower] = useState(() => 
    LocalStorageService.getItem(STORAGE_KEYS.CLICK_POWER, INITIAL_STATE.clickPower)
  )
  const [upgrade, setUpgrade] = useState(() => 
    LocalStorageService.getItem(STORAGE_KEYS.UPGRADES, INITIAL_STATE.upgrade)
  )

  useEffect(() => {
    if (!LocalStorageService.getItem(STORAGE_KEYS.WALLET)) {
      LocalStorageService.setItem(STORAGE_KEYS.WALLET, INITIAL_STATE.wallet)
    }
  }, [])

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

  const handleClick = useCallback(() => {
    const moneyEarned = clickPower
    setWallet(prev => {
      const newWallet = prev + moneyEarned
      LocalStorageService.setItem(STORAGE_KEYS.WALLET, newWallet)
      return newWallet
    })
  }, [clickPower])

  const getUpgradeCost = useCallback(() => {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level - 1))
  }, [upgrade])

  const canAffordUpgrade = useCallback(() => {
    return wallet >= getUpgradeCost()
  }, [wallet, getUpgradeCost])

  const buyUpgrade = useCallback(() => {
    if (!canAffordUpgrade()) return

    const cost = getUpgradeCost()
    setWallet(prev => {
      const newWallet = prev - cost
      LocalStorageService.setItem(STORAGE_KEYS.WALLET, newWallet)
      return newWallet
    })
    setUpgrade(prev => {
      const newUpgrade = { ...prev, level: prev.level + 1 }
      LocalStorageService.setItem(STORAGE_KEYS.UPGRADES, newUpgrade)
      return newUpgrade
    })
    setClickPower(prev => {
      const newClickPower = prev + upgrade.multiplier
      LocalStorageService.setItem(STORAGE_KEYS.CLICK_POWER, newClickPower)
      return newClickPower
    })
  }, [upgrade, canAffordUpgrade, getUpgradeCost])

  const resetGame = useCallback(() => {
    setWallet(INITIAL_STATE.wallet)
    setSlotBet(INITIAL_STATE.slotBet)
    setRouletteBet(INITIAL_STATE.rouletteBet)
    setBlackjackBet(INITIAL_STATE.blackjackBet)
    setLastWin(INITIAL_STATE.lastWin)
    setIsSpinning(INITIAL_STATE.isSpinning)
    setClickPower(INITIAL_STATE.clickPower)
    setUpgrade(INITIAL_STATE.upgrade)
    
    LocalStorageService.setItem(STORAGE_KEYS.WALLET, INITIAL_STATE.wallet)
    LocalStorageService.setItem(STORAGE_KEYS.SLOT_BET, INITIAL_STATE.slotBet)
    LocalStorageService.setItem(STORAGE_KEYS.ROULETTE_BET, INITIAL_STATE.rouletteBet)
    LocalStorageService.setItem(STORAGE_KEYS.BLACKJACK_BET, INITIAL_STATE.blackjackBet)
    LocalStorageService.setItem(STORAGE_KEYS.CLICK_POWER, INITIAL_STATE.clickPower)
    LocalStorageService.setItem(STORAGE_KEYS.UPGRADES, INITIAL_STATE.upgrade)
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
    clickPower,
    upgrade,
    setWallet: updateWallet,
    setSlotBet: updateSlotBet,
    setRouletteBet: updateRouletteBet,
    setBlackjackBet: updateBlackjackBet,
    setIsSpinning,
    setLastWin,
    resetGame,
    canSpinSlot: canSpinSlot(),
    canSpinRoulette: canSpinRoulette(),
    canPlayBlackjack: canPlayBlackjack(),
    handleClick,
    getUpgradeCost,
    canAffordUpgrade,
    buyUpgrade
  }
}
