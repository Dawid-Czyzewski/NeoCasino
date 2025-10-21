export const validateBet = (bet, wallet, minBet = 1) => {
  const errors = []
  
  if (!Number.isInteger(bet)) {
    errors.push('Bet must be an integer')
  }
  
  if (bet < minBet) {
    errors.push(`Bet must be at least ${minBet}`)
  }
  
  if (bet > wallet) {
    errors.push('Bet cannot exceed wallet amount')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateWallet = (wallet, minAmount = 0) => {
  const errors = []
  
  if (!Number.isInteger(wallet)) {
    errors.push('Wallet must be an integer')
  }
  
  if (wallet < minAmount) {
    errors.push(`Wallet cannot be negative`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateGrid = (grid) => {
  const errors = []
  
  if (!Array.isArray(grid)) {
    errors.push('Grid must be an array')
    return { isValid: false, errors }
  }
  
  if (grid.length !== 3) {
    errors.push('Grid must have 3 rows')
  }
  
  for (let i = 0; i < grid.length; i++) {
    if (!Array.isArray(grid[i])) {
      errors.push(`Row ${i} must be an array`)
    } else if (grid[i].length !== 3) {
      errors.push(`Row ${i} must have 3 columns`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateLanguage = (language, supportedLanguages = ['pl', 'en']) => {
  const errors = []
  
  if (typeof language !== 'string') {
    errors.push('Language must be a string')
  }
  
  if (!supportedLanguages.includes(language)) {
    errors.push(`Language must be one of: ${supportedLanguages.join(', ')}`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
