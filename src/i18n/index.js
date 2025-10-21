import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import plCommon from '../locales/pl/common.json'
import enCommon from '../locales/en/common.json'

const resources = {
  pl: {
    common: plCommon
  },
  en: {
    common: enCommon
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pl',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    
    defaultNS: 'common',
    ns: ['common']
  })

export default i18n
