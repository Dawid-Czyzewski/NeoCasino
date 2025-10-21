import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

export const useLocalization = () => {
  const { t, i18n } = useTranslation('common')

  const changeLanguage = useCallback((language) => {
    i18n.changeLanguage(language)
  }, [i18n])

  const getCurrentLanguage = useCallback(() => {
    return i18n.language
  }, [i18n])

  const getAvailableLanguages = useCallback(() => {
    return [
      { code: 'pl', name: 'Polski', flag: '🇵🇱' },
      { code: 'en', name: 'English', flag: '🇺🇸' }
    ]
  }, [])

  const isRTL = useCallback(() => {
    return i18n.dir() === 'rtl'
  }, [i18n])

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    isRTL,
    currentLanguage: i18n.language
  }
}
