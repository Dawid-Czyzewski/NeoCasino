export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const formatCurrency = (amount, currency = 'PLN', locale = 'pl-PL') => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount)
  } catch (error) {
    console.error('Error formatting currency:', error)
    return `${amount} ${currency}`
  }
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const isValidNumber = (value) => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

export const safeParseInt = (value, defaultValue = 0) => {
  const parsed = parseInt(value, 10)
  return isValidNumber(parsed) ? parsed : defaultValue
}

export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}
